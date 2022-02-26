const express = require('express');
const app = express();

const declareModule = require('./declare');
const api = declareModule.api;
const wasmHexString = declareModule.wasmHexString;
const serializedAbiHexString = declareModule.serializedAbiHexString;
const stripeKeys = declareModule.stripeKeys;

const stripe = require('stripe')(stripeKeys.apiKey);
const endpointSecret = stripeKeys.webhookKey;

app.post('/create-checkout-session', express.json(), async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: req.body.lineItems,
        mode: 'payment',
        success_url:
            stripeKeys.successURL + req.body.accountDetails.accountName
            + '?' + req.body.accountDetails.ramQuantity
            + '?' + req.body.accountDetails.salt
            + '?' + req.body.accountDetails.tokenName,
        cancel_url: stripeKeys.cancelURL,
        metadata: req.body.accountDetails
    })

    res.status(303)
    res.send({ redirect: session.url })
})

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
        sendErrorResponse(res)
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        stripe.checkout.sessions.listLineItems(
            session.id,
            { limit: 2 },
            function (err, lineItems) {
                try {
                    fulfillOrder(session, lineItems)
                } catch (err) {
                    sendErrorResponse(res)
                }
            }
        )
    }

    res.status(200).end()
})

async function fulfillOrder(session, lineItems) {
    let itemsOrdered = "";
    lineItems.data.forEach(function (currentItem) {
        itemsOrdered += currentItem.price.product
    })

    if (itemsOrdered.includes(stripeKeys.eosAccountID)) {
        await createAccount(session.metadata.accountName, session.metadata.receiverPubKey)
            .catch(err => console.log(err))
    }

    if (itemsOrdered.includes(stripeKeys.eosRAMID)) {
        await buyRAM(session.metadata.accountName, session.metadata.ramQuantity)
            .catch(err => console.log(err))
    }

    if (itemsOrdered.includes(stripeKeys.customTokenID)) {
        await createAccount(session.metadata.accountName, session.metadata.serverPubKey)
            .then(buyRAM(session.metadata.accountName, session.metadata.ramQuantity))
            .then(() => console.log(session.metadata.serverPrivKey)) // intentionally expose the old private key to the server in case the create token function fails before changing account authorizations
            .then(createToken(
                session.metadata.accountName, session.metadata.serverPrivKey, session.metadata.tokenName,
                session.metadata.maxTokenSupply, session.metadata.precision, session.metadata.receiverPubKey))
            .catch(err => console.log(err))
    }
}

function sendErrorResponse(res) {
    res.status(500)
    res.send({
        "error": "There was an error, please contact info@eosaccountservices.com"
    });
}

async function createAccount(accountName, receiverPubKey) {
    await api.transact({
        actions: [{
            account: 'eosio',
            name: 'newaccount',
            authorization: [{
                actor: 'serveaccount',
                permission: 'active'
            }],
            data: {
                creator: 'serveaccount',
                name: accountName,
                owner: {
                    threshold: 1,
                    keys: [{
                        key: receiverPubKey,
                        weight: 1
                    }],
                    accounts: [],
                    waits: []
                },
                active: {
                    threshold: 1,
                    keys: [{
                        key: receiverPubKey,
                        weight: 1
                    }],
                    accounts: [],
                    waits: []
                }
            }
        },
        {
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{
                actor: 'serveaccount',
                permission: 'active',
            }],
            data: {
                payer: 'serveaccount',
                receiver: accountName,
                bytes: 2296
            }
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
}

async function buyRAM(accountName, ramQuantity) {
    await api.transact({
        actions: [{
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{
                actor: 'serveaccount',
                permission: 'active',
            }],
            data: {
                payer: 'serveaccount',
                receiver: accountName,
                bytes: (ramQuantity * 1000)
            }
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
}

async function createToken({ accountName, serverPrivKey, tokenName, maxTokenSupply, precision, receiverPubKey }) {
    if (!(maxTokenSupply > 0)) {
        maxTokenSupply = 1000000
    }
    if (!(precision >= 0)) {
        precision = 4
    }
    const tokenDetails = maxTokenSupply.toString() + "." + (precision * "0") + " " + tokenName;
    const recApi = declareModule.genRecAPI(serverPrivKey)

    await recApi.transact({
        actions: [{
            account: 'eosio',
            name: 'setcode',
            authorization: [{
                actor: accountName,
                permission: 'owner'
            }],
            data: {
                account: accountName,
                vmtype: '0',
                vmversion: '0',
                code: wasmHexString
            },
        },
        {
            account: 'eosio',
            name: 'setabi',
            authorization: [{
                actor: accountName,
                permission: 'owner'
            }],
            data: {
                account: accountName,
                abi: serializedAbiHexString
            }
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    })
        .then(
            await recApi.transact({
                actions: [{
                    account: accountName,
                    name: 'create',
                    authorization: [{
                        actor: accountName,
                        permission: 'owner'
                    }],
                    data: {
                        issuer: accountName,
                        maximum_supply: tokenDetails
                    }
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30
            })
        )
        .then(
            await recApi.transact({
                actions: [{
                    account: 'eosio',
                    name: 'updateauth',
                    authorization: [{
                        actor: accountName,
                        permission: 'owner'
                    }],
                    data: {
                        account: accountName,
                        auth: {
                            accounts: [],
                            keys: [{
                                key: receiverPubKey,
                                weight: 1
                            }],
                            threshold: 1,
                            waits: []
                        },
                        parent: 'owner',
                        permission: 'active'
                    }
                },
                {
                    account: 'eosio',
                    name: 'updateauth',
                    authorization: [{
                        actor: accountName,
                        permission: 'owner'
                    }],
                    data: {
                        account: accountName,
                        auth: {
                            accounts: [],
                            keys: [{
                                key: receiverPubKey,
                                weight: 1
                            }],
                            threshold: 1,
                            waits: []
                        },
                        parent: '',
                        permission: 'owner'
                    }
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30
            })
        )
}

/* export function createToken({ accountName, maxTokenSupply, tokenName }) {
    await api.transact({
        actions: [
            {
                account: accountName,
                name: 'create',
                authorization: [{
                    actor: accountName,
                    permission: 'active'
                },
                ],
                data: {
                    issuer: accountName,
                    maximum_supply: maxTokenSupply + " " + tokenName
                },
            },
            {
                account: 'ipfkoutwqois',
                name: 'issue',
                authorization: [{
                    actor: 'ipfkoutwqois',
                    permission: 'active'
                }],
                data: {
                    to: 'bunlrkvgqoby',
                    quantity: '10.0000 DJENT',
                    memo: 'Does this work?'
                }
            }
        ]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
} */

module.exports = app;

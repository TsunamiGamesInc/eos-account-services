var express = require('express');
var app = express();

var declareModule = require('./declare');
const api = declareModule.api;
const stripeKeys = declareModule.stripeKeys;

const stripe = require('stripe')(stripeKeys.apiKey);
const endpointSecret = stripeKeys.webhookKey;

app.post('/create-checkout-session', express.json(), async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: req.body.lineItems,
        mode: 'payment',
        success_url: stripeKeys.successURL + req.body.accountDetails.accountName + '?' + req.body.accountDetails.ramQuantity + '?' + req.body.accountDetails.receiverPrivKeyEnd,
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
            { limit: 100 },
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

/* export function deployContract({ accountName, wasmHexString, serializedAbiHexString }) {
            await api.transact({
                actions: [
                    {
                        account: 'eosio',
                        name: 'setcode',
                        authorization: [
                            {
                                actor: 'ipfkoutwqois',
                                permission: 'active'
                            },
                        ],
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
                        authorization: [
                            {
                                actor: 'ipfkoutwqois',
                                permission: 'active'
                            },
                        ],
                        data: {
                            account: accountName,
                            abi: serializedAbiHexString
                        },
                    },
                ],
            },
                {
                    blocksBehind: 3,
                    expireSeconds: 30
                });
}

export function createToken({ accountName, maxTokenSupply, tokenName }) {
    return (
        (async () => {
            await api.transact({
                actions: [
                    {
                        account: 'ipfkoutwqois',
                        name: 'create',
                        authorization: [{
                            actor: 'ipfkoutwqois',
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
        })()
    );
} */

module.exports = app;

var express = require('express');
var app = express();

var declareModule = require('/JS Projects/eos-account-services/functions/eos_functions/declare');
const api = declareModule.api;
const stripeKeys = declareModule.stripeKeys;

const stripe = require('stripe')(stripeKeys.apiKey);
const endpointSecret = stripeKeys.webhookKey;

app.post('/create-checkout-session', express.json(), async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: req.body.lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/app/thank-you?'
            + req.body.accountDetails.accountName + '?' + req.body.accountDetails.ramQuantity,
        cancel_url: 'http://localhost:3000/app/?canceled=true',
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
    }
    catch (err) {
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
                }
                catch (err) {
                    sendErrorResponse(res)
                }
            }
        )
    }

    res.status(200).end()
})

const fulfillOrder = (session, lineItems) => {
    let itemsOrdered = "";
    lineItems.data.forEach(function (currentItem) {
        itemsOrdered += currentItem.price.product
    })

    if (itemsOrdered.includes(stripeKeys.eosAccountID)) {
        createAccount(session.metadata.accountName, session.metadata.recieverPubKey)
            .catch(console.log("There was an error! Contact: info@eosaccountservices.com"))
        buyRAM('ipfkoutwqois', 0.128)
            .catch(console.log("There was an error! Contact: info@eosaccountservices.com"))
    }

    if (itemsOrdered.includes(stripeKeys.eosRAMID)) {
        buyRAM(session.metadata.accountName, session.metadata.ramQuantity)
            .catch(console.log("There was an error! Contact: info@eosaccountservices.com"))
    }
}

function sendErrorResponse(res) {
    res.status(500)
    res.send({
        "error": "There was an error, please contact info@eosaccountservices.com"
    });
}

function createAccount(accountName, recieverPubKey) {
    return (
        (async () => {
            await api.transact({
                actions: [{
                    account: 'eosio',
                    name: 'newaccount',
                    authorization: [{
                        actor: 'tsunamigames',
                        permission: 'active'
                    }],
                    data: {
                        creator: 'tsunamigames',
                        name: accountName,
                        owner: {
                            threshold: 1,
                            keys: [{
                                key: recieverPubKey,
                                wight: 1
                            }],
                            accounts: [],
                            waits: []
                        },
                        active: {
                            threshold: 1,
                            keys: [{
                                key: recieverPubKey,
                                wight: 1
                            }],
                            accounts: [],
                            waits: []
                        }
                    }
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30
            });
        })()
    );
}

function buyRAM(accountName, ramQuantity) {
    return (
        (async () => {
            await api.transact({
                actions: [{
                    account: 'eosio',
                    name: 'buyrambytes',
                    authorization: [{
                        actor: 'tsunamigames',
                        permission: 'active',
                    }],
                    data: {
                        payer: 'tsunamigames',
                        receiver: accountName,
                        bytes: (ramQuantity * 1000)
                    }
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30
            });
        })()
    );
}

/* export function deployContract({ accountName, wasmHexString, serializedAbiHexString }) {
    return (
        (async () => {
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
        })()
    );
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

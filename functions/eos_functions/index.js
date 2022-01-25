var express = require('express');
var app = express();
const stripe = require('stripe')('');
const endpointSecret = '';
//const path = require('path');
//var catalyst = require('zcatalyst-sdk-node');

var declareModule = require('/JS Projects/eos-account-services/functions/eos_functions/declare');
var api = declareModule.api;

//app.use(express.json());

app.post('/create-checkout-session', express.json(), async (req, res) => {
    console.log(req.postData)
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: '',
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/app/?success=true',
        cancel_url: 'http://localhost:3000/app/?canceled=true'
    })

    //res.redirect(303, session.url)
    res.status(303)
    res.send({redirect: session.url})
})

const fulfillOrder = (session, lineItems) => {
    console.log(lineItems)
}

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
            function(err, lineItems) {
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

app.post('/createAccount', async (req, res) => {
    createAccount()
        .then(buyRAM(req.accountName, req.ramQuantity))
        .then(buyRAM('ipfkoutwqois', 0.128))
        .then(result => {
            res.send(result)
        }).catch(err => {
            sendErrorResponse(res)
        })
})

app.post('/getRAM', async (req, res) => {
    buyRAM(req.accountName, req.ramQuantity)
        .then(buyRAM('ipfkoutwqois', 0.128))
        .then(result => {
            res.send(result)
        }).catch(err => {
            sendErrorResponse(res)
        })
})

/* app.post('/transfer', async (req, res) => {
    transferEOS(req.accountName, req.value)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            sendErrorResponse(res)
        })
}) */

function sendErrorResponse(res) {
    res.status(500)
    res.send({
        "error": "There was an error, please contact info@eosaccountservices.com"
    });
}

function createAccount({ accountName, recieverPubKey }) {
    return (
        (async () => {
            await api.transact({
                actions: [{
                    account: 'eosio',
                    name: 'newaccount',
                    authorization: [{
                        actor: 'ipfkoutwqois',
                        permission: 'active'
                    }],
                    data: {
                        creator: 'ipfkoutwqois',
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

function buyRAM({ accountName, ramQuantity }) {
    return (
        (async () => {
            await api.transact({
                actions: [{
                    account: 'eosio',
                    name: 'buyrambytes',
                    authorization: [{
                        actor: 'ipfkoutwqois',
                        permission: 'active',
                    }],
                    data: {
                        payer: 'ipfkoutwqois',
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

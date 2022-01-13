var express = require('express');
var app = express();
//const path = require('path');
//var catalyst = require('zcatalyst-sdk-node');

var declareModule = require('/JS Projects/eos-account-services/functions/eos_functions/declare');
var api = declareModule.api;

app.use(express.json());

app.post('/createAccount', async (req, res) => {
    createAccount()
        .then(buyRAM(req.accountName, (req.valueR * 1000)))
        .then(transferEOS(req.accountName, req.value))
        .then(buyRAM('ipfkoutwqois', 128))
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
    res.status(500);
    res.send({
        "error": "There was an error, please contact info@eosaccountservices.com"
    });
}

export default function createAccount({ accountName, recieverPubKey }) {
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

export function buyRAM({ accountName, valueR }) {
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
                        bytes: valueR
                    }
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30
            });
        })()
    );
}

export function transferEOS({ accountName, value }) {
    return (
        (async () => {
            await api.transact({
                actions: [{
                    account: 'ipfkoutwqois',
                    name: 'transfer',
                    authorization: [{
                        actor: 'ipfkoutwqois',
                        permission: 'active'
                    }],
                    data: {
                        from: 'ipfkoutwqois',
                        to: accountName,
                        quantity: value + " EOS",
                        memo: ''
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

export function mintToken({ accountName, maxTokenSupply, tokenName }) {
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

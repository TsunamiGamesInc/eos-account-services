var express = require('express');
var app = express();
app.use(express.json());
var catalyst = require('zcatalyst-sdk-node');

var declareModule = require('/JS Projects/eos-account-services/functions/eos_functions/declare');
var api = declareModule.api;

//const fs = require('fs');
const path = require('path');

/* const eosIconPath = path.resolve('../../client/eos_icon.svg')
const logoPath = path.resolve('../../client/logo192.png')
const manifestPath = path.resolve('../../client/manifest.json');
const indexPath = path.resolve('../../client/index.html') */
/* const cssChunkPath = path.resolve('../../client/static/css/main.d6ec0740.chunk.css');
const cssChunkMapPath = path.resolve('../../client/static/css/main.d6ec0740.chunk.css.map');
const jsChunkOnePath = path.resolve('../../client/static/js/2.3f6a6e29.chunk.js')
const jsChunkOneMapPath = path.resolve('../../client/static/js/2.3f6a6e29.chunk.js.map')
const jsChunkTwoPath = path.resolve('../../client/static/js/main.08ad643f.chunk.js')
const jsChunkTwoMapPath = path.resolve('../../client/static/js/main.08ad643f.chunk.js.map')
const backgroundPath = path.resolve('../../client/static/media/background.1bfa5595.webp')

/* app.get('/eos_icon.svg', function (req, res) {
	return (
		res.sendFile(eosIconPath)
	);
})

app.get('/logo192.png', function (req, res) {
	return (
		res.sendFile(logoPath)
	);
})

app.get('/manifest.json', function (req, res) {
	return (
		res.sendFile(manifestPath)
	);
}) */

/* app.get('/static/css/main.d6ec0740.chunk.css', function (req, res) {
	return (
		res.sendFile(cssChunkPath)
	);
})

app.get('/static/css/main.d6ec0740.chunk.css.map', function (req, res) {
	return (
		res.sendFile(cssChunkMapPath)
	);
})

app.get('/static/js/2.3f6a6e29.chunk.js', function (req, res) {
	return (
		res.sendFile(jsChunkOnePath)
	);
})

app.get('/static/js/2.3f6a6e29.chunk.js.map', function (req, res) {
	return (
		res.sendFile(jsChunkOneMapPath)
	);
})

app.get('/static/js/main.08ad643f.chunk.js', function (req, res) {
	return (
		res.sendFile(jsChunkTwoPath)
	);
})

app.get('/static/js/main.08ad643f.chunk.js.map', function (req, res) {
	return (
		res.sendFile(jsChunkTwoMapPath)
	);
})

app.get('/static/js/main.08ad643f.chunk.js.map', function (req, res) {
	return (
		res.sendFile(jsChunkTwoMapPath)
	);
})

app.get('/static/media/background.1bfa5595.webp', function (req, res) {
	return (
		res.sendFile(backgroundPath)
	);
}) */

app.get('/createAccount', function (req, res) {
	createAccount()
		.then(buyRamBytes(newaccount, bytes))
		.then(transferToken(receiver, quantity))
		.then(buyRamBytes(self, bytes))
		.then(result => {
			res.send(result)
		}).catch(err => {
			sendErrorResponse(res)
		})
})

app.get('/getCreatorKey', function (req, res) {
	var catalystApp = catalyst.initialize(req);
	getCreatorKeyFromDataStore(catalystApp).then(
		creatorKey => {
			res.send(creatorKey);
		}
	).catch(err => {
		sendErrorResponse(res)
	})
})

app.get('/transfer', function (req, res) {
	transferToken().then(result => {
		res.send(result)
	}).catch(err => {
		sendErrorResponse(res)
	})
})

app.use('/static', express.static(path.resolve('../../client/static')))

app.all(function (req, res, next) {
	console.log("Called")
	next()
})

app.get('*', function (req, res) {
	res.sendFile(indexPath)
})

function getCreatorKeyFromDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		catalystApp.zcql().executeZCQLQuery("Select CreatorKey from creatorKey").then(queryResponse => {
			resolve(queryResponse)
		}).catch(err => {
			reject(err)
		})
	});
}

async function createAccount() {
	(async () => {
		await api.transact({
			actions: [{
				account: 'eosio',
				name: 'newaccount',
				authorization: [{
					actor: 'bunlrkvgqoby',
					permission: 'active',
				}],
				data: {
					creator: 'bunlrkvgqoby',
					name: 'tsunamigames',
					owner: {
						threshold: 1,
						keys: [{
							key: 'publickey',
							weight: 1
						}],
						accounts: [],
						waits: []
					},
					active: {
						threshold: 1,
						keys: [{
							key: 'publickey',
							weight: 1
						}],
						accounts: [],
						waits: []
					}
				}
			}]
		},
			{
				blocksBehind: 3,
				expireSeconds: 30
			});
	})();
};

async function buyRamBytes(receiver, bytes) {
	(async () => {
		await api.transact({
			actions: [{
				account: 'eosio',
				name: 'buyrambytes',
				authorization: [{
					actor: 'bunlrkvgqoby',
					permission: 'active',
				}],
				data: {
					payer: 'bunlrkvgqoby',
					receiver: receiver,
					bytes: bytes
				}
			}]
		}, {
			blocksBehind: 3,
			expireSeconds: 30,

		})
	})();
};

async function transferToken() {
	(async () => {
		await api.transact({
			actions: [{
				account: 'ipfkoutwqois',
				name: 'transfer',
				authorization: [{
					actor: 'bunlrkvgqoby',
					permission: 'active',
				}],
				data: {
					from: 'bunlrkvgqoby',
					to: 'ipfkoutwqois',
					quantity: '0.0001 NEET',
					memo: 'working'
				}
			}]
		}, {
			blocksBehind: 3,
			expireSeconds: 30
		});
	})();
};

function sendErrorResponse(res) {
	res.status(500);
	res.send({
		"error": "There was an error."
	});
}

/* export default function CreateAccount({ receiverName }) {
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
                        name: receiverName,
                        owner: {
                            threshold: 1,
                            keys: [{
                                key: '',
                                wight: 1
                            }],
                            accounts: [],
                            waits: []
                        },
                        active: {
                            threshold: 1,
                            keys: [{
                                key: '',
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

export function BuyRAM({ receiverName, bytesToBuy }) {
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
                        receiver: receiverName,
                        bytes: bytesToBuy
                    }
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 30
            });
        })()
    );
}

export function TransferEOS({ receiverName, eosQuantity }) {
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
                        to: receiverName,
                        quantity: eosQuantity + " EOS",
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

export function DeployContract({ receiverName }) {
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
                            account: receiverName,
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
                            account: receiverName,
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

export function MintToken({ receiverName, maxTokenSupply, tokenName }) {
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
                            issuer: receiverName,
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

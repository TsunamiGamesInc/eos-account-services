const express = require('express');
const app = express();

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const stripeDetailsPath = path.resolve(__dirname, './files/stripeDetails.txt');
const stripeHoldover = fs.readFileSync(stripeDetailsPath, 'utf-8');
const stripeKeys = JSON.parse(stripeHoldover);
const stripe = require('stripe')(stripeKeys.apiKey);
const endpointSecret = stripeKeys.webhookKey;

const { Api, Serialize } = require('eosjs');
const eosjs_jsonrpc = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig.js');
const { stringify } = require('querystring');
const endpoint = 'https://jungle3.greymass.com';

const creatorKeyPath = path.resolve(__dirname, './files/creatorKey.txt');
const keyHoldover = fs.readFileSync(creatorKeyPath, 'utf-8');
const creatorKey = [keyHoldover];

const nftKeyPath = path.resolve(__dirname, './files/nftKey.txt');
const nftHoldover = fs.readFileSync(nftKeyPath, 'utf-8');
const nftKey = [nftHoldover];

const signatureProvider = new JsSignatureProvider(creatorKey);
const rpc = new eosjs_jsonrpc.JsonRpc(endpoint, { fetch });
const api = new Api({ rpc, signatureProvider });

app.post('/create-checkout-session', express.json(), async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: req.body.lineItems,
        mode: 'payment',
        success_url:
            stripeKeys.successURL + req.body.accountDetails.accountName
            + '?' + req.body.accountDetails.ramQuantity
            + '?' + req.body.accountDetails.salt
            + '?' + req.body.accountDetails.tokenName
            + '?' + true,
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
    checkResources('serveaccount')

    setTimeout(eosFulfill, 500)

    async function eosFulfill() {
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
                .then(async () => await buyRAM(session.metadata.accountName, session.metadata.ramQuantity))
                .then(async () => await checkResources(session.metadata.accountName))
                .then(() => console.log(session.metadata.serverPrivKey)) // intentionally expose the old private key to the server in case the create token function fails before changing account authorizations
                .then(async () => await createToken(
                    session.metadata.accountName, session.metadata.serverPrivKey, session.metadata.tokenName,
                    session.metadata.maxTokenSupply, session.metadata.precision, session.metadata.receiverPubKey))
                .catch(err => console.log(err))
        }
        else if (itemsOrdered.includes(stripeKeys.nftID)) {
            let randomAccName = checkRandomAcc();
            await createAccount(randomAccName, 'EOS8YcArDgxTnDpR5yrYpzvjizRd8KEApTj3JTWSHbA83F9dPnSWK')
                .then(async () => await createNFT(
                    session.metadata.accountName, randomAccName,
                    session.metadata.nftTitle, session.metadata.nftDesc, session.metadata.nftFile))
                .catch(err => console.log(err))
        }
    }
}

function sendErrorResponse(res) {
    res.status(500)
    res.send({
        "error": "There was an error, please contact info@eosaccountservices.com"
    });
}

async function checkResources(accountName) {
    await rpc.get_account(accountName)
        .then(async (data) => {
            if ((data.cpu_limit.available < 4000) || (data.net_limit.available < 12000)) {
                await powerup(accountName)
            }

            if ((data.ram_quota - data.ram_usage) < 500) {
                await buyRAM(accountName, 10)
            }
        })
}

async function powerup(accountName) {
    await api.transact({
        actions: [{
            account: 'eosio',
            name: 'powerup',
            authorization: [{
                actor: 'serveaccount',
                permission: 'active'
            }],
            data: {
                payer: 'serveaccount',
                receiver: accountName,
                days: 1,
                cpu_frac: 600000,
                net_frac: 340000, //68000
                max_payment: '0.0500 EOS'
            }
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
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

async function createToken(accountName, serverPrivKey, tokenName, maxTokenSupply, precision, receiverPubKey) {
    const signatureProvider = new JsSignatureProvider([serverPrivKey]);
    const rpc = new eosjs_jsonrpc.JsonRpc(endpoint, { fetch });
    const recApi = new Api({ rpc, signatureProvider });

    const wasmFilePath = path.resolve(__dirname, './files/eosio.token.wasm');
    const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex');

    const buffer = new Serialize.SerialBuffer({
        textEncoder: recApi.textEncoder,
        textDecoder: recApi.textDecoder
    })

    const abiFilePath = path.resolve(__dirname, './files/eosio.token.abi');
    let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf-8'));
    const abiDefinitions = recApi.abiTypes.get('abi_def');

    abiJSON = abiDefinitions.fields.reduce(
        (acc, { name: fieldname }) =>
            Object.assign(acc, { [fieldname]: acc[fieldname] || [] }),
        abiJSON
    )
    abiDefinitions.serialize(buffer, abiJSON)
    const serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex');

    if (!(maxTokenSupply > 0)) {
        maxTokenSupply = 1000000
    }

    let tokenDetails = maxTokenSupply.toString();
    if (precision > 0) {
        tokenDetails = tokenDetails + ".";

        for (let i = 0; i < precision; i++) {
            tokenDetails = tokenDetails + "0"
        }
    }
    tokenDetails = tokenDetails + " " + tokenName;
    console.log(tokenDetails)

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
            }
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
            async () => {
                setTimeout(createAction, 1000)
                setTimeout(updateAuth, 1500)
            }
        )

    async function createAction() {
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
    }

    async function updateAuth() {
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
    }
}

async function checkRandomAcc() {
    let createAcc = false;

    let randomAccName = (Math.random() + 1).toString(36).substring(2, 18) + (Math.random() + 1).toString(36).substring(2, 18);
    randomAccName = "w" + randomAccName.substring(2, 13)
    randomAccName = randomAccName.replace(/[0-9]/g, 1)
    console.log(randomAccName)

    await rpc.get_account(randomAccName)
        .then(() => {
            // do nothing
        })
        .catch(() => {
            createAcc = true;
        })

    if (createAcc) {
        return randomAccName;
    }
    else {
        checkRandomAcc()
    }
}

async function createNFT(accountName, randomAccName, nftTitle, nftDesc, nftFile) {
    let nftHash;

    await (async () => {
        ipfs.add(nftFile, (err, hash) => {
            if (err) {
                console.log(err)
            }
            else {
                nftHash = hash
            }
        })
    })
        .then(createCol())
        .then(createSchema())
        .then(mintAsset())

    async function createCol() {
        await api.transact({
            actions: [{
                account: 'atomicassets',
                name: 'createcol',
                authorization: [{
                    actor: randomAccName,
                    permission: 'active'
                }],
                data: {
                    author: randomAccName,
                    collection_name: accountName,
                    allow_notify: true,
                    authorized_accounts: [{
                        0: accountName,
                        1: randomAccName
                    }],
                    notify_accounts: [],
                    market_fee: 0,
                    data: [{
                        0: {
                            key: 'name',
                            value: [{
                                0: 'string',
                                1: accountName
                            }]
                        },
                        1: {
                            key: 'img',
                            value: [{
                                0: 'string',
                                1: 'QmeMiJQ8jjmhk5Xznu7cuEKUPaEDLdjGu9omdud83NQqAu'
                            }]
                        }
                    }]
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        })
    }

    async function createSchema() {
        await api.transact({
            actions: [{
                account: 'atomicassets',
                name: 'createschema',
                authorization: [{
                    actor: randomAccName,
                    permission: 'active'
                }],
                data: {
                    authorized_creator: randomAccName,
                    collection_name: accountName,
                    schema_name: accountName,
                    schema_format: [{
                        0: {
                            name: 'name',
                            type: 'string'
                        },
                        2: {
                            name: 'Description',
                            type: 'string'
                        },
                        3: {
                            name: 'Data',
                            type: 'ipfs'
                        }
                    }]
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });
    }

    async function mintAsset() {
        await api.transact({
            actions: [{
                account: 'atomicassets',
                name: 'mintasset',
                authorization: [{
                    actor: randomAccName,
                    permission: 'active'
                }],
                data: {
                    authorized_minter: randomAccName,
                    collection_name: accountName,
                    schema_name: accountName,
                    template_id: [{
                        0: accountName,
                        1: randomAccName
                    }],
                    new_asset_owner: accountName,
                    immutable_data: [{
                        0: {
                            key: 'name',
                            value: [{
                                0: 'string',
                                1: nftTitle
                            }]
                        },
                        1: {
                            key: 'Description',
                            value: [{
                                0: 'string',
                                1: nftDesc
                            }]
                        },
                        2: {
                            key: 'Data',
                            value: [{
                                0: 'ipfs',
                                1: nftFile
                            }]
                        }
                    }],
                    mutable_data: [],
                    tokens_to_back: []
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });
    }
}

module.exports = app;

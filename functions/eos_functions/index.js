const express = require('express');
const app = express();

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const stripeDetailsPath = path.resolve(__dirname, './files/stripeDetails.txt');
const stripeHoldover = fs.readFileSync(stripeDetailsPath, 'utf-8');
const stripeKeys = JSON.parse(stripeHoldover);
const stripe = require('stripe')(stripeKeys.apiKey);
const endpointSecret = stripeKeys.webhookKey;

const { Api, Serialize } = require('eosjs');
const eosjs_jsonrpc = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig.js');
const endpoint = 'https://eos.api.eosnation.io';

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
            + '?' + req.body.accountDetails.nftHash
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
            { limit: 3 },
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

    setTimeout(eosFulfill, 3000)

    let powerUpIncluded = false;

    async function eosFulfill() {
        let itemsOrdered = "";
        lineItems.data.forEach(function (currentItem) {
            itemsOrdered += currentItem.price.product
        })

        if (itemsOrdered.includes(stripeKeys.eosAccountID)) {
            await createAccount(session.metadata.accountName, session.metadata.receiverPubKey)
                .then(() => {
                    powerUpIncluded = true
                })
                .catch(err => console.log(err))
        }

        if (itemsOrdered.includes(stripeKeys.eosRAMID)) {
            setTimeout(async () => {
                await buyRAM(session.metadata.accountName, session.metadata.ramQuantity)
                    .then(() => {
                        powerUpIncluded = true
                    })
                    .catch(err => console.log(err))
            }, 1000)
        }

        if (powerUpIncluded) {
            setTimeout(async () => {
                await powerUp(session.metadata.accountName)
            }, 2000)
        }

        if (itemsOrdered.includes(stripeKeys.nftID)) {
            let randomAccName;

            while (randomAccName === undefined) {
                randomAccName = (Math.random() + 1).toString(36).substring(2, 18) + (Math.random() + 1).toString(36).substring(2, 18);
                randomAccName = "w" + randomAccName.substring(2, 13)
                randomAccName = randomAccName.replace(/[06789]/g, 1)

                await rpc.get_account(randomAccName)
                    .then(() => {
                        randomAccName = undefined;
                    })
                    .catch(async () => {
                        await createAccount(randomAccName, 'EOS5NFTmNiEwdBm7YhjrMwNVuRMP7nM8WxWxyGzt6B4TNe7TToTpE')
                            .catch((err) => console.log(err))
                    })
            }

            setTimeout(async () => {
                await buyRAM(randomAccName, 2)
                    .then(await powerUp(randomAccName))
                    .then(await createNFT(
                        session.metadata.accountName, randomAccName,
                        session.metadata.nftTitle, session.metadata.nftDesc, session.metadata.fileType, session.metadata.nftHash
                    ))
                    .catch(err => console.log(err))
            }, 4000)
        }
        else if (itemsOrdered.includes(stripeKeys.customTokenID)) {
            await createAccount(session.metadata.accountName, session.metadata.serverPubKey)
                .then(async () => await buyRAM(session.metadata.accountName, 500))
                .then(async () => await powerUp(session.metadata.accountName, true))
                .then(() => console.log(session.metadata.serverPrivKey)) // intentionally expose the old private key to the server in case the create token function fails before changing account authorizations
                .then(async () => await createToken(
                    session.metadata.accountName, session.metadata.serverPrivKey, session.metadata.tokenName,
                    session.metadata.maxTokenSupply, session.metadata.precision, session.metadata.receiverPubKey))
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
            if ((data.cpu_limit.available < 4000) || (data.net_limit.available < 8000)) {
                await powerUp(accountName)
            }

            if ((data.ram_quota - data.ram_usage) < 5000) {
                await buyRAM(accountName, 10)
            }
        })
}

async function powerUp(accountName, tokenPowerUp) {
    let netVal = 400000; //68000;

    if (tokenPowerUp) {
        netVal = 400000; //340000;
    }
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
                cpu_frac: 300000000, //600000
                net_frac: 400000, //netVal
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

async function createNFT(accountName, randomAccName, nftTitle, nftDesc, fileType, nftHash) {
    const signatureProvider = new JsSignatureProvider(nftKey);
    const api = new Api({ rpc, signatureProvider });

    if (nftTitle === "") {
        nftTitle = "My NFT!"
    }
    if (nftDesc === "") {
        nftDesc = "My NFT!"
    }

    await createCol()
        .then(setTimeout(createSchema, 3000))
        .then(setTimeout(mintAsset, 10000))

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
                    collection_name: randomAccName,
                    allow_notify: true,
                    authorized_accounts: [randomAccName, accountName],
                    notify_accounts: [],
                    market_fee: 0,
                    data: []
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
                    collection_name: randomAccName,
                    schema_name: randomAccName,
                    schema_format: [
                        {
                            name: 'name',
                            type: 'string'
                        },
                        {
                            name: 'description',
                            type: 'string'
                        },
                        {
                            name: fileType,
                            type: 'ipfs'
                        }
                    ]
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
                    collection_name: randomAccName,
                    schema_name: randomAccName,
                    template_id: -1,
                    new_asset_owner: accountName,
                    immutable_data: [{
                        key: 'name',
                        value: ['string', nftTitle]
                    },
                    {
                        key: 'description',
                        value: ['string', nftDesc]
                    },
                    {
                        key: fileType,
                        value: ['string', nftHash]
                    }
                    ],
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

async function createToken(accountName, serverPrivKey, tokenName, maxTokenSupply, precision, receiverPubKey) {
    const signatureProvider = new JsSignatureProvider([serverPrivKey]);
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
                setTimeout(createAction, 2000)
                setTimeout(updateAuth, 2500)
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

module.exports = app;

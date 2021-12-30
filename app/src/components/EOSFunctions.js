import { Api, JsonRpc, Serialize } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig.js';
import ecc from 'eosjs-ecc';
import fs from 'fs';
import { SetKeyValue } from './ValidName';

/* const endpoint = 'https://api.testnet.eos.io';
const chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

const holdOverPath = './creatorKey.txt'
const holdOver = fs.readFileSync(holdOverPath, 'utf-8');
let creatorKey = ['ABC123']

const signatureProvider = new JsSignatureProvider(creatorKey);
const rpc = new JsonRpc(endpoint);
const api = new Api({ rpc, signatureProvider });

const wasmFilePath = '\eosio.token.wasm';
const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex');

const buffer = new Serialize.SerialBuffer({
    textEncoder: api.textEncoder,
    textDecoder: api.textDecoder
})

const abiFilePath = '\eosio.token.abi';
let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf-8'));
const abiDefinitions = api.abiTypes.get('abi_def');

abiJSON = abiDefinitions.fields.reduce(
    (acc, { name: fieldname }) =>
        Object.assign(acc, { [fieldname]: acc[fieldname] || [] }),
    abiJSON
)
abiDefinitions.serialize(buffer, abiJSON)
const serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex'); */

export async function GenerateKey() {
    ecc.randomKey().then(keyPromise => {
        SetKeyValue(keyPromise)
    });
}

/* export default function GetAccountInfo({ recieverName }) {
    return (
        (async () => {
            await rpc.get_account(recieverName)
        })
    );
} */

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
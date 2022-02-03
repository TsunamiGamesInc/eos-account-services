const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const { Api, Serialize } = require('eosjs');
const eosjs_jsonrpc = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig.js');

const stripeDetailsPath = path.resolve(__dirname, './files/stripeDetails.txt');
const stripeHoldover = fs.readFileSync(stripeDetailsPath, 'utf-8');
const stripeKeys = JSON.parse(stripeHoldover);

const endpoint = 'https://eos.greymass.com';
const creatorKeyPath = path.resolve(__dirname, './files/creatorKey.txt');
const keyHoldover = fs.readFileSync(creatorKeyPath, 'utf-8');
const creatorKey = [keyHoldover];

const signatureProvider = new JsSignatureProvider(creatorKey);
const rpc = new eosjs_jsonrpc.JsonRpc(endpoint, { fetch });
const api = new Api({ rpc, signatureProvider });

const wasmFilePath = path.resolve(__dirname, './files/eosio.token.wasm');
const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex');

const buffer = new Serialize.SerialBuffer({
    textEncoder: api.textEncoder,
    textDecoder: api.textDecoder
})

const abiFilePath = path.resolve(__dirname, './files/eosio.token.abi');
let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf-8'));
const abiDefinitions = api.abiTypes.get('abi_def');

abiJSON = abiDefinitions.fields.reduce(
    (acc, { name: fieldname }) =>
        Object.assign(acc, { [fieldname]: acc[fieldname] || [] }),
    abiJSON
)
abiDefinitions.serialize(buffer, abiJSON)
const serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex');

exports.stripeKeys = stripeKeys;
exports.api = api;
exports.wasmHexString = wasmHexString;
exports.serializedAbiHexString = serializedAbiHexString;

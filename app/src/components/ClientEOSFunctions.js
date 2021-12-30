import { Api, JsonRpc, Serialize } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig.js';
import ecc from 'eosjs-ecc';
import fs from 'fs';

const endpoint = 'https://api.testnet.eos.io';
const chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

const rpc = new JsonRpc(endpoint);
let recKey;

export function GenerateKey() {

    ecc.randomKey().then(privateKey => {
        recKey = privateKey
    })

    return (
        recKey
    );
}

export default function GetAccountInfo({ recieverName }) {
    return (
        (async () => {
            await rpc.get_account(recieverName)
        })
    );
}

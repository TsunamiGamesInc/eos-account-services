import { JsonRpc } from 'eosjs';
import { ecc } from 'eosjs/dist/eosjs-ecc-migration';
import { SetKeyValue } from './ValidName';

const endpoint = 'https://api.testnet.eos.io';

//const rpc = new eosjs_jsonrpc.JsonRpc(endpoint);
const rpc = new JsonRpc(endpoint);

export async function GenerateKey() {
    ecc.randomKey(undefined, { secureEnv: true }).then(data => SetKeyValue(data))
}

export default function GetAccountInfo(recieverName, setIcon, checkIconMd, closeIconMd, setValidName) {
    (async () => {
        await rpc.get_account(recieverName)
            .then(() => {
                setIcon(closeIconMd)
                setValidName(false)
            })
            .catch((err) => {
                setIcon(checkIconMd)
                setValidName(true)
            })
    })();
}

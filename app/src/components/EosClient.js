/* import { JsonRpc } from 'eosjs';
import { ecc } from 'eosjs/dist/eosjs-ecc-migration';

const endpoint = 'https://api.testnet.eos.io';

//const rpc = new eosjs_jsonrpc.JsonRpc(endpoint);
const rpc = new JsonRpc(endpoint);

export async function GenerateKey({ setRecieverPrivKey, setRecieverPubKey }) {
    ecc.randomKey(undefined, { secureEnv: true })
        .then((privateKey) => {
            setRecieverPrivKey(privateKey)

            let publicKey = ecc.privateToPublic(privateKey)
            setRecieverPubKey(publicKey)
        })
}

export default async function GetAccountInfo(recieverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    rpc.get_account(recieverName)
        .then(() => {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("Name is taken!")
        })
        .catch((err) => {
            setIcon(checkIconMd)
            setValidName(true)
            setTooltipTitle("Name is available!")
        });
}

export async function CheckExistingName(recieverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    rpc.get_account(recieverName)
        .then(() => {
            setIcon(checkIconMd)
            setValidName(true)
            setTooltipTitle("Found your account!")
        })
        .catch((err) => {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("That account doesn't exist!")
        });
}
*/

//just for testing catalyst functions without building eosjs everytime

export async function GenerateKey({ setRecieverPrivKey, setRecieverPubKey }) {
    setRecieverPrivKey("Hello Helcim")
    setRecieverPubKey("Hello Helcim")
}

export default async function GetAccountInfo(recieverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    setIcon(checkIconMd)
    setValidName(true)
    setTooltipTitle("Name is available!")
}

export async function CheckExistingName(recieverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    setIcon(checkIconMd)
    setValidName(true)
    setTooltipTitle("Found your account!")
}

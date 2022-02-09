/* import { JsonRpc } from 'eosjs';
import { ecc } from 'eosjs/dist/eosjs-ecc-migration';

const endpoint = 'https://eos.greymass.com';
const rpc = new JsonRpc(endpoint);

export async function GenerateKey({ setRecieverPrivKey, setRecieverPubKey }) {
    await ecc.randomKey(undefined, { secureEnv: true })
        .then((privateKey) => {
            setRecieverPrivKey(privateKey)
            let publicKey = ecc.privateToPublic(privateKey)
            setRecieverPubKey(publicKey)
        })
}

export default async function GetAccountInfo(recieverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    await rpc.get_account(recieverName)
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

export async function GetAccountInfoNoValid(recieverName, setIcon, checkIconMd, closeIconMd, setTooltipTitle) {
    await rpc.get_account(recieverName)
        .then(() => {
            setIcon(closeIconMd)
            setTooltipTitle("Name is taken!")
        })
        .catch((err) => {
            setIcon(checkIconMd)
            setTooltipTitle("Name is available!")
        });
}

export async function CheckExistingName(recieverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    await rpc.get_account(recieverName)
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
} */

//just for testing catalyst functions without building eosjs everytime

export async function GenerateKey({ setRecieverPrivKey, setRecieverPubKey }) {
    setRecieverPrivKey("Hello")
    setRecieverPubKey("Hello")
}

export default async function GetAccountInfo(recieverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    setIcon(checkIconMd)
    setValidName(true)
    setTooltipTitle("Name is available!")
}

export async function GetAccountInfoNoValid(recieverName, setIcon, checkIconMd, closeIconMd, setTooltipTitle) {
    setIcon(checkIconMd)
    setTooltipTitle("Name is available!")
}

export async function CheckExistingName(recieverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    setIcon(checkIconMd)
    setValidName(true)
    setTooltipTitle("Found your account!")
}

import { JsonRpc } from 'eosjs';
import { ecc } from 'eosjs/dist/eosjs-ecc-migration';

const endpoint = 'https://jungle3.greymass.com';
const rpc = new JsonRpc(endpoint);

export async function GenerateKey({ setReceiverPrivKey, setReceiverPubKey }) {
    await ecc.randomKey(undefined, { secureEnv: true })
        .then((privateKey) => {
            setReceiverPrivKey(privateKey)
            let publicKey = ecc.privateToPublic(privateKey)
            setReceiverPubKey(publicKey)
        })
}

export async function GenerateServerKey({ setServerPrivKey, setServerPubKey }) {
    await ecc.randomKey(undefined, { secureEnv: true })
        .then((privateKey) => {
            setServerPrivKey(privateKey)
            let publicKey = ecc.privateToPublic(privateKey)
            setServerPubKey(publicKey)
        })
}

export default async function GetAccountInfo(receiverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    await rpc.get_account(receiverName)
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

export async function GetAccountInfoNoValid(receiverName, setIcon, checkIconMd, closeIconMd, setTooltipTitle) {
    await rpc.get_account(receiverName)
        .then(() => {
            setIcon(closeIconMd)
            setTooltipTitle("Name is taken!")
        })
        .catch((err) => {
            setIcon(checkIconMd)
            setTooltipTitle("Name is available!")
        });
}

export async function CheckExistingName(receiverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    await rpc.get_account(receiverName)
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

//just for testing catalyst functions without building eosjs everytime

/* export async function GenerateKey({ setReceiverPrivKey, setReceiverPubKey }) {
    setReceiverPrivKey("Hello")
    setReceiverPubKey("Hello")
}

export default async function GetAccountInfo(receiverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    setIcon(checkIconMd)
    setValidName(true)
    setTooltipTitle("Name is available!")
}

export async function GetAccountInfoNoValid(receiverName, setIcon, checkIconMd, closeIconMd, setTooltipTitle) {
    setIcon(checkIconMd)
    setTooltipTitle("Name is available!")
}

export async function CheckExistingName(receiverName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle) {
    setIcon(checkIconMd)
    setValidName(true)
    setTooltipTitle("Found your account!")
} */

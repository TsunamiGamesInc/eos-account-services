import { ecc } from 'eosjs/dist/eosjs-ecc-migration';

let keyFound = false;

// eslint-disable-next-line no-restricted-globals
self.onmessage = async (message) => {
    while (!keyFound) {
        await ecc.randomKey(undefined, { secureEnv: true })
            .then((privateKey) => checkKey(message, privateKey))
    }
}

async function checkKey(message, privateKey) {
    let publicKey = ecc.privateToPublic(privateKey)
    if (publicKey.startsWith(message.data.accountName, 4)) {
        keyFound = true;
        postMessage({ receiverPubKey: publicKey, receiverPrivKey: privateKey })
    }
}

/*  Not case-sensitive version
    let publicKey = ecc.privateToPublic(privateKey);
    let pubKeyLower = publicKey.toLowerCase();
    let messageLower = message.data.accountName.toLowerCase();

    if (pubKeyLower.startsWith(messageLower, 4)) {
        keyFound = true;
        postMessage({ receiverPubKey: publicKey, receiverPrivKey: privateKey })
    }
*/

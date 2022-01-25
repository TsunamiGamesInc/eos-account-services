/* import { ecc } from 'eosjs/dist/eosjs-ecc-migration';

export async function GenerateVanityKey(
    prefix, { keysCreated, setKeysCreated, setVanityText, setRecieverPrivKey, setRecieverPubKey }) {
    let keyFound = false;
    let i = 0;
    do {
        await ecc.randomKey(undefined, { secureEnv: true })
            .then((privateKey) => {
                console.log("key created")
                let testa = keysCreated++
                setKeysCreated(testa)
                let publicKey = ecc.privateToPublic(privateKey)
                if (publicKey.startsWith(prefix, 4)) {
                    console.log("Found vanity key")
                    keyFound = true;
                    setVanityText(publicKey)
                    setRecieverPrivKey(privateKey)
                    setRecieverPubKey(publicKey)
                }
            })
        i++;
        if (i == 10) {
            keyFound = true;
            postMessage("Worker finished");
        }
    }
    while (!keyFound);
}
 */
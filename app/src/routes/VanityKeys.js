import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import VanityKeysComponents from '../components/vanityKeys/VanityKeysComponents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../components/vanityKeys/VanityKeyWorker.js';

export default function VanityKeys({ accountName, setAccountName, validName, setValidName,
    receiverPrivKey, setReceiverPrivKey, receiverPubKey, setReceiverPubKey, totalPrice, setTotalPrice }) {
    const vkWorker = [];

    for (var i = 0; i < 6; i++) {
        vkWorker[i] = new Worker();

        vkWorker[i].onmessage = (message) => {
            setReceiverPrivKey(message.data.receiverPrivKey)
            setReceiverPubKey(message.data.receiverPubKey)
            document.getElementById("wait").innerHTML = "Found your key!"

            for (var i = 0; i < 6; i++) {
                vkWorker[i].terminate()
            }
        }
    }

    useEffect(() => () => {
        for (var i = 0; i < 6; i++) {
            vkWorker[i].terminate()
        }
    })


    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let accountPrice = formatter.format(3.99) + " USD";
        setTotalPrice(accountPrice)
    }, [validName, setTotalPrice])

    let salt;
    let placement;
    let saltedPrivKey;
    if (!receiverPrivKey.startsWith("Y")) {
        salt = (Math.random() + 1).toString(36).substring(3, 4)
        if ((salt === "0") || (salt === "o")) {
            salt = "j"
        }
    
        const capitalize = Math.random()
        if (capitalize > 0.5) {
            salt = salt.toUpperCase()
        }
    
        placement = (Math.floor(Math.random() * 47) + 4)
        saltedPrivKey = [receiverPrivKey.slice(0, placement), salt, receiverPrivKey.slice(placement)].join('')
        salt = (salt + placement)
    }
    else {
        saltedPrivKey = receiverPrivKey
    }

    let postData = {
        accountDetails: {
            salt: salt,
            receiverPubKey: receiverPubKey,
        },
        lineItems:
            [
                {
                    price: 'price_1KnTUvAVYdsvCkiZXUVDnb7N',
                    quantity: 1,
                    description: "Vanity Key: " + receiverPubKey
                }
            ]
    };

    return (
        <div>
            <Helmet>
                <title>Get Custom Vanity Keys for the EOS Blockchain</title>
                <meta
                    name="description"
                    content="Get EOS Vanity Keys with a credit card."
                />
                <meta
                    name="keywords"
                    content="EOS Vanity Keys, EOS Pay to Key, Blockchain, Credit Card, Safe"
                />
            </Helmet>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
                <Grid item display={{ xs: 'none', md: 'block' }}>
                    <Box sx={{ width: '250px' }}>
                        <NavBar totalPrice={totalPrice} />
                    </Box>
                </Grid>
                <Grid item xl={6}>
                    <Box sx={{ width: { xs: '410px', md: '525px' } }}>
                        <VanityKeysComponents
                            accountName={accountName} setAccountName={setAccountName}
                            validName={validName} setValidName={setValidName}
                            receiverPubKey={receiverPubKey}
                            saltedPrivKey={saltedPrivKey} vkWorker={vkWorker}
                            postData={postData} totalPrice={totalPrice}
                        />
                    </Box>
                </Grid>
                <Grid item display={{ xs: 'block', md: 'none' }}>
                    <CustomDrawer />
                </Grid>
            </Grid>
        </div>
    );
}

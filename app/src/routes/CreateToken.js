import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CreateTokenComponents from '../components/createToken/CreateTokenComponents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';

export default function CreateToken({ tokenName, setTokenName, accountName, setAccountName, validName, setValidName,
    receiverPrivKey, setReceiverPrivKey, receiverPubKey, setReceiverPubKey, totalPrice, setTotalPrice }) {

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let tokenPrice = formatter.format(249.99) + " USD";
        setTotalPrice(tokenPrice)
    }, [validName, setTotalPrice])

    return (
        <div>
            <Helmet>
                <title>Create Account</title>
                <meta
                    name="description"
                    content="The easiest and cheapest EOS token creation by Credit Card."
                />
                <meta
                    name="keywords"
                    content="EOS Custom Token, Mint, Coin, Blockchain, Cheap, Easy, Credit Card"
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
                        <CreateTokenComponents
                            tokenName={tokenName} setTokenName={setTokenName}
                            accountName={accountName} setAccountName={setAccountName}
                            validName={validName} setValidName={setValidName}
                            receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                            receiverPubKey={receiverPubKey} setReceiverPubKey={setReceiverPubKey}
                            totalPrice={totalPrice}
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

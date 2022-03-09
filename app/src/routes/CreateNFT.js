import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CreateNFTComponents from '../components/createNFT/CreateNFTComponents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';

export default function CreateNFT({ accountName, setAccountName, nftTitle, setNftTitle, nftDesc, setNftDesc,
    validName, setValidName, setReceiverPrivKey, setReceiverPubKey, totalPrice, setTotalPrice }) {
    let postData = {
        accountDetails: {
            accountName: accountName,
            nftTitle: nftTitle,
            nftDesc: nftDesc
        },
        lineItems:
            [
                {
                    price: 'price_1KLx2tAVYdsvCkiZ6U3mHNxW', //'price_1KQfYuAVYdsvCkiZEVuwDThX',
                    quantity: 1,
                    description: "NFT Creation for Account: " + accountName
                }
            ]
    };

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let tokenPrice = formatter.format(9.99) + " USD";
        setTotalPrice(tokenPrice)
    }, [validName, setTotalPrice])

    return (
        <div>
            <Helmet>
                <title>Create NFT</title>
                <meta
                    name="description"
                    content="The easiest and cheapest EOS NFT creation by Credit Card."
                />
                <meta
                    name="keywords"
                    content="EOS NFTs, Mint, Non-Fungible Token, Easy, Credit Card"
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
                        <CreateNFTComponents
                            accountName={accountName} setAccountName={setAccountName}
                            nftTitle={nftTitle} setNftTitle={setNftTitle}
                            nftDesc={nftDesc} setNftDesc={setNftDesc}
                            validName={validName} setValidName={setValidName}
                            setReceiverPrivKey={setReceiverPrivKey}
                            setReceiverPubKey={setReceiverPubKey}
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

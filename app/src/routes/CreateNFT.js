import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CreateNFTComponents from '../components/createNFT/CreateNFTComponents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';

export default function CreateNFT({ accountName, setAccountName, validName, setValidName,
    setReceiverPrivKey, setReceiverPubKey, totalPrice, setTotalPrice }) {
    const [nftTitle, setNftTitle] = React.useState("");
    const [nftDesc, setNftDesc] = React.useState("");
    const [fileType, setFileType] = React.useState("img");
    const [nftHash, setNftHash] = React.useState("QmeMiJQ8jjmhk5Xznu7cuEKUPaEDLdjGu9omdud83NQqAu");

    let postData = {
        accountDetails: {
            accountName: accountName,
            nftTitle: nftTitle,
            nftDesc: nftDesc,
            fileType: fileType,
            nftHash: nftHash
        },
        lineItems:
            [
                {
                    price: 'price_1KnTUlAVYdsvCkiZGOQJHPQ3',
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
        let nftPrice = formatter.format(12.99) + " USD";
        setTotalPrice(nftPrice)
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
                            setFileType={setFileType} setNftHash={setNftHash}
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

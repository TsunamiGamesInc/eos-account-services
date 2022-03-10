import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ResourcesTextField } from '../CustomTextFields';
import CreateNFTValidName from './CreateNFTValidName.js'

export default function CreateNFTComponents({ accountName, setAccountName, nftTitle, setNftTitle, nftDesc, setNftDesc, setNftFile,
    validName, setValidName, setReceiverPrivKey, setReceiverPubKey, postData, totalPrice }) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={9.5} container>
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh' }} display={{ xs: 'none', md: 'block' }} />
                    <Box sx={{ height: '1vh' }} display={{ xs: 'block', md: 'none' }} />
                </Grid>
                <Grid item xs={12}>
                    <ResourcesTextField accountName={accountName} setAccountName={setAccountName} setValidName={setValidName} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '1.1vh' }} />
                </Grid>
                {!validName &&
                    <Grid item xs={12}>
                        <p style={{ color: 'white', lineHeight: 2, fontWeight: 'normal', fontSize: 16 }}>
                            Minting NFTs is as easy as typing your name.
                            <br />Don't worry, the textbox will help you along.
                        </p>
                    </Grid>
                }
                {validName &&
                    <CreateNFTValidName
                        nftTitle={nftTitle} setNftTitle={setNftTitle}
                        nftDesc={nftDesc} setNftDesc={setNftDesc}
                        setNftFile={setNftFile}
                        setReceiverPrivKey={setReceiverPrivKey}
                        setReceiverPubKey={setReceiverPubKey}
                        postData={postData} totalPrice={totalPrice}
                    />}
            </Grid>
        </Grid >
    );
}

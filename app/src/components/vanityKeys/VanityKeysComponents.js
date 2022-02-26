import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { VanityTextField } from '../CustomTextFields';
import VanityKeysValidName from './VanityKeysValidName.js'

export default function VanityKeysComponents({ accountName, setAccountName, validName, setValidName,
    receiverPubKey, saltedPrivKey, vkWorker, postData, totalPrice }) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={9.5} container>
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh' }} display={{ xs: 'none', md: 'block' }} />
                    <Box sx={{ height: '1vh' }} display={{ xs: 'block', md: 'none' }} />
                </Grid>
                <Grid item xs={12}>
                    <VanityTextField accountName={accountName} setAccountName={setAccountName} setValidName={setValidName} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '1.1vh' }} />
                </Grid>
                {!validName &&
                    <Grid item xs={12}>
                        <p style={{ color: 'white', lineHeight: 2, fontWeight: 'normal', fontSize: 16 }}>
                            Customize your public key with any prefix!
                            <br />Up to 5 characters (a through Z, 1 through 9).
                            <br />Vanity keys are 100% random and 100% secure.
                        </p>
                    </Grid>
                }
                {validName &&
                    <VanityKeysValidName
                        accountName={accountName}
                        receiverPubKey={receiverPubKey}
                        saltedPrivKey={saltedPrivKey} vkWorker={vkWorker}
                        postData={postData} totalPrice={totalPrice}
                    />}
            </Grid>
        </Grid >
    );
}

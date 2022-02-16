import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { VanityTextField } from '../CustomTextFields';
import VanityKeysValidName from './VanityKeysValidName.js'

export default function VanityKeysComponents({ accountName, setAccountName, validName, setValidName,
    receiverPrivKey, receiverPubKey, vkWorker, postData, totalPrice }) {

    return (
        <Grid container spacing={3}>
            <Grid item xs={9.5} container>
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh', backgroundColor: 'transparent' }} />
                </Grid>
                <Grid item xs={12}>
                    <VanityTextField accountName={accountName} setAccountName={setAccountName} setValidName={setValidName} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '1.1vh' }} />
                </Grid>
                {!validName &&
                    <Grid item xs={12} container spacing={0}>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16, padding: '12px 0px 0px 0px' }}>
                                Customize your public key with any prefix!
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                Up to 5 characters (a through Z, 1 through 9).
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                Vanity keys are 100% random and 100% secure.
                            </p>
                        </Grid>
                    </Grid>
                }
                {validName &&
                    <VanityKeysValidName
                        accountName={accountName}
                        receiverPrivKey={receiverPrivKey} receiverPubKey={receiverPubKey}
                        vkWorker={vkWorker} postData={postData} totalPrice={totalPrice}
                    />}
            </Grid>
        </Grid >
    );
}

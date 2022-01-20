import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { VanityTextField } from '../CustomTextFields';
import VanityKeysValidName from './VanityKeysValidName.js'

export default function VanityKeysComponents({ validName, setValidName, recieverPubKey, setRecieverPubKey, totalPrice }) {
    const [vanityName, setVanityName] = useState("")

    return (
        <Grid container spacing={3}>
            <Grid item xs={9.5} container>
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh', backgroundColor: 'transparent' }} />
                </Grid>
                <Grid item xs={12}>
                    <VanityTextField vanityName={vanityName} setVanityName={setVanityName} setValidName={setValidName} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '1vh' }} />
                </Grid>
                {!validName &&
                    <Grid item xs={12} container spacing={0}>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16, padding: '12px 0px 0px 0px' }}>
                                Customize your public key with anything you'd like!
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                Up to 5 characters (A through Z, 1 through 9).
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
                        vanityName={vanityName} recieverPubKey={recieverPubKey} setRecieverPubKey={setRecieverPubKey} totalPrice={totalPrice}
                    />}
            </Grid>
        </Grid >
    );
}

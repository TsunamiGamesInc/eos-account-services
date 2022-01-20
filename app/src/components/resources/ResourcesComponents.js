import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ResourcesTextField } from '../CustomTextFields';
import ResourcesValidName, { ResourcesValidNameComponentsTwo } from './ResourcesValidName.js'

export default function ResourcesComponents({ ramQuantity, setRamQuantity,
    accountName, setAccountName, validName, setValidName, totalPrice }) {
    let ramQuantityMirror = ramQuantity;

    return (
        <Grid container spacing={3}>
            <Grid item xs={9.5} container>
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh', backgroundColor: 'transparent' }} />
                </Grid>
                <Grid item xs={12}>
                    <ResourcesTextField accountName={accountName} setAccountName={setAccountName} setValidName={setValidName} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '1vh' }} />
                </Grid>
                {!validName &&
                    <Grid item xs={12} container spacing={0}>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16, padding: '12px 0px 0px 0px' }}>
                                Getting resources is as easy as typing your account name.
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                Don't worry, the textbox will help you along.
                            </p>
                        </Grid>
                    </Grid>
                }
                {validName &&
                    <ResourcesValidName
                        ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                        ramQuantityMirror={ramQuantityMirror} totalPrice={totalPrice}
                    />}
            </Grid>
            {validName &&
                <ResourcesValidNameComponentsTwo
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    ramQuantityMirror={ramQuantityMirror}
                />}
        </Grid >
    );
}

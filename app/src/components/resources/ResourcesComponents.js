import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ResourcesTextField } from '../CustomTextFields';
import ResourcesValidName, { ResourcesValidNameComponentsTwo } from './ResourcesValidName.js'

export default function ResourcesComponents({ accountName, setAccountName, validName, setValidName,
    ramQuantity, setRamQuantity, postData, totalPrice }) {
    let ramQuantityMirror = ramQuantity;

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
                            Getting resources is as easy as typing your name.
                            <br />Don't worry, the textbox will help you along.
                        </p>
                    </Grid>
                }
                {validName &&
                    <ResourcesValidName
                        ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                        postData={postData} totalPrice={totalPrice}
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

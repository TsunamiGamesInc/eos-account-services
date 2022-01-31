import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomTextField from '../CustomTextFields';
import ValidName, { ValidNameComponentsTwo } from './CreateAccountValidName.js'

export default function CreateAccountComponents({ accountName, setAccountName, validName, setValidName,
    ramQuantity, setRamQuantity, setRecieverPubKey, postData, totalPrice }) {
    let ramQuantityMirror = ramQuantity;

    return (
        <Grid container spacing={3}>
            <Grid item xs={9.5} container>
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh', backgroundColor: 'transparent' }} />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField accountName={accountName} setAccountName={setAccountName} setValidName={setValidName} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '1.1vh' }} />
                </Grid>
                {!validName &&
                    <Grid item xs={12} container spacing={0}>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16, padding: '12px 0px 0px 0px' }}>
                                Getting started is as easy as choosing your name.
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                EOS names are 12 characters long (a-z, 1-5).
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
                    <ValidName
                        ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                        ramQuantityMirror={ramQuantityMirror}
                        setRecieverPubKey={setRecieverPubKey}
                        postData={postData} totalPrice={totalPrice}
                    />}
            </Grid>
            {validName &&
                <ValidNameComponentsTwo
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    ramQuantityMirror={ramQuantityMirror}
                />}
        </Grid >
    );
}

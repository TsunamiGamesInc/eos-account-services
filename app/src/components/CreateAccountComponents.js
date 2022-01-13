import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomTextField from './CustomTextFields';
import ValidName, { ValidNameComponentsTwo } from './ValidName.js'

export default function CreateAccountComponents({ value, setValue, valueR, setValueR,
    accountName, setAccountName, validName, setValidName, setRecieverPubKey, totalPrice }) {
    let valueMirror = value;
    let valueMirrorR = valueR;

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
                    <Box sx={{ height: '1vh' }} />
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
                                EOS names are 12 characters long (A through Z, 1 through 5).
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
                        value={value} setValue={setValue} valueR={valueR} setValueR={setValueR} totalPrice={totalPrice}
                        valueMirror={valueMirror} valueMirrorR={valueMirrorR} setRecieverPubKey={setRecieverPubKey}
                    />}
            </Grid>
            {validName &&
                <ValidNameComponentsTwo
                    value={value} setValue={setValue} valueR={valueR} setValueR={setValueR} valueMirror={valueMirror}
                    valueMirrorR={valueMirrorR}
                />}
        </Grid >
    );
}

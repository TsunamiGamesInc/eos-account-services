import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SliderTextField } from './CustomTextField';
import CustomSliders from './CustomSliders';
import { RecommendedButton, CustomButtonSmall, CheckoutButton } from './CustomButtons';
import CustomCheckBox from './CustomCheckbox';
import { GenerateKey } from './EOSFunctions';
import { Link } from 'react-router-dom';

let recieverKey;

GenerateKey()

export function SetKeyValue(keyPromise) {
    recieverKey = keyPromise
}

export default function ValidNameComponentsOne({ value, setValue, valueR, setValueR, valueMirror, valueMirrorR, totalPrice }) {
    return (
        <>
            <Grid item xs={12} container>
                <Grid item xs={3.4} />
                <Grid item xs={3} container justifyContent="flex-end">
                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 18 }}> EOS </p>
                </Grid>
                <Grid item xs={5.25}>
                    <RecommendedButton value={value} setValue={setValue} valueR={valueR} setValueR={setValueR} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomSliders value={value} setValue={setValue} valueMirror={valueMirror} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 18 }}> RAM </p>
            </Grid>
            <Grid item xs={12}>
                <CustomSliders value={valueR} setValue={setValueR} valueMirror={valueMirrorR} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '2vh' }} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}> Private Key/Password </p>
            </Grid>
            <Grid item xs={12}>
                <CustomButtonSmall txt={recieverKey} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '3vh' }} />
            </Grid>
            <Grid item xs={12}>
                <CustomCheckBox scaledLabel="I have saved my password and understand it cannot be recovered" />
            </Grid>
            <Grid item xs={12}>
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                    <CheckoutButton txt={"Pay " + totalPrice} />
                </Link>
            </Grid>
        </>
    );
}

export function ValidNameComponentsTwo({ setValue, setValueR, valueMirror, valueMirrorR }) {
    return (
        <>
            <Grid item xs={2.5} container>
                <Box sx={{ width: '90px' }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box sx={{ height: '16vh' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ height: '85px' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ height: '112px' }}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <SliderTextField setValue={setValue} valueMirror={valueMirror} maxValue={10} endAdornmentText="EOS" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SliderTextField setValue={setValueR} valueMirror={valueMirrorR} maxValue={999} endAdornmentText="KB" />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid >
        </>
    );
}
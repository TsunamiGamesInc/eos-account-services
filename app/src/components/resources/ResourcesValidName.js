import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SliderTextField } from '../CustomTextFields';
import CustomSliders from '../CustomSliders';
import { RecommendedButton, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import ConditionalLink from '../ConditionalLink';
import CustomAlert from '../CustomAlerts';

export default function ResourcesValidNameComponentsOne({
    value, setValue, valueR, setValueR, valueMirror, valueMirrorR, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);

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
                <Box sx={{ height: '1vh' }} />
            </Grid>
            {!open &&
                <Grid item xs={12}>
                    <Box sx={{ height: '35px' }} />
                </Grid>
            }
            {open &&
                <Grid item xs={12}>
                    <CustomAlert open={open} setOpen={setOpen} text={"Check you typed the name correctly!"} />
                </Grid>
            }
            <Grid item xs={12}>
                <CustomCheckBox keyCopied={keyCopied} setKeyCopied={setKeyCopied} scaledLabel="My account name is correct and I understand this can't be refunded" />
            </Grid>
            <Grid item xs={12}>
                <ConditionalLink to="/app/checkout" condition={keyCopied}>
                    <CheckoutButton keyCopied={keyCopied} setOpen={setOpen}>
                        {"Pay " + totalPrice}
                    </CheckoutButton>
                </ConditionalLink>
            </Grid>
        </>
    );
}

export function ResourcesValidNameComponentsTwo({ setValue, setValueR, valueMirror, valueMirrorR }) {
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
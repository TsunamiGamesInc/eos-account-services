import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SliderTextField } from '../CustomTextFields';
import CustomSliders from '../CustomSliders';
import { RecommendedButton, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import CustomAlert from '../CustomAlerts';

export default function ResourcesValidNameComponentsOne({ ramQuantity, setRamQuantity, postData, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ height: '1vh' }} />
            </Grid>
            <Grid item xs={12} container>
                <Grid item xs={3.5} />
                <Grid item xs={3} container justifyContent="flex-end">
                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 18 }}>RAM</p>
                </Grid>
                <Grid item xs={5.0568}>
                    <RecommendedButton ramQuantity={ramQuantity} setRamQuantity={setRamQuantity} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomSliders
                    value={ramQuantity} setValue={setRamQuantity} minimum={1} maximum={30} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 12 }}>
                    Includes a Free EOS PowerUp!
                </p>
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
                    <CustomAlert
                        open={open} setOpen={setOpen}
                        label="Check you typed the name correctly!"
                        labelMobile="Ensure the name is correct!" />
                </Grid>
            }
            <Grid item xs={12}>
                <CustomCheckBox
                    keyCopied={keyCopied} setKeyCopied={setKeyCopied}
                    label="My account name is correct and I understand this can't be refunded"
                    labelMobile="My account name is correct, this can't be refunded" />
            </Grid>
            <Grid item xs={12}>
                <CheckoutButton keyCopied={keyCopied} setOpen={setOpen} postData={postData} totalPrice={totalPrice} />
            </Grid>
        </>
    );
}

export function ResourcesValidNameComponentsTwo({ setRamQuantity, ramQuantityMirror }) {
    return (
        <>
            <Grid item xs={2.5} container display={{ xs: 'none', md: 'block' }}>
                <Box sx={{ width: '90px' }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box sx={{ height: '17vh' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ height: '85px' }} />
                        </Grid>
                        <Grid item xs={12} display={{ xs: 'block', md: 'none' }}>
                            <Box sx={{ height: '20px' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ height: '112px' }}>
                                <Grid item xs={12}>
                                    <SliderTextField setValue={setRamQuantity} valueMirror={ramQuantityMirror} endAdornmentText="KB" />
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid >
        </>
    );
}
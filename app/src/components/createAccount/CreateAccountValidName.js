import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SliderTextField } from '../CustomTextFields';
import CustomSliders, { CustomSliderMobile } from '../CustomSliders';
import { RecommendedButton, TooltipButtonSmall, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import { GenerateKey } from '../EosClient';
import CustomAlert from '../CustomAlerts';

export default function ValidNameComponentsOne({
    ramQuantity, setRamQuantity, ramQuantityMirror, setRecieverPubKey, postData, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [recieverPrivKey, setRecieverPrivKey] = React.useState("Error! Please do not proceed.");

    useEffect(() => {
        GenerateKey({ setRecieverPrivKey, setRecieverPubKey })
    }, [setRecieverPrivKey, setRecieverPubKey])

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ height: '1vh' }} />
            </Grid>
            <Grid item xs={12} container>
                <Grid item xs={3.5} />
                <Grid item xs={3} container justifyContent="flex-end">
                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 18 }}> RAM </p>
                </Grid>
                <Grid item xs={5.0568}>
                    <RecommendedButton ramQuantity={ramQuantity} setRamQuantity={setRamQuantity} />
                </Grid>
            </Grid>
            <Grid item xs={12} display={{ xs: 'none', md: 'block' }}>
                <CustomSliders value={ramQuantity} setValue={setRamQuantity} minimum={0} maximum={10} />
            </Grid>
            <Grid item xs={12} display={{ xs: 'block', md: 'none' }}>
                <CustomSliderMobile value={ramQuantity} setValue={setRamQuantity} minimum={0} maximum={10} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '2vh' }} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}> Private Key/Password </p>
            </Grid>
            <Grid item xs={12}>
                <TooltipButtonSmall txt={recieverPrivKey} />
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
                    <CustomAlert open={open} setOpen={setOpen} text={"Save this key - it cannot be recovered!"} />
                </Grid>
            }
            <Grid item xs={12}>
                <CustomCheckBox keyCopied={keyCopied} setKeyCopied={setKeyCopied} label="I have saved my password and understand it cannot be recovered" />
            </Grid>
            <Grid item xs={12}>
                <CheckoutButton keyCopied={keyCopied} setOpen={setOpen} postData={postData}>
                    {"Pay " + totalPrice}
                </CheckoutButton>
            </Grid>
        </>
    );
}

export function ValidNameComponentsTwo({ setRamQuantity, ramQuantityMirror }) {
    return (
        <>
            <Grid item xs={2.5} container>
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
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <SliderTextField setValue={setRamQuantity} valueMirror={ramQuantityMirror} endAdornmentText="KB" />
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
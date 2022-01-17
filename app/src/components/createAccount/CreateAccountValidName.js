import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SliderTextField } from '../CustomTextFields';
import CustomSliders from '../CustomSliders';
import { RecommendedButton, CustomButtonSmall, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import { GenerateKey } from '../EosClient';
import ConditionalLink from '../ConditionalLink';
import CustomAlert from '../CustomAlerts';

export default function ValidNameComponentsOne({
    eosQuantity, setEosQuantity, ramQuantity, setRamQuantity, eosQuantityMirror, ramQuantityMirror, setRecieverPubKey, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [recieverPrivKey, setRecieverPrivKey] = React.useState("Error! Please do not proceed.");

    useEffect(() => {
        GenerateKey({ setRecieverPrivKey, setRecieverPubKey })
    }, [setRecieverPrivKey, setRecieverPubKey])

    return (
        <>
            <Grid item xs={12} container>
                <Grid item xs={3.4} />
                <Grid item xs={3} container justifyContent="flex-end">
                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 18 }}> EOS </p>
                </Grid>
                <Grid item xs={5.25}>
                    <RecommendedButton eosQuantity={eosQuantity} setEosQuantity={setEosQuantity} ramQuantity={ramQuantity} setRamQuantity={setRamQuantity} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomSliders value={eosQuantity} setValue={setEosQuantity} valueMirror={eosQuantityMirror} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 18 }}> RAM </p>
            </Grid>
            <Grid item xs={12}>
                <CustomSliders value={ramQuantity} setValue={setRamQuantity} valueMirror={ramQuantityMirror} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '1vh' }} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}> Private Key/Password </p>
            </Grid>
            <Grid item xs={12}>
                <CustomButtonSmall txt={recieverPrivKey} />
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
                <ConditionalLink to="/app/checkout" condition={keyCopied}>
                    <CheckoutButton keyCopied={keyCopied} setOpen={setOpen}>
                        {"Pay " + totalPrice}
                    </CheckoutButton>
                </ConditionalLink>
            </Grid>
        </>
    );
}

export function ValidNameComponentsTwo({ setEosQuantity, setRamQuantity, eosQuantityMirror, ramQuantityMirror }) {
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
                                        <SliderTextField setValue={setEosQuantity} valueMirror={eosQuantityMirror} maxValue={10} endAdornmentText="EOS" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SliderTextField setValue={setRamQuantity} valueMirror={ramQuantityMirror} maxValue={999} endAdornmentText="KB" />
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
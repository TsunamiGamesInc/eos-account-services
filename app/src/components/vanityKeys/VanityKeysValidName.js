import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomSwitches from '../CustomSwitches';
import { CustomButtonSmall, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import { GenerateKey } from '../EosClient';
import ConditionalLink from '../ConditionalLink';
import CustomAlert from '../CustomAlerts';

export default function VanityKeysValidNameComponentsOne({ setRecieverPubKey, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [recieverPrivKey, setRecieverPrivKey] = React.useState("Error! Please do not proceed.");

    useEffect(() => {
        GenerateKey({ setRecieverPrivKey, setRecieverPubKey })
    }, [setRecieverPrivKey, setRecieverPubKey])

    return (
        <>
            <Grid item xs={12} container alignItems='center'>
                <Grid item xs={4} />
                <Grid item xs={1.2}>
                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                        Prefix
                    </p>
                </Grid>
                <Grid item xs={1.7}>
                    <CustomSwitches />
                </Grid>
                <Grid item xs={0.1}>
                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                        Suffix
                    </p>
                </Grid>
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

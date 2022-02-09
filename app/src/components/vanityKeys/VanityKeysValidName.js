/* import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { VanityButtonSmall, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import ConditionalLink from '../ConditionalLink';
import CustomAlert from '../CustomAlerts';
import GenerateVanityKey from '../vanityKeys/GenerateVanityKey';

export default function VanityKeysValidNameComponent({ vanityName, recieverPubKey, setRecieverPubKey, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [recieverPrivKey, setRecieverPrivKey] = React.useState("Error! Please do not proceed.");

    if (window.Worker) {
        const wi = new Worker(GenerateVanityKey)
    }
    else {
        console.log("Sorry, your browser does not support vanity key generation.")
    }

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ height: '3vh' }} />
            </Grid>
            <Grid item xs={12}>
                <VanityButtonSmall
                    vanityName={vanityName}
                    recieverPrivKey={recieverPrivKey} setRecieverPrivKey={setRecieverPrivKey}
                    setRecieverPubKey={setRecieverPubKey} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 12 }}>
                    Your private key is shown after payment.
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
                    <CustomAlert open={open} setOpen={setOpen} text={"Ensure you are happy with your key!"} />
                </Grid>
            }
            <Grid item xs={12}>
                <CustomCheckBox keyCopied={keyCopied} setKeyCopied={setKeyCopied} label="I am happy with my key and understand this cannot be refunded" />
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
 */
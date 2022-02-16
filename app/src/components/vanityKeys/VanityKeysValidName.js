import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { VanityButtonSmall, TooltipButtonSmall, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import CustomAlert from '../CustomAlerts';

export default function VanityKeysValidNameComponent({
    accountName, receiverPrivKey, receiverPubKey, vkWorker, postData, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ height: '1.25vh' }} />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
                <Grid item>
                    <VanityButtonSmall accountName={accountName} vkWorker={vkWorker} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '0.1vh' }} />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
                <Grid item>
                    <DisplayPubKey accountName={accountName} receiverPubKey={receiverPubKey} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 12, padding: '0px 0px 5px 0px' }}>
                    Save this private key/password:
                </p>
            </Grid>
            <Grid item xs={12}>
                <DisplayPrivKey receiverPrivKey={receiverPrivKey} />
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
                    <CustomAlert open={open} setOpen={setOpen}
                        label="Save this key - it cannot be recovered!"
                        labelMobile="Save this key, it's important!" />
                </Grid>
            }
            <Grid item xs={12}>
                <CustomCheckBox
                    keyCopied={keyCopied} setKeyCopied={setKeyCopied}
                    label="I have saved my password and understand it cannot be recovered"
                    labelMobile="I saved my password knowing it cannot be recovered" />
            </Grid>
            <Grid item xs={12}>
                <CheckoutButton keyCopied={keyCopied} setOpen={setOpen} postData={postData}>
                    {"Pay " + totalPrice}
                </CheckoutButton>
            </Grid>
        </>
    );
}

function DisplayPubKey({ accountName, receiverPubKey }) {
    let estWait;
    switch (accountName.length) {
        case 1:
            estWait = "Instant"
            break;
        case 2:
            estWait = "A minute"
            break;
        case 3:
            estWait = "A few minutes"
            break;
        case 4:
            estWait = "A few hours"
            break;
        default:
            estWait = "Overnight"

    }

    if (receiverPubKey.startsWith("Y")) {
        return (
            <>
                <p id="wait" style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 14, padding: '0px 0px 35px 0px' }}>
                    Estimated wait: {estWait}
                </p>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 12, padding: '0px 0px 10px 0px' }}>
                    Your chosen public key:
                </p>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                    Your Public Key Will Be Displayed Here.
                </p>
            </>
        );
    }
    else {
        return (
            <>
                <p id="wait" style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 14, padding: '0px 0px 35px 0px' }}>
                    Estimated wait: {estWait}
                </p>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 12, padding: '0px 0px 10px 0px' }}>
                    Your chosen public key:
                </p>
                <Box sx={{ fontSize: { xs: 10, md: 15.5 } }}>
                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal' }}>
                        {receiverPubKey.substring(0, 4)}<b style={{ color: '#0083FF' }}>{receiverPubKey.substring(4, (accountName.length + 4))}</b>{receiverPubKey.substring((4 + accountName.length), 53)}
                    </p>
                </Box>
            </>
        );
    }
}

function DisplayPrivKey({ receiverPrivKey }) {
    if (receiverPrivKey.startsWith("Y")) {
        return (
            <TooltipButtonSmall txt={receiverPrivKey} />
        );
    }
    else {
        return (
            <TooltipButtonSmall txt={receiverPrivKey.substring(0, 49) + "--"} />
        );
    }
}

import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TokenAccountTextField } from '../CustomTextFields';
import { TooltipButtonSmall, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import { GenerateKey } from '../EosClient';
import CustomAlert from '../CustomAlerts';

export default function TokenValidNameComponent({
    tokenName, accountName, setAccountName, setRecieverPubKey, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [recieverPrivKey, setRecieverPrivKey] = React.useState("Error! Please do not proceed.");

    useEffect(() => {
        GenerateKey({ setRecieverPrivKey, setRecieverPubKey })
        let suggestedName;
        switch (tokenName.length) {
            case 4:
                suggestedName = tokenName + "tokenact"
                break;
            case 5:
                suggestedName = tokenName + "tknacct"
                break;
            case 6:
                suggestedName = tokenName + "tknact"
                break;
            case 7:
                suggestedName = tokenName + "tknac"
                break;
            default:
                suggestedName = tokenName + "tokenacct"
        }
        setAccountName(suggestedName)
    }, [setRecieverPrivKey, setRecieverPubKey, tokenName, setAccountName])

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{ height: '1vh' }} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                    Now let's make the account that will govern your token.
                </p>
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                    This new account will be the Super Admin for your token.
                </p>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '2vh' }} />
            </Grid>
            <Grid item xs={12}>
                <TokenAccountTextField accountName={accountName} setAccountName={setAccountName} />
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
                <CheckoutButton keyCopied={keyCopied} setOpen={setOpen}>
                    {"Pay " + totalPrice}
                </CheckoutButton>
            </Grid>
        </>
    );
}

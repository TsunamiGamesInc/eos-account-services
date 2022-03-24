import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TokenAccountTextField, TokenSupplyTextField, PrecisionTextField } from '../CustomTextFields';
import { TooltipButtonSmall, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import { GenerateKey, GenerateServerKey } from '../EosClient';
import CustomAlert from '../CustomAlerts';

export default function TokenValidNameComponent({ tokenName, accountName, setAccountName,
    receiverPrivKey, setReceiverPrivKey, receiverPubKey, setReceiverPubKey, totalPrice }) {
    const [serverPrivKey, setServerPrivKey] = React.useState("Your Private Key Will Be Displayed Here.");
    const [serverPubKey, setServerPubKey] = React.useState("Your Public Key Will Be Displayed Here.");
    const [maxTokenSupply, setMaxTokenSupply] = React.useState(1000000);
    const [precision, setPrecision] = React.useState(4);
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    let postData = {
        accountDetails: {
            tokenName: tokenName,
            accountName: accountName,
            serverPrivKey: serverPrivKey, // this key is replaced after contract deployment
            serverPubKey: serverPubKey,
            receiverPubKey: receiverPubKey,
            maxTokenSupply: maxTokenSupply,
            precision: precision,
            ramQuantity: 500
        },
        lineItems: [
            {
                price: 'price_1KWnWbAVYdsvCkiZHsu5Odgg',
                quantity: 1,
                description: "Token Name: " + tokenName + " Account Name: " + accountName
            }
        ]
    };

    useEffect(() => {
        GenerateKey({ setReceiverPrivKey, setReceiverPubKey })
        GenerateServerKey({ setServerPrivKey, setServerPubKey })
        let suggestedName;
        let formatTokenName = tokenName.toLowerCase();
        switch (tokenName.length) {
            case 4:
                suggestedName = formatTokenName + "tokenact"
                break;
            case 5:
                suggestedName = formatTokenName + "tknacct"
                break;
            case 6:
                suggestedName = formatTokenName + "tknact"
                break;
            case 7:
                suggestedName = formatTokenName + "tknac"
                break;
            default:
                suggestedName = formatTokenName + "tokenacct"
        }
        setAccountName(suggestedName)
    }, [setReceiverPrivKey, setReceiverPubKey, tokenName, setAccountName])

    return (
        <>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 2, fontWeight: 'normal', fontSize: 16 }}>
                    Now for some details!
                    <br />Name the Super Admin for your token.
                    <br />Next, decide how many tokens there will be.
                </p>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '1vh' }} />
            </Grid>
            <Grid item xs={12}>
                <TokenAccountTextField accountName={accountName} setAccountName={setAccountName} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '3vh' }} />
            </Grid>
            <Grid item xs={5.5}>
                <TokenSupplyTextField maxTokenSupply={maxTokenSupply} setMaxTokenSupply={setMaxTokenSupply} />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5.5}>
                <PrecisionTextField precision={precision} setPrecision={setPrecision} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '2vh' }} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}> Private Key/Password </p>
            </Grid>
            <Grid item xs={12}>
                <TooltipButtonSmall txt={receiverPrivKey} />
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
                <CheckoutButton keyCopied={keyCopied} setOpen={setOpen} postData={postData} totalPrice={totalPrice} />
            </Grid>
        </>
    );
}

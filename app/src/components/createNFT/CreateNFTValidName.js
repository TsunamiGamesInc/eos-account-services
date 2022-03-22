import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NFTTitleTextField, NFTDescTextField } from '../CustomTextFields';
import { UploadButton, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import { GenerateKey } from '../EosClient';
import CustomAlert from '../CustomAlerts';

export default function NFTValidNameComponent({ nftTitle, setNftTitle, nftDesc, setNftDesc, setNftHash,
    setReceiverPrivKey, setReceiverPubKey, postData, totalPrice }) {
    const [keyCopied, setKeyCopied] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        GenerateKey({ setReceiverPrivKey, setReceiverPubKey })
    }, [setReceiverPrivKey, setReceiverPubKey])

    return (
        <>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 2, fontWeight: 'normal', fontSize: 16 }}>
                    Now for some details!
                </p>
            </Grid>
            <Grid item xs={12}>
                <NFTTitleTextField nftTitle={nftTitle} setNftTitle={setNftTitle} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '3vh' }} />
            </Grid>
            <Grid item xs={12}>
                <NFTDescTextField nftDesc={nftDesc} setNftDesc={setNftDesc} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ height: '3vh' }} />
            </Grid>
            <Grid item xs={12}>
                <UploadButton setNftHash={setNftHash} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 1.25, fontWeight: 'normal', fontSize: 11 }}>
                    IPFS NFT media may be removed, but can be easily replaced.
                    <br />Listed author will be a random string.
                    <br />NSFW and copyright content is strictly prohibited.
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

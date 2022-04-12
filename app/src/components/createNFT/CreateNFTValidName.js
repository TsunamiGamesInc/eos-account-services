import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { NFTTitleTextField, NFTDescTextField } from '../CustomTextFields';
import { UploadButton, CheckoutButton } from '../CustomButtons';
import CustomCheckBox from '../CustomCheckbox';
import { GenerateKey } from '../EosClient';
import CustomAlert from '../CustomAlerts';

export default function NFTValidNameComponent({ nftTitle, setNftTitle, nftDesc, setNftDesc, setFileType, setNftHash,
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
                <UploadButton setFileType={setFileType} setNftHash={setNftHash} />
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 1.25, fontWeight: 'normal', fontSize: 11 }}>
                    IPFS NFT media may be removed, but can be easily replaced.
                    <br />Listed author will be a random string.
                    <br />Uncommon file types may not display correctly.
                    <br />NSFW and copyright content is strictly prohibited.
                </p>
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
                        label="It's important to read the disclaimers!"
                        labelMobile="Read the disclaimers above!" />
                </Grid>
            }
            <Grid item xs={12}>
                <CustomCheckBox
                    keyCopied={keyCopied} setKeyCopied={setKeyCopied}
                    label="I have read the disclaimers and understand this can't be refunded"
                    labelMobile="I read the disclaimers knowing this can't be refunded" />
            </Grid>
            <Grid item xs={12}>
                <CheckoutButton keyCopied={keyCopied} setOpen={setOpen} postData={postData} totalPrice={totalPrice} />
            </Grid>
        </>
    );
}

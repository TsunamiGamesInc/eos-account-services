import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TokenTextField } from '../CustomTextFields';
import CreateTokenValidName from './CreateTokenValidName.js'

export default function CreateTokenComponents({ tokenName, setTokenName, accountName, setAccountName,
    receiverPrivKey, setReceiverPrivKey, receiverPubKey, setReceiverPubKey, totalPrice }) {
    const [tokenValidName, setTokenValidName] = React.useState(false);

    return (
        <Grid container spacing={3}>
            <Grid item xs={9.5} container>
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh' }} display={{ xs: 'none', md: 'block' }} />
                    <Box sx={{ height: '1vh' }} display={{ xs: 'block', md: 'none' }} />
                </Grid>
                <Grid item xs={12}>
                    <TokenTextField tokenName={tokenName} setTokenName={setTokenName} setTokenValidName={setTokenValidName} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '1.1vh' }} />
                </Grid>
                {!tokenValidName &&
                    <Grid item xs={12}>
                        <p style={{ color: 'white', lineHeight: 2, fontWeight: 'normal', fontSize: 16 }}>
                            Getting started is as easy as choosing a name.
                            <br />Token names are 3-7 characters long (A-Z only).
                            <br />Don't worry, the textbox will help you along.
                        </p>
                    </Grid>
                }
                {tokenValidName &&
                    <CreateTokenValidName
                        tokenName={tokenName}
                        accountName={accountName} setAccountName={setAccountName}
                        receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                        receiverPubKey={receiverPubKey} setReceiverPubKey={setReceiverPubKey}
                        totalPrice={totalPrice}
                    />}
            </Grid>
        </Grid >
    );
}

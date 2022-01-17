import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CreateTokenComponents from '../components/createToken/CreateTokenComponents';

export default function CreateToken({ tokenName, setTokenName, accountName, setAccountName,
    validName, setValidName, setRecieverPubKey, totalPrice, setTotalPrice }) {

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let tokenPrice;

        if (!validName) {
            tokenPrice = formatter.format(200) + " USD"
        }
        else {
            tokenPrice = formatter.format(200) + " USD"
        }
        setTotalPrice(tokenPrice)
    }, [validName, setTotalPrice])

    return (
        <Grid container spacing={4} justifyContent="center">
            <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
            <Grid item display={{ xs: 'none', lg: 'block' }}>
                <Box sx={{ width: '250px' }}>
                    <NavBar totalPrice={totalPrice} />
                </Box>
            </Grid>
            <Grid item xl={6}>
                <Box sx={{ width: '525px', display: { xs: 'none', sm: 'block' } }}>
                    <CreateTokenComponents
                        tokenName={tokenName} setTokenName={setTokenName}
                        accountName={accountName} setAccountName={setAccountName}
                        validName={validName} setValidName={setValidName}
                        setRecieverPubKey={setRecieverPubKey} totalPrice={totalPrice}
                    />
                </Box>
                <Box sx={{ zoom: '55%', width: '525px', display: { xs: 'block', sm: 'none' } }}>
                    <CreateTokenComponents
                        tokenName={tokenName} setTokenName={setTokenName}
                        accountName={accountName} setAccountName={setAccountName}
                        validName={validName} setValidName={setValidName}
                        setRecieverPubKey={setRecieverPubKey} totalPrice={totalPrice}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

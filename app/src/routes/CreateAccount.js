import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CreateAccountComponents from '../components/createAccount/CreateAccountComponents';

export default function CreateAccount({ ramQuantity, setRamQuantity,
    accountName, setAccountName, validName, setValidName, setRecieverPubKey, totalPrice, setTotalPrice }) {

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let accountPrice;

        if (!validName) {
            accountPrice = formatter.format(1.89) + " USD"
        }
        else {
            accountPrice = formatter.format(1.89 + (10 * 0.3 * ramQuantity)) + " USD"
        }
        setTotalPrice(accountPrice)
    }, [validName, ramQuantity, setTotalPrice])

    return (
        <Grid container spacing={4} justifyContent="center">
            <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
            <Grid item display={{ xs: 'none', lg: 'block' }}>
                <Box sx={{ width: '250px' }}>
                    <NavBar totalPrice={totalPrice} />
                </Box>
            </Grid>
            <Grid item xl={6}>
                <Box sx={{ zoom: { xs: '55%', sm: '100%' }, width: '525px' }}>
                    <CreateAccountComponents
                        ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                        accountName={accountName} setAccountName={setAccountName}
                        validName={validName} setValidName={setValidName}
                        setRecieverPubKey={setRecieverPubKey} totalPrice={totalPrice}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

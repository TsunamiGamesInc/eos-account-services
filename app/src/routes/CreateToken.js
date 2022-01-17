import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CreateAccountComponents from '../components/createToken/CreateTokenComponents';

export default function CreateToken({ eosQuantity, setEosQuantity, ramQuantity, setRamQuantity,
    accountName, setAccountName, validName, setValidName, setRecieverPubKey, totalPrice, setTotalPrice }) {

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let accountPrice;

        if (!validName) {
            accountPrice = formatter.format(2.10) + " USD"
        }
        else {
            accountPrice = formatter.format((10 * 0.2 + 0.1) + (10 * eosQuantity) + (10 * 0.3 * ramQuantity) + 0.5) + " USD"
        }
        setTotalPrice(accountPrice)
    }, [validName, eosQuantity, ramQuantity, setTotalPrice])

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
                    <CreateAccountComponents
                        eosQuantity={eosQuantity} setEosQuantity={setEosQuantity}
                        ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                        accountName={accountName} setAccountName={setAccountName}
                        validName={validName} setValidName={setValidName}
                        setRecieverPubKey={setRecieverPubKey} totalPrice={totalPrice}
                    />
                </Box>
                <Box sx={{ zoom: '55%', width: '525px', display: { xs: 'block', sm: 'none' } }}>
                    <CreateAccountComponents
                        eosQuantity={eosQuantity} setEosQuantity={setEosQuantity}
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

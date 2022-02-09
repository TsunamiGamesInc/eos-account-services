/* import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import VanityKeysComponents from '../components/vanityKeys/VanityKeysComponents';

export default function VanityKeys({ validName, setValidName, recieverPubKey, setRecieverPubKey, totalPrice, setTotalPrice }) {

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let accountPrice;

        if (!validName) {
            accountPrice = formatter.format(3.99) + " USD"
        }
        else {
            accountPrice = formatter.format(3.99) + " USD"
        }
        setTotalPrice(accountPrice)
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
                <Box sx={{ zoom: { xs: '55%', sm: '100%' }, width: '525px' }}>
                    <VanityKeysComponents
                        validName={validName} setValidName={setValidName}
                        recieverPubKey={recieverPubKey} setRecieverPubKey={setRecieverPubKey} totalPrice={totalPrice}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
 */
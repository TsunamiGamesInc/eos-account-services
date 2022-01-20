import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import ResourcesComponents from '../components/resources/ResourcesComponents';

export default function Resources({ ramQuantity, setRamQuantity,
    accountName, setAccountName, validName, setValidName, totalPrice, setTotalPrice }) {

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let resourcesPrice;

        if (!validName) {
            resourcesPrice = formatter.format(0) + " USD"
        }
        else {
            resourcesPrice = formatter.format((10 * 0.3 * ramQuantity)) + " USD"
        }
        setTotalPrice(resourcesPrice)
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
                    <ResourcesComponents
                        ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                        accountName={accountName} setAccountName={setAccountName}
                        validName={validName} setValidName={setValidName}
                        totalPrice={totalPrice}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

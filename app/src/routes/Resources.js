import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ResourcesComponents from '../components/resources/ResourcesComponents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';

export default function Resources({ accountName, setAccountName, validName, setValidName,
    ramQuantity, setRamQuantity, pUWeeks, setPUWeeks, totalPrice, setTotalPrice }) {
    let postData = {
        accountDetails: {
            accountName: accountName,
            ramQuantity: ramQuantity,
            pUWeeks: pUWeeks
        },
        lineItems:
            [
                {
                    price: 'price_1KLx2tAVYdsvCkiZ6U3mHNxW', //'price_1KQfYuAVYdsvCkiZEVuwDThX',
                    quantity: ramQuantity,
                    description: "For Account: " + accountName
                },
                {
                    price: 'price_1KgzriAVYdsvCkiZ0EW9azxR',
                    quantity: pUWeeks,
                    description: "3ms CPU & 2KB NET Daily for " + pUWeeks + " weeks"
                }
            ]
    };

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
            resourcesPrice = formatter.format((0.4 * ramQuantity) + (7 * pUWeeks)) + " USD"
        }
        setTotalPrice(resourcesPrice)
    }, [validName, ramQuantity, pUWeeks, setTotalPrice])

    return (
        <div>
            <Helmet>
                <title>Resources</title>
                <meta
                    name="description"
                    content="Get EOS RAM and PowerUps with a credit card."
                />
                <meta
                    name="keywords"
                    content="EOS RAM, PowerUp, Simple, Credit Card"
                />
            </Helmet>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
                <Grid item display={{ xs: 'none', md: 'block' }}>
                    <Box sx={{ width: '250px' }}>
                        <NavBar totalPrice={totalPrice} />
                    </Box>
                </Grid>
                <Grid item xl={6}>
                    <Box sx={{ width: { xs: '410px', md: '525px' }}}>
                        <ResourcesComponents
                            accountName={accountName} setAccountName={setAccountName}
                            ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                            pUWeeks={pUWeeks} setPUWeeks={setPUWeeks}
                            validName={validName} setValidName={setValidName}
                            postData={postData} totalPrice={totalPrice}
                        />
                    </Box>
                </Grid>
                <Grid item display={{ xs: 'block', md: 'none' }}>
                    <CustomDrawer />
                </Grid>
            </Grid>
        </div>
    );
}

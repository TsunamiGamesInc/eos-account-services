import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';

export default function ThankYou() {
    let thankYouURL = window.location.href;
    let thankYouArray = thankYouURL.split('?');
    const blokURL = 'https://bloks.io/account/' + thankYouArray[1];
    const purchasedItems = [false, false, false, false];

    if (thankYouArray[1] !== undefined) {
        purchasedItems[1] = true
    }
    if (thankYouArray[2] !== 0) {
        purchasedItems[2] = true
    }
    if (thankYouArray[3] !== undefined) {
        purchasedItems[3] = true
    }

    return (
        <div>
            <Helmet>
                <title>Thank You</title>
                <meta
                    name="description"
                    content="Thank you for your purchase."
                />
                <meta
                    name="keywords"
                    content="Thank you, Purchase, EOS Account, EOS RAM, Vanity Key"
                />
            </Helmet>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
                <Grid item display={{ xs: 'none', md: 'block' }}>
                    <Box sx={{ width: '250px' }}>
                        <NavBar totalPrice={"$0.00 USD"} />
                    </Box>
                </Grid>
                <Grid item xl={6}>
                    <Grid item xs={12}>
                        <Box sx={{ height: '15vh' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ width: '400px' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                        Success! Thank you.
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    {purchasedItems[1] &&
                                        <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                            You can view your account <a href={blokURL}>here.</a>
                                        </p>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    {purchasedItems[2] &&
                                        <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                            Enjoy your {thankYouArray[2]} KB of RAM!
                                        </p>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    {purchasedItems[3] &&
                                        <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                            Replace "--" with "{thankYouArray[3]}" at the end of your saved private key.
                                        </p>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item display={{ xs: 'block', md: 'none' }}>
                    <CustomDrawer />
                </Grid>
            </Grid>
        </div>
    );
}

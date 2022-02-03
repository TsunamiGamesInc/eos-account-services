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
    let boughtRAM = false;

    if (!(thankYouArray[2] === 0)) {
        boughtRAM = true
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
                    content="Thank you, Purchase, EOS Account, EOS RAM"
                />
            </Helmet>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
                <Grid item display={{ xs: 'none', lg: 'block' }}>
                    <Box sx={{ width: '250px' }}>
                        <NavBar totalPrice={"$0.00 USD"} />
                    </Box>
                </Grid>
                <Grid item xl={6}>
                    <Grid item xs={12}>
                        <Box sx={{ height: '15vh', backgroundColor: 'transparent' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ zoom: { xs: '55%', sm: '100%' }, width: '400px' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                        Success! Thank you.
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                        You can view your account <a href={blokURL}>here.</a>
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    {boughtRAM &&
                                        <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                            Enjoy your {thankYouArray[2]} KB of RAM!
                                        </p>
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item display={{ xs: 'block', lg: 'none' }}>
                    <CustomDrawer />
                </Grid>
            </Grid>
        </div>
    );
}

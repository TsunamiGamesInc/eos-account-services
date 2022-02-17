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

    if (thankYouArray[1] !== "undefined") {
        purchasedItems[1] = true
    }
    if (thankYouArray[2] !== "undefined") {
        purchasedItems[2] = true
    }
    if (thankYouArray[3] !== "undefined") {
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
                    <Box sx={{ width: '300px' }}>
                        <Grid item xs={12}>
                            <Box sx={{ height: '15vh' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                        Success! Thank you.
                                    </p>
                                </Grid>
                                {purchasedItems[1] &&
                                    <Grid item xs={12}>
                                        <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                            You can view your account <a href={blokURL}>here.</a>
                                        </p>
                                    </Grid>
                                }
                                {purchasedItems[2] &&
                                    <Grid item xs={12}>
                                        <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                            Enjoy your {thankYouArray[2]} KB of RAM!
                                        </p>
                                    </Grid>
                                }
                                {purchasedItems[3] &&
                                    <VanityKeyInstructions thankYouArray={thankYouArray} />
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item display={{ xs: 'block', md: 'none' }}>
                    <CustomDrawer />
                </Grid>
            </Grid>
        </div>
    );
}

function VanityKeyInstructions({ thankYouArray }) {
    const saltLetter = thankYouArray[3].substring(0, 1);
    const letterPlacement = (Number(thankYouArray[3].substring(1)) + 1);

    return (
        <Grid item xs={12} container spacing={0.25}>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                    1. Count <b style={{ color: '#0083FF' }}>{letterPlacement}</b> characters into your private key
                </p>
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                    2. You will arrive at <b style={{ color: '#0083FF' }}>{saltLetter}</b>
                </p>
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                    3. Delete <b style={{ color: '#0083FF' }}>{saltLetter}</b>
                </p>
            </Grid>
            <Grid item xs={12}>
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                    4. Your private key is now valid
                </p>
            </Grid>
        </Grid>
    );
}

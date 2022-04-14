import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function CheapAccount() {
    return (
        <div>
            <Helmet>
                <title>Cheapest EOS RAM</title>
                <meta
                    name="description"
                    content="The cheapest and simplest ways to buy RAM on EOS."
                />
                <meta
                    name="keywords"
                    content="Cheap EOS RAM, Simple EOS RAM"
                />
            </Helmet>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
                <Grid item display={{ xs: 'none', md: 'block' }}>
                    <Box sx={{ width: '250px' }}>
                        <NavBar totalPrice={'$0.00 USD'} />
                    </Box>
                </Grid>
                <Grid item xl={6}>
                    <Box sx={{ width: { xs: '300px', md: '525px' } }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ height: '13.5vh' }} display={{ xs: 'none', md: 'block' }} />
                                <Box sx={{ height: '1vh' }} display={{ xs: 'block', md: 'none' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <p style={{ color: 'white', lineHeight: 1, fontWeight: 'bold', fontSize: 18 }}>
                                    The Cheapest Way to Buy RAM on EOS
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;There is an old joke about downloading more RAM to improve your computer's performance (it's a joke because RAM is provided by physical chips on computers). With EOS, however, you actually need to use the internet to get more RAM digitally. RAM (Random Access Memory) is how the EOS blockchain allocates memory space to its users. It is needed to preform substantially all actions on chain. RAM is purchased through an algorithmic automatic market in exchange for EOS tokens.
                                        <br />
                                        <br />1. Download <a href={"https://greymass.com/en/anchor/"}>Anchor Wallet</a>
                                        <br />2. Set up the wallet by typing in a password and importing your EOS account
                                        <br />3. Click the Resources tab on the left sidebar
                                        <br />4. Click Purchase under the RAM column
                                        <br />5. Unlock your wallet by typing your password
                                        <br />6. Enter the amount of RAM you'd like to purchase in EOS or bytes
                                        <br />7. Confirm the transaction
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/resources.html" style={{ textDecoration: 'none' }}>
                                    <LearnSimpleButton txt="Overwhelmed? Do it the simple way." />
                                </Link>
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

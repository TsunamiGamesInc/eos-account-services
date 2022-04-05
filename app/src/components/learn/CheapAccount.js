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
                <title>Cheapest EOS Custom Token</title>
                <meta
                    name="description"
                    content="The Cheapest and Simplest Ways to Create an Account on EOS."
                />
                <meta
                    name="keywords"
                    content="Cheap EOS Account, Simple EOS Account"
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
                                    The Cheapest Way to Create an Account on EOS
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;While people might hope for a "free EOS account", the reality is there are costs to operating on the blockchain. However, whether you already have an account or are making your first from exchange holdings, this is the cheapest way.
                                        <br />
                                        <br />Thanks to Tang Hongbo and his associates, EOS has a zero-fee way to create accounts without having an existing one. You will only be charged the minimum amount required to transact on the network; there are no middleman fees.
                                        <br />
                                        <br />1. Go <a href={"https://eosauthority.com/generate_eos_private_key"}>here</a> and generate an EOS key. It is wise to do so offline (unplug your internet) and in incognito to avoid any data being saved
                                        <br />2. Type your desired username into the textbox <a href={"https://www.eosaccountservices.com/create-account.html"}>here</a> to confirm it is available
                                        <br />3. Send 0.3 EOS to "signupeoseos" with the memo "YOURACCOUNTNAME-PUBLICKEY." (The amount of EOS is subject to change; if EOS is worth more than $10USD, consider sending 1 EOS instead)
                                        <br />e.g. "myneweosacct-EOS5WbsqHM2gUxqMpUEvJn3Uw6D83U4wKq7nKDtURcKsXi1DhTZrh"
                                        <br />4. Any EOS not consumed during account creation will be used to buy your new account RAM
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/create-account.html" style={{ textDecoration: 'none' }}>
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

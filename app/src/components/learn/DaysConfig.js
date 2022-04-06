import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function DaysConfig() {
    return (
        <div>
            <Helmet>
                <title>EOSIO: How to Fix "Assertion Failure: Days Doesn't Match Configuration"</title>
                <meta
                    name="description"
                    content="How to Fix Assertion Failure When Using EOSIO PowerUp."
                />
                <meta
                    name="keywords"
                    content="EOSIO, EOSIO Help, EOSIO Contract, Assertion Failure, Days Doesn't Match, PowerUp"
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
                                    How to Fix EOSIO Contract PowerUp Assertion Failure: Days Doesn't Match Configuration
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;When the EOS network moved from a staking-based resource allocation system to the PowerUp system, the EOSIO contract introduced the PowerUp action. The action asks for a "days" parameter to be entered, yet if any value but 1 is entered an error is thrown.
                                        <br />
                                        <br /><b>The Solution</b>
                                        <br />
                                        <br />Set the "days" parameter to 1.
                                        <br />
                                        <br /><b>Why is does "Error: assertion failure with message: days doesn't match configuration" occur?</b>
                                        <br />
                                        <br />In the <a href={"https://github.com/EOSIO/eosio.contracts/blob/master/contracts/eosio.system/src/powerup.cpp"}>EOSIO contract</a> line 383 clearly allows for the "days" parameter to be used to set when a PowerUp ought to expire.
                                        <br />The issue arises in line 344, however, when eosio checks if the days parameter is equal to the default state, throwing an error otherwise. The state value is "1", therefore if the "days" parameter is anything else, the error will occur long before the order is placed on-chain.
                                        <br />Interestingly, the only other values that can be entered to bring about a different result are those of 0 and negative integers. This is because there is a second error message "powerup_days must be {'>'} 0" and "days" is a uint, meaning it must be a whole number.
                                        <br />
                                        <br /><b>Why is EOSIO coded this way?</b>
                                        <br />
                                        <br />Likely, the functionality to PowerUp for multiple days was intended to be usable at release or, at least, the functionality to be available for future changes. If the contract had gone live without the restriction, there wouldn't be a need for third-party solutions frequent PowerUps.
                                        <br />It's possible multi-day PowerUps concerned the developers as an attack vector or vulnerability in times of strained resources.
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/resources.html" style={{ textDecoration: 'none' }}>
                                    <LearnSimpleButton txt="Skip the Error, Grab RAM & a Free PowerUp" />
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

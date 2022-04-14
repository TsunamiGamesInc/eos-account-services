import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function CRABuffer() {
    return (
        <div>
            <Helmet>
                <title>EOSJS: How to Fix "Requires Buffer" With CRA</title>
                <meta
                    name="description"
                    content="How to fix Requires Buffer when using CRA and EOSJS."
                />
                <meta
                    name="keywords"
                    content="EOSJS, EOSJS Help, CRA Polyfill, create-react-app, CRA Buffer, Webpack 5"
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
                                    How to Fix Uncaught ReferenceError: Buffer is not defined (CRA)
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;A wonderful bootstrapping option is available to programmers in create-react-app (CRA). But, the newest react-scripts has updated to Webpack 5.0+ and opted to discontinue automatic polyfills at the same time. Polyfills allow for some nodejs functionality to be used in browsers without having to update libraries. Manual polyfills can be quite the headache and often require elaborate workarounds or abandoning project crucial libraries.
                                        <br />
                                        <br />This issue has been much discussed <a href="https://github.com/facebook/create-react-app/issues/11756">on Facebook's GitHub.</a>
                                        <br />
                                        <br /><b>The Solution</b>
                                        <br />
                                        <br />Option 1 (Recommended):
                                        <br />1. Delete node_modules and package-lock.json (not package.json!)
                                        <br />2. In package.json replace your current react-scripts version with "4.0.3" (the last version to support automatic polyfills)
                                        <br />3. npm i
                                        <br />
                                        <br />Option 2:
                                        <br />1. npm i react-app-rewired
                                        <br />2. Update package.json and config-overrides.js according to <a href="https://github.com/facebook/create-react-app/issues/11756#issuecomment-1067012822">Isandoval0000's GitHub comment</a> (I have not personally tried this)
                                        <br />
                                        <br />Option 3:
                                        <br />1. npm uninstall all packages that require polyfills
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;These may be identifiable in your error message; otherwise guess and check each package
                                        <br />
                                        <br />Option 4 (Not Recommended):
                                        <br />1. react eject or abandon create-react-app
                                        <br />2. Manage your own webpack to manually include polyfills
                                        <br />
                                        <br />There are a few other options, but these are the most advisable. This website reverted to 4.0.3.
                              
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/create-token.html" style={{ textDecoration: 'none' }}>
                                    <LearnSimpleButton txt="Skip the Polyfills and Mint a Token in Seconds" />
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

import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function BigInt() {
    const bigIntErr = "\"TypeError: Cannot convert a BigInt value to a number\", \"at Math.pow (<anonymous>)\"";
    return (
        <div>
            <Helmet>
                <title>IPFS: How to Fix "Cannot Convert a BigInt"</title>
                <meta
                    name="description"
                    content="How to Fix TypeError: Cannot convert a BigInt value to a number."
                />
                <meta
                    name="keywords"
                    content="IPFS, TypeError, BigInt, BigInt value to a number, Fix, Help, Tutorial"
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
                                    How to Fix TypeError: Cannot convert a BigInt value to a number
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;When using IPFS in the browser via JavaScript (js-ipfs), you may encounter the following error message: {bigIntErr}
                                        <br />
                                        <br />This issue is likely because create-react-app (CRA) production build defaults are incompatible with certain browser versions that require BigInt support.
                                        <br />
                                        <br /><b>The Solution</b>
                                        <br />
                                        <br />1. Update package.json browserslist according to <a href={"https://github.com/0xs34n/starknet.js/issues/37#issuecomment-955797303"}>this GitHub comment.</a>
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;Doing so changes how your project is built for production on various browsers.
                                        <br />
                                        <br /> Thanks to GitHub user janek26 for this solution and info.
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/create-nft.html" style={{ textDecoration: 'none' }}>
                                    <LearnSimpleButton txt="Skip Learning IPFS, Mint a NFT in Seconds" />
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

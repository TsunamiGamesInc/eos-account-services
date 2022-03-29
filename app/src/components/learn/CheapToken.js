import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';

export default function CustomTokenArticle() {
    return (
        <div>
            <Helmet>
                <title>Cheapest EOS Custom Token</title>
                <meta
                    name="description"
                    content="The Cheapest and Simplest Ways to Create a Custom token on EOS."
                />
                <meta
                    name="keywords"
                    content="Custom Token, Simple EOS, Cheap, Mint EOS Token"
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
                        <Grid container spacing={1.5}>
                            <Grid item xs={12}>
                                <Box sx={{ height: '12.5vh' }} display={{ xs: 'none', md: 'block' }} />
                                <Box sx={{ height: '1vh' }} display={{ xs: 'block', md: 'none' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <p style={{ color: 'white', lineHeight: 1, fontWeight: 'bold', fontSize: 18 }}>
                                    The Cheapest Way to Create a Custom Token on EOS
                                </p>
                            </Grid>
                            <Grid item xs={12} container justifyContent="flex-start">
                                <Typography style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                    Hi
                                </Typography>
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

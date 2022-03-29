import React from 'react';
import { Helmet } from 'react-helmet';
import LearnComponents, { LearnComponentsMobile } from '../components/learn/LearnComponents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';

export default function Learn() {

    return (
        <div>
            <Helmet>
                <title>Learn</title>
                <meta
                    name="description"
                    content="Learn about the simplest and cheapest ways to use the EOS Blockchain."
                />
                <meta
                    name="keywords"
                    content="How to Use EOS, Simple EOS, Cheap, EOS development"
                />
            </Helmet>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
                <Grid item display={{ xs: 'none', md: 'block' }}>
                    <Box sx={{ width: '250px' }}>
                        <NavBar totalPrice={'$0.00 USD'} />
                    </Box>
                </Grid>
                <Grid item xl={6} display={{ xs: 'none', md: 'block' }}>
                    <Box sx={{ width: '525px' }}>
                        <LearnComponents />
                    </Box>
                </Grid>
                <Grid item xl={6} display={{ xs: 'block', md: 'none' }}>
                    <Box sx={{ width: '320px' }}>
                        <LearnComponentsMobile />
                    </Box>
                </Grid>
                <Grid item display={{ xs: 'block', md: 'none' }}>
                    <CustomDrawer />
                </Grid>
            </Grid>
        </div>
    );
}

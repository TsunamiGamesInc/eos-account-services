import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import { Helmet } from 'react-helmet';

export default function RouteNotFound() {
    return (
        <div>
            <Helmet>
                <title>404</title>
                <meta
                    name="description"
                    content="404, route not found."
                />
                <meta
                    name="keywords"
                    content="404, Route, Not Found"
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
                                        Four, oh four!
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                        If there was something here...
                                    </p>
                                </Grid>
                                <Grid item xs={12}>
                                    <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                        It's not anymore!
                                    </p>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

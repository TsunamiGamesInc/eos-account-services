import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomButtons, { CustomButtonNoRipple } from './CustomButtons';

export default function NavBar({ totalPrice }) {
    return (
        <Box sx={{ height: '100vh', width: '250px'}}>
            <Grid container >
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh' }} />
                </Grid>
                <Grid item xs={12}>
                    <CustomButtons txt="Create Account" />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '5vh' }} />
                </Grid>
                <Grid item xs={12}>
                    <CustomButtonNoRipple txt={totalPrice} />
                </Grid>
            </Grid>
        </Box>
    )
}

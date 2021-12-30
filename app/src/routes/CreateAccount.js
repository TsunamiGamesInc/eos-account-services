import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CreateAccountComponents from '../components/CreateAccountComponents';

export default function CreateAccount({ value, setValue, valueR, setValueR, validName, setValidName, totalPrice }) {
    return (
        <Grid container spacing={4} justifyContent="center">
            <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
            <Grid item display={{ xs: 'none', lg: 'block' }}>
                <Box sx={{ width: '250px' }}>
                    <NavBar totalPrice={totalPrice} />
                </Box>
            </Grid>
            <Grid item xl={6}>
                <Box sx={{ width: '525px', display: { xs: 'none', sm: 'block' } }}>
                    <CreateAccountComponents
                        value={value} setValue={setValue} valueR={valueR} setValueR={setValueR}
                        totalPrice={totalPrice} validName={validName} setValidName={setValidName}
                    />
                </Box>
                <Box sx={{ width: '480px', display: { xs: 'block', sm: 'none' } }}>
                    <CreateAccountComponents
                        value={value} setValue={setValue} valueR={valueR} setValueR={setValueR}
                        totalPrice={totalPrice} validName={validName} setValidName={setValidName}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

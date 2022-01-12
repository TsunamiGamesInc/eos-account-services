import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import ResourcesComponents from '../components/resources/ResourcesComponents';

export default function Resources({ value, setValue, valueR, setValueR,
    accountName, setAccountName, validName, setValidName, totalPrice }) {
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
                    <ResourcesComponents
                        value={value} setValue={setValue} valueR={valueR} setValueR={setValueR}
                        totalPrice={totalPrice} accountName={accountName} setAccountName={setAccountName}
                        validName={validName} setValidName={setValidName}
                    />
                </Box>
                <Box sx={{ zoom: '55%', width: '525px', display: { xs: 'block', sm: 'none' } }}>
                    <ResourcesComponents
                        value={value} setValue={setValue} valueR={valueR} setValueR={setValueR}
                        totalPrice={totalPrice} accountName={accountName} setAccountName={setAccountName}
                        validName={validName} setValidName={setValidName}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

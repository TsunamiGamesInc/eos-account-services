import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import CreateAccount from './components/CreateAccount';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#2DB2FF",
    }
  },
  typography: {
    fontFamily: [
      'Calibri'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
    },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
    shape: {
      borderRadius: '10px'
    }
  }
});

function App() {
  const [value, setValue] = React.useState(5);
  const [valueR, setValueR] = React.useState(5);
  const [validName, setValidName] = React.useState(false);

  let keyPair;
  let eosPrice = 6;
  let fees = 0.5;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  let totalPrice;

  if (validName) {
    totalPrice = formatter.format(((eosPrice * 0.2) + 0.1) + (eosPrice * value) + (eosPrice * 0.3 * valueR) + fees) + " USD"
  }
  else {
    totalPrice = formatter.format((eosPrice * 0.2) + 0.1) + " USD"
  }

  return (
    <div className="App">
       <ThemeProvider theme={theme}>
        <Typography component={'span'}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
            <Grid item display={{ xs: 'none', lg: 'block' }}>
              <Box sx={{ width: '250px' }}>
                <NavBar totalPrice={totalPrice} />
              </Box>
            </Grid>
            <Grid item xl={6}>
              <Box sx={{ width: '525px', display: { xs: 'none', sm: 'block' } }}>
                <CreateAccount
                  value={value} setValue={setValue} valueR={valueR} setValueR={setValueR}
                  totalPrice={totalPrice} validName={validName} setValidName={setValidName}
                  keyPair={keyPair}
                />
              </Box>
              <Box sx={{ width: '480px', display: { xs: 'block', sm: 'none' } }}>
                <CreateAccount
                  value={value} setValue={setValue} valueR={valueR} setValueR={setValueR}
                  totalPrice={totalPrice} validName={validName} setValidName={setValidName}
                  keyPair={keyPair}
                />
              </Box>
            </Grid>
          </Grid>
        </Typography>
      </ThemeProvider >
    </div >
  );
}

export default App;

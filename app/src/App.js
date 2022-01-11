import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import './App.css';

/* import Home from './routes/Home';
import CreateToken from './routes/CreateToken';
import Resources from './routes/Resources';
import CreateNFT from './routes/CreateNFT';
import VanityKeys from './routes/VanityKeys';*/
import Checkout from './routes/Checkout';
import CreateAccount from './routes/CreateAccount';

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
  const [accountName, setAccountName] = React.useState("");
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
          <BrowserRouter>
            <Helmet>
              <title>EOS Account Services</title>
              <meta
                name="description"
                content="Get the easiest and cheapest EOS account creation, premium names, custom cryptocurrency tokens, 
              NFTs, and EOS resources, all with a credit card."
              />
              <meta
                name="keywords"
                content="EOS Account Creator, Premium Names, Create Custom Token, Create NFTs, Vanity Keys, Credit Card, Free"
              />
            </Helmet>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/app" element={
                <CreateAccount
                  value={value} setValue={setValue} valueR={valueR} setValueR={setValueR}
                  totalPrice={totalPrice} accountName={accountName} setAccountName={setAccountName}
                  validName={validName} setValidName={setValidName} keyPair={keyPair} />
              } />
              <Route path="/app/create-account" element={
                <CreateAccount
                  value={value} setValue={setValue} valueR={valueR} setValueR={setValueR}
                  totalPrice={totalPrice} accountName={accountName} setAccountName={setAccountName}
                  validName={validName} setValidName={setValidName} keyPair={keyPair} />
              } />
              {/*               <Route path="/create-token" element={<CreateToken />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/create-nft" element={<CreateNFT />} />
              <Route path="/vanity-keys" element={<VanityKeys />} /> */}
              <Route path="/app/checkout" element={<Checkout />} />
            </Routes>
          </BrowserRouter>
        </Typography>
      </ThemeProvider>
    </div >
  )
}

export default App;

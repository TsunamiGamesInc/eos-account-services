import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import './App.css';

/*
import Home from './routes/Home';
import CreateNFT from './routes/CreateNFT';
const CreateToken = lazy(() => import('./routes/CreateToken'));
const VanityKeys = lazy(() => import('./routes/VanityKeys'));
*/
const CreateAccount = lazy(() => import('./routes/CreateAccount'));
const Resources = lazy(() => import('./routes/Resources'));
const Checkout = lazy(() => import('./routes/Checkout'));

/*
import CreateAccount from './routes/CreateAccount';
import Resources from './routes/Resources';
import CreateToken from './routes/CreateToken';
import VanityKeys from './routes/VanityKeys';
import Checkout from './routes/Checkout'; */

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
  const [ramQuantity, setRamQuantity] = React.useState(5);
  const [accountName, setAccountName] = React.useState("");
  //const [tokenName, setTokenName] = React.useState("");
  const [validName, setValidName] = React.useState(false);
  const [recieverPubKey, setRecieverPubKey] = React.useState("Error, please do not proceed.");
  const [totalPrice, setTotalPrice] = React.useState(0);

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
                NFTs, vanity keys, and RAM, all with a credit card."
              />
              <meta
                name="keywords"
                content="EOS Account Creator, Premium Names, Create Custom Token, Create NFTs, Vanity Keys, Credit Card"
              />
            </Helmet>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/app" element={
                  <CreateAccount
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    accountName={accountName} setAccountName={setAccountName}
                    validName={validName} setValidName={setValidName}
                    setRecieverPubKey={setRecieverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/app/create-account" element={
                  <CreateAccount
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    accountName={accountName} setAccountName={setAccountName}
                    validName={validName} setValidName={setValidName}
                    setRecieverPubKey={setRecieverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/app/resources" element={<Resources
                  ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                  accountName={accountName} setAccountName={setAccountName}
                  validName={validName} setValidName={setValidName}
                  totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
                {/* <Route path="/app/create-token" element={
                  <CreateToken
                    tokenName={tokenName} setTokenName={setTokenName}
                    accountName={accountName} setAccountName={setAccountName}
                    validName={validName} setValidName={setValidName}
                    setRecieverPubKey={setRecieverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
                <Route path="/create-nft" element={<CreateNFT />} />
                <Route path="/app/vanity-keys" element={
                  <VanityKeys
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    accountName={accountName} setAccountName={setAccountName}
                    validName={validName} setValidName={setValidName}
                    recieverPubKey={recieverPubKey} setRecieverPubKey={setRecieverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } /> */}
                <Route path="/app/checkout" element={
                  <Checkout
                    accountName={accountName} recieverPubKey={recieverPubKey}
                    ramQuantity={ramQuantity} totalPrice={totalPrice} />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </Typography>
      </ThemeProvider>
    </div >
  )
}

export default App;

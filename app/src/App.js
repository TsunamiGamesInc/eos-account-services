import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import './App.css';

/*
import CreateNFT from './routes/CreateNFT';
const CreateToken = lazy(() => import('./routes/CreateToken'));
const VanityKeys = lazy(() => import('./routes/VanityKeys'));
import VanityKeys from './routes/VanityKeys';
import CreateToken from './routes/CreateToken';
*/

/* const CreateAccount = lazy(() => import('./routes/CreateAccount'));
const Resources = lazy(() => import('./routes/Resources'));
const ThankYou = lazy(() => import('./routes/ThankYou'));
const RouteNotFound = lazy(() => import('./routes/404')); */


import CreateAccount from './routes/CreateAccount';
import Resources from './routes/Resources';
const ThankYou = lazy(() => import('./routes/ThankYou'));
const RouteNotFound = lazy(() => import('./routes/404'));

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
                content="Get the easiest and cheapest EOS account creation, plus quick EOS RAM, all with a credit card."
              /* content="Get the easiest EOS account creation, premium names, custom cryptocurrency tokens, 
              NFTs, vanity keys, and RAM, all with a credit card." */
              />
              <meta
                name="keywords"
                content="EOS Account Creator, EOS RAM, Credit Card, Cheap"
              /* content="EOS Account Creator, Premium Names, Create Custom Token, Create NFTs, Vanity Keys, Credit Card" */
              />
            </Helmet>
            <Suspense fallback={
              <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16, padding: '12px 0px 0px 0px' }}>
                Loading...
              </p>
            }>
              <Routes>
                <Route path="/app" element={
                  <CreateAccount
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    validName={validName} setValidName={setValidName}
                    recieverPubKey={recieverPubKey} setRecieverPubKey={setRecieverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/app/create-account.html" element={
                  <CreateAccount
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    validName={validName} setValidName={setValidName}
                    recieverPubKey={recieverPubKey} setRecieverPubKey={setRecieverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/app/resources.html" element={
                  <Resources
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
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
                <Route path="/app/thank-you.html" element={
                  <ThankYou />
                } />
                <Route path="*" element={
                  <RouteNotFound />
                } />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </Typography>
      </ThemeProvider>
    </div >
  )
}

export default App;

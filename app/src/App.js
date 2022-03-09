import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import './App.css';

const CreateAccount = lazy(() => import('./routes/CreateAccount'));
const Resources = lazy(() => import('./routes/Resources'));
const VanityKeys = lazy(() => import('./routes/VanityKeys'));
const CreateNFT = lazy(() => import('./routes/CreateNFT'));
const CreateToken = lazy(() => import('./routes/CreateToken'));
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
    ]
  },
  shape: {
    borderRadius: '10px'
  }
});

function App() {
  const [ramQuantity, setRamQuantity] = React.useState(5);
  const [accountName, setAccountName] = React.useState("");
  const [tokenName, setTokenName] = React.useState("");
  const [nftTitle, setNftTitle] = React.useState("");
  const [nftDesc, setNftDesc] = React.useState("");
  const [validName, setValidName] = React.useState(false);
  const [receiverPrivKey, setReceiverPrivKey] = React.useState("Your Private Key Will Be Displayed Here.");
  const [receiverPubKey, setReceiverPubKey] = React.useState("Your Public Key Will Be Displayed Here.");
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
                content="Get the easiest EOS account creation, RAM, powerups, vanity keys, NFTs, and custom cryptocurrency tokens, all with a credit card."
              />
              <meta
                name="keywords"
                content="EOS Account Creator, EOS RAM, Powerup, Vanity Key, NFT, Custom Token, Credit Card, Easy, Cheap, Blockchain"
              /* content="EOS Account Creator, Premium Names, Create Custom Token, Create NFTs, Vanity Keys, Credit Card" */
              />
            </Helmet>
            <Suspense fallback={<div></div>}>
              <Routes>
                <Route path="/" element={
                  <CreateAccount
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    validName={validName} setValidName={setValidName}
                    receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                    receiverPubKey={receiverPubKey} setReceiverPubKey={setReceiverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/create-account.html" element={
                  <CreateAccount
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    validName={validName} setValidName={setValidName}
                    receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                    receiverPubKey={receiverPubKey} setReceiverPubKey={setReceiverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/resources.html" element={
                  <Resources
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    validName={validName} setValidName={setValidName}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
                <Route path="/vanity-keys.html" element={
                  <VanityKeys
                    accountName={accountName} setAccountName={setAccountName}
                    validName={validName} setValidName={setValidName}
                    receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                    receiverPubKey={receiverPubKey} setReceiverPubKey={setReceiverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/create-token.html" element={
                  <CreateToken
                    tokenName={tokenName} setTokenName={setTokenName}
                    accountName={accountName} setAccountName={setAccountName}
                    validName={validName} setValidName={setValidName}
                    receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                    receiverPubKey={receiverPubKey} setReceiverPubKey={setReceiverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
                <Route path="/create-nft.html" element={
                  <CreateNFT
                    accountName={accountName} setAccountName={setAccountName}
                    nftTitle={nftTitle} setNftTitle={setNftTitle}
                    nftDesc={nftDesc} setNftDesc={setNftDesc}
                    validName={validName} setValidName={setValidName}
                    setReceiverPrivKey={setReceiverPrivKey}
                    setReceiverPubKey={setReceiverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
                <Route path="/thank-you.html" element={
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

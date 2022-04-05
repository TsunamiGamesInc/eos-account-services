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
const Learn = lazy(() => import('./routes/Learn'));
const RouteNotFound = lazy(() => import('./routes/404'));

// Articles

const CheapToken = lazy(() => import('./components/learn/CheapToken'));
const CheapNFT = lazy(() => import('./components/learn/CheapNFT'));
const CheapAccount = lazy(() => import('./components/learn/CheapAccount'));
const CheapRAM = lazy(() => import('./components/learn/CheapRAM'));
const FreePowerUp = lazy(() => import('./components/learn/FreePowerUp'));
const VideoNFT = lazy(() => import('./components/learn/VideoNFT'));
const SongNFT = lazy(() => import('./components/learn/SongNFT'));
const TokenInfo = lazy(() => import('./components/learn/TokenInfo'));
const BigInt = lazy(() => import('./components/learn/BigInt'));

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
  const [accountName, setAccountName] = React.useState("");
  const [ramQuantity, setRamQuantity] = React.useState(5);
  const [pUWeeks, setPUWeeks] = React.useState(5);
  const [validName, setValidName] = React.useState(false);
  const [receiverPrivKey, setReceiverPrivKey] = React.useState("Your Private Key Will Be Displayed Here.");
  const [receiverPubKey, setReceiverPubKey] = React.useState("Your Public Key Will Be Displayed Here.");
  const [tokenName, setTokenName] = React.useState("");
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
              />
            </Helmet>
            <Suspense fallback={<div></div>}>
              <Routes>
                <Route path="/" element={
                  <CreateAccount
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    pUWeeks={pUWeeks} setPUWeeks={setPUWeeks}
                    validName={validName} setValidName={setValidName}
                    receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                    receiverPubKey={receiverPubKey} setReceiverPubKey={setReceiverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/create-account.html" element={
                  <CreateAccount
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    pUWeeks={pUWeeks} setPUWeeks={setPUWeeks}
                    validName={validName} setValidName={setValidName}
                    receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                    receiverPubKey={receiverPubKey} setReceiverPubKey={setReceiverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
                } />
                <Route path="/resources.html" element={
                  <Resources
                    accountName={accountName} setAccountName={setAccountName}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    pUWeeks={pUWeeks} setPUWeeks={setPUWeeks}
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
                    validName={validName} setValidName={setValidName}
                    setReceiverPrivKey={setReceiverPrivKey}
                    setReceiverPubKey={setReceiverPubKey}
                    totalPrice={totalPrice} setTotalPrice={setTotalPrice} />} />
                <Route path="/learn.html" element={
                  <Learn />
                } />
                <Route path="/thank-you.html" element={
                  <ThankYou />
                } />
                <Route path="/cheap-token.html" element={
                  <CheapToken />
                } />
                <Route path="/cheap-nft.html" element={
                  <CheapNFT />
                } />
                <Route path="/cheap-account.html" element={
                  <CheapAccount />
                } />
                <Route path="/cheap-ram.html" element={
                  <CheapRAM />
                } />
                <Route path="/free-powerup.html" element={
                  <FreePowerUp />
                } />
                <Route path="/video-nft.html" element={
                  <VideoNFT />
                } />
                <Route path="/song-nft.html" element={
                  <SongNFT />
                } />
                <Route path="/token-info.html" element={
                  <TokenInfo />
                } />
                <Route path="/big-int.html" element={
                  <BigInt />
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

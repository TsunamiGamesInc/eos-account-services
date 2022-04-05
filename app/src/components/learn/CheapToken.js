import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function CheapToken() {
    return (
        <div>
            <Helmet>
                <title>Cheapest EOS Custom Token</title>
                <meta
                    name="description"
                    content="The Cheapest and Simplest Ways to Create a Custom token on EOS."
                />
                <meta
                    name="keywords"
                    content="Custom Token, Simple EOS, Cheap, Mint EOS Token"
                />
            </Helmet>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
                <Grid item display={{ xs: 'none', md: 'block' }}>
                    <Box sx={{ width: '250px' }}>
                        <NavBar totalPrice={'$0.00 USD'} />
                    </Box>
                </Grid>
                <Grid item xl={6}>
                    <Box sx={{ width: { xs: '300px', md: '525px' } }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box sx={{ height: '13.5vh' }} display={{ xs: 'none', md: 'block' }} />
                                <Box sx={{ height: '1vh' }} display={{ xs: 'block', md: 'none' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <p style={{ color: 'white', lineHeight: 1, fontWeight: 'bold', fontSize: 18 }}>
                                    The Cheapest Way to Create a Custom Token on EOS
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Unfortunately, creating your own token on EOS is unnecessarily complicated. However, this amazing guide has conquered the hardest steps for you. You'll skip everything from downloading Ubuntu to the EOSIO CDT (whatever those are).
                                        <br />
                                        <br />The following steps assume some basic experience with <a href={"https://greymass.com/en/anchor/"}>Anchor</a>/<a href={"https://github.com/GetScatter/ScatterDesktop/releases/"}>Scatter</a> wallet.
                                        <br />
                                        <br />1. Download <a href="https://eosaccountservices.com/eas.token.abi" download>eosio.token.abi</a> and <a href="https://eosaccountservices.com/eas.token.wasm" download>eosio.token.wasm</a>
                                        <br />2. <a href={"https://eosaccountservices.com/cheap-account.html"}>Create a new EOS account</a> (don't use an existing account; the naming convention often has your token symbol followed by a variation on "tokenaccount." e.g. ABCtokenacct)
                                        <br />3. <a href={"https://eosauthority.com/wallet/ram?network=eos"}>Purchase 500KB of RAM</a> for your new account (you can use a calculator to determine how much 500KB will cost in EOS). Just reload the page if access is denied
                                        <br />4. <a href={"https://eospowerup.io/free"}>Type your account name and click POWERUP twice.</a>
                                        <br />5. <a href={"https://eosauthority.com/wallet/utilities/upload-contract?network=eos"}>Upload the abi and wasm files</a> to your account
                                        <br />6. Replace YOURACCOUNTNAME with...your account name in "https://bloks.io/account/YOURACCOUNTNAME?loadContract=true&tab=Actions"
                                        <br />7. Copy and paste the new URL into your browser
                                        <br />8. Complete the "Create" action by:
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;a. Setting issuer to your account name
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;b. Setting maximum_supply to the total supply of tokens you wish to allow.
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The 0's after the decimal point set precision (Up to 15 zeros).
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Include the token symbol you'd like. e.g. "1000.000 ABC"
                                        <br />9. (Optional) Complete the "Issue" action by:
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;a. Setting "to" to any existing account name
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;b. Setting quantity to the amount of tokens you'd like to transfer e.g. "10.000 ABC"
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;c. (Optional) A memo
                                        <br />10. After a token is issued (or as it is more commonly known: minted), you can transfer them as you wish using the "Transfer" action
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/create-token.html" style={{ textDecoration: 'none' }}>
                                    <LearnSimpleButton txt="Overwhelmed? Do it the simple way." />
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item display={{ xs: 'block', md: 'none' }}>
                    <CustomDrawer />
                </Grid>
            </Grid>
        </div>
    );
}

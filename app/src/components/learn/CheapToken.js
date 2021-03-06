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
                    content="The cheapest and simplest ways to create a custom token on EOS."
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
                                        &nbsp;&nbsp;&nbsp;&nbsp;Unfortunately, creating your own token on EOS is unnecessarily complicated. However, if you can figure out how to use Ubuntu (or a Mac) and the EOSIO CDT, you will be able to deploy any existing contract using these steps.
                                        <br />
                                        <br />The following steps assume some experience with Command Line Interfaces (CLI) and <a href={"https://greymass.com/en/anchor/"}>Anchor</a>/<a href={"https://github.com/GetScatter/ScatterDesktop/releases/"}>Scatter</a> wallet.
                                        <br />
                                        <br />1. Set up your development environment via <a href={"https://developers.eos.io/welcome/latest/getting-started-guide/local-development-environment/index"}>this guide</a>
                                        <br />2. Obtain the contract source and generate the wasm and abi files using <a href={"https://developers.eos.io/manuals/eosio.contracts/latest/guides/how-to-create-issue-and-transfer-a-token"}>this guide</a>
                                        <br />3. <a href={"https://www.eosaccountservices.com/cheap-account.html"}>Create a new EOS account</a> (don't use an existing account; the naming convention often has your token symbol followed by a variation on "tokenaccount." e.g. ABCtokenacct)
                                        <br />4. <a href={"https://eosauthority.com/wallet/ram?network=eos"}>Purchase 500KB of RAM</a> for your new account (you can use a calculator to determine how much 500KB will cost in EOS). Just reload the page if access is denied
                                        <br />5. <a href={"https://eospowerup.io/free"}>Type your account name and click POWERUP twice.</a>
                                        <br />6. <a href={"https://eosauthority.com/wallet/utilities/upload-contract?network=eos"}>Upload the abi and wasm files</a> to your account
                                        <br />7. Replace YOURACCOUNTNAME with...your account name in "https://bloks.io/account/YOURACCOUNTNAME?loadContract=true&tab=Actions"
                                        <br />8. Copy and paste the new URL into your browser
                                        <br />9. Complete the "Create" action by:
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;a. Setting issuer to your account name
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;b. Setting maximum_supply to the total supply of tokens you wish to allow.
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The 0's after the decimal point set precision (Up to 15 zeros).
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Include the token symbol you'd like. e.g. "1000.000 ABC"
                                        <br />10. (Optional) Complete the "Issue" action by:
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;a. Setting "to" to any existing account name
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;b. Setting quantity to the amount of tokens you'd like to transfer e.g. "10.000 ABC"
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;c. (Optional) A memo
                                        <br />11. After a token is issued (or as it is more commonly known: minted), you can transfer them as you wish using the "Transfer" action
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

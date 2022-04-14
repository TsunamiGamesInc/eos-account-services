import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function TokenInfo() {
    return (
        <div>
            <Helmet>
                <title>Personal Token Contract vs Token Contract Based on Another Account</title>
                <meta
                    name="description"
                    content="What is the difference between a Personal Token Contract and a Token Contract Based on Another Account?"
                />
                <meta
                    name="keywords"
                    content="Custom Token, Personal Token Contract, Another Account Token Contract, EOS Managed Token Contract"
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
                                    What is the Difference Between a Personal Token Contract and a Token Contract Based on Another Account?
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;EOS tokens are created and issued from smart contracts. These smart contracts are deployed on individual accounts that have sole authority over code changes. Since a token contract is no different than any other contract, it can be editted and updated at will.
                                        <br />
                                        <br />This allows the contract owner to change the maximum supply, token symbol, inflation, security protocols, and anything else they'd like by updating the smart contact. They can recall tokens, burn tokens on any account, and change the rules as they please.
                                        <br />
                                        <br />The main difference between <b>Personal Token Contracts</b> and <b>Token Contracts Based on Another Account</b> is who has authority to make all the changes above
                                        <br />
                                        <br />In <b>Personal Token Contracts</b>, like those offered on <a href={"https://www.eosaccountservices.com/create-token.html"}>this site</a>, you have complete authority.
                                        <br />In <b>Token Contracts Based on Another Account</b>, like those offered on competing sites, you must trust the owner to not change or modify anything.
                                        <br />
                                        <br />This means the token creator, not you, will permanently be able make any of the previously mentioned changes without your permission. If the owner is nefarious, you have no recourse to prevent theft, etc. and must restart with a new token.
                                        <br />
                                        <br /><b>Why are Token Contracts Based on Another Account so Much Cheaper?</b>
                                        <br />The providers of these tokens save money by having one contract mint multiple tokens. Your token shares the same rules as anyone else who uses the same service.
                                        <br />
                                        <br /><b>Are Personal Token Contracts or Token Contracts Based on Another Account better?</b>
                                        <br />You can save money by going with a contract on another account. If the issuer of this contract is reputable, there isn't much risk for smaller projects that will not need customization. If you cannot forsee ever needing to change your token in any way and are comfortable trusting your issuer indefinitely, save the money.
                                        <br />
                                        <br />Carefully research Token Contracts Based on Another Account before committing to one. If you were to build a business around your token, the issuer could mint themselves unlimited tokens or burn every token in an instant.
                                        <br />
                                        <br /><b>Tokens Managed by the Block Producers/EOS</b>, have been proposed by Daniel Larimer. Such tokens would remove many technical and liquidity requirements from creators while giving the block producers exclusive rights to make changes.
                                        <br />This type of token is not currently available, but would offer benefits over the current options including: an EOSIO reserved token symbol, compatibility with all other tokens created in this way, and many others.
                                        <br />Upgrading from current options MAY be available, IF this proposal ever is implemented. In this site's opinion, the cost of this option is likely to be the highest of the 3, but still alluring considering the benefits.
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/create-token.html" style={{ textDecoration: 'none' }}>
                                    <LearnSimpleButton txt="Mint a Personal Token in Seconds" />
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

import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function CheapNFT() {
    return (
        <div>
            <Helmet>
                <title>Cheapest EOS Custom Token</title>
                <meta
                    name="description"
                    content="The Cheapest and Simplest Ways to Create a NFT on EOS."
                />
                <meta
                    name="keywords"
                    content="EOS NFT, Simple EOS, Cheap, Mint EOS NFT, Non-Fungible Token"
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
                                    The Cheapest Way to Create a NFT on EOS
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;EOS' dominate standard for NFTs is the Atomic Assets standard developed and maintained by pink.network. Luckily, there are many existing tutorials to help interact with their site to mint your own NFTs without too much difficulty.
                                        <br />
                                        <br />1. Go to <a href="https://eos.atomichub.io/creator">AtomicHub</a>
                                        <br />2. Log in using <a href={"https://greymass.com/en/anchor/"}>Anchor</a>/<a href={"https://github.com/GetScatter/ScatterDesktop/releases/"}>Scatter</a> wallet
                                        <br />3. Follow alongside either <a href={"https://www.youtube.com/watch?v=bXuuFJPJ5Mc"}>Crypton's video</a> or <a href={"https://eosnation.io/create-nfts/"}>EOS Nation's text guide</a>
                                        <br />
                                        <br />The process is fairly inexpensive, especially when compared to other chains. The standard also allows for some flexibility with NFT content. You can also create a <a href={"https://www.eosaccountservices.com/song-nft.html"}>song</a> or <a href={"https://www.eosaccountservices.com/video-nft.html"}>video</a> NFT using IPFS.
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/create-nft.html" style={{ textDecoration: 'none' }}>
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

import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function SongNFT() {
    return (
        <div>
            <Helmet>
                <title>How to Make a Song NFT on EOS</title>
                <meta
                    name="description"
                    content="How to make a Song NFT on EOS."
                />
                <meta
                    name="keywords"
                    content="Song NFT, Book NFT, Novel NFT, Game Save NFT, File NFT, Simple, IPFS"
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
                                    How to Make a Song NFT on EOS
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Song NFTs on EOS are typically made using the same method as video NFTs. Songs, videos, and images are all just data. Any data can be uploaded to IPFS and referenced in an EOS NFT using the data's hash. You can therefore make NFTs from any file. For instance, you could create a "game save NFT" from a local PC save file, or even a "novel NFT" by writing a story and uploading it to IPFS.
                                        <br />
                                        <br />Since there is no difference between a song/video/book or any other file as far as IPFS is concerned, you can use the same steps to make any type of NFT.
                                        <br />
                                        <br />1. Follow the video NFT tutorial found <a href="https://www.eosaccountservices.com/video-nft.html">here</a>
                                    </p>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ height: '2vh' }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Link to="/create-nft.html" style={{ textDecoration: 'none' }}>
                                    <LearnSimpleButton txt="Create Any EOS NFT in Seconds" />
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

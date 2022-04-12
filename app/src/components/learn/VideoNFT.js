import React from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LearnSimpleButton } from '../CustomButtons';
import NavBar from '../NavBar';
import CustomDrawer from '../CustomDrawer';
import { Link } from 'react-router-dom';

export default function VideoNFT() {
    return (
        <div>
            <Helmet>
                <title>How to Make a Video NFT on EOS</title>
                <meta
                    name="description"
                    content="How to make a video NFT on EOS."
                />
                <meta
                    name="keywords"
                    content="NFT, Video NFT, Simple, IPFS"
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
                                    How to Make a Video NFT on EOS
                                </p>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ maxHeight: { xs: '360px', md: '800px' }, textAlign: 'left', overflow: 'auto' }} >
                                    <p style={{ fontSize: 14, fontFamily: 'Calibri', color: 'white' }}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Atomic Assets, which is the currently dominating standard for EOS NFTs, allows for the creation of video NFTs. Like on other chains, this is done through the use of the InterPlanetary File System (IPFS). IPFS is a decentralized means of storing data online. IPFS uses hashes of the data it is storing as the URL for the data. NFTs then reference that URL/hash to display the desired video. This means the video NFTs on EOS and (practically) every other chain will not have their data actually stored on-chain. Rather, the data is stored using IPFS in a decentralized manner, then referenced on-chain. This guide may also help people who need help understanding "how to use IPFS desktop" or need an "IPFS companion tutorial"
                                        <br />
                                        <br />The following steps assume you understand how to create a <a href={"https://www.eosaccountservices.com/cheap-nft.html"}>typical NFT using AtomicHub.</a>
                                        <br />
                                        <br />1. Download your computer's version of IPFS Desktop by scrolling down <a href="https://github.com/ipfs/ipfs-desktop#ipfs-desktop">here</a>
                                        <br />&nbsp;&nbsp;&nbsp;&nbsp;a. After installation your local node of IPFS will be setup. This will allow you to upload files
                                        <br />2. In the IPFS app, click on Files (left sidebar)
                                        <br />3. Click Import (on the right), then select File
                                        <br />4. Navigate to, then select your video file
                                        <br />5. Click on Explore (left sidebar)
                                        <br />6. Copy the CID of your video (a long string of letters and numbers)
                                        <br />7. Login to <a href="https://eos.atomichub.io/creator">AtomicHub</a>
                                        <br />8. Create or edit an existing NFT schema (you can setup a schema using <a href={"https://www.youtube.com/watch?v=bXuuFJPJ5Mc"}>Crypton's video</a> or <a href={"https://eosnation.io/create-nfts/"}>EOS Nation's text guide</a>)
                                        <br />9. Click Add New Attribute
                                        <br />10. Under Attribute Type select IPFS Hash (name the attribute video, audio, or img)
                                        <br />11. Save the Schema
                                        <br />12. Click Mint New Asset
                                        <br />13. Fill out the empty textboxes with your desired info (copies, name, etc.)
                                        <br />14. Paste the video IPFS CID you found in Step 6 into the IPFS Hash Attribute
                                        <br />15. Mint the NFT
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

import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomCards, { CustomCardsMobile } from '../CustomCards'
import wile from './wileecoyote.jpg';

export default function LearnComponents() {
    const bigIntErr = "IPFS: How to Fix \"Cannot Convert a BigInt\"";
    const bufferErr = "EOSJS: How to Fix \"Requires Buffer\" With CRA";
    const daysConfig = "EOSIO: How to Fix \"Assertion Failure: Days Doesn't Match Configuration\"";

    return (
        <Grid container spacing={1.5}>
            <Grid item xs={12}>
                <Box sx={{ height: '13.2vh' }} />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-start">
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'bold', fontSize: 18 }}>
                    The Cheapest Way
                </p>
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/cheap-token.html" cardImg={wile}
                    txt="The Cheapest Way to Create a Custom Token on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt="The Cheapest Way to Create a NFT on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt="The Cheapest Way to Create an Account on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt="The Cheapest Way to Buy RAM on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt="How to Get a Free PowerUp on EOS" />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-start">
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'bold', fontSize: 18 }}>
                    Technical & Development
                </p>
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt="How to Make a Video NFT on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt="How to Make a Song NFT on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt="Personal Token Contract vs Token Contract Based on Another Account" />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt={bigIntErr} />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt={bufferErr} />
            </Grid>
            <Grid item xs={4}>
                <CustomCards
                    linkTxt="/create-account.html" cardImg={wile}
                    txt={daysConfig} />
            </Grid>
        </Grid>
    );
}

export function LearnComponentsMobile() {
    const bigIntErr = "IPFS: How to Fix \"Cannot Convert a BigInt\"";
    const bufferErr = "EOSJS: How to Fix \"Requires Buffer\" With CRA";
    const daysConfig = "EOSIO: How to Fix \"Assertion Failure: Days Doesn't Match Configuration\"";

    return (
        <Grid container spacing={1.5}>
            <Grid item xs={12}>
                <Box sx={{ height: '1vh' }} />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-start">
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'bold', fontSize: 18 }}>
                    The Cheapest Way
                </p>
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt="The Cheapest Way to Create a Custom Token on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt="The Cheapest Way to Create a NFT on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt="The Cheapest Way to Create an Account on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt="The Cheapest Way to Buy RAM on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt="How to Get a Free PowerUp on EOS" />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-start">
                <p style={{ color: 'white', lineHeight: 0, fontWeight: 'bold', fontSize: 18 }}>
                    Technical & Development
                </p>
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt="How to Make a Video NFT on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt="How to Make a Song NFT on EOS" />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt="Personal Token Contract vs Token Contract Based on Another Account" />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt={bigIntErr} />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt={bufferErr} />
            </Grid>
            <Grid item xs={4}>
                <CustomCardsMobile
                    linkTxt="/create-account.html"
                    txt={daysConfig} />
            </Grid>
        </Grid>
    );
}

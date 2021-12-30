import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import CustomButtons from '../components/CustomButtons';


export default function Home() {
    return (
        <Grid container spacing={4} justifyContent="center">
            <Grid item xl={2.4}>
                <Link to="/create-nft" style={{ textDecoration: 'none' }}>
                    <CustomButtons txt="Create NFTs" />
                </Link>
            </Grid>
            <Grid item xl={2.4}>
                <Link to="/create-token" style={{ textDecoration: 'none' }}>
                    <CustomButtons txt="Create Custom Token" />
                </Link>
            </Grid>
            <Grid item xl={2.4}>
                <Link to="/create-account" style={{ textDecoration: 'none' }}>
                    <CustomButtons txt="Create Account" />
                </Link>
            </Grid>
            <Grid item xl={2.4}>
                <Link to="/resources" style={{ textDecoration: 'none' }}>
                    <CustomButtons txt="Get Resources" />
                </Link>
            </Grid>
            <Grid item xl={2.4}>
                <Link to="/vanity-keys" style={{ textDecoration: 'none' }}>
                    <CustomButtons txt="Vanity Keys" />
                </Link>
            </Grid>
        </Grid>
    );
}

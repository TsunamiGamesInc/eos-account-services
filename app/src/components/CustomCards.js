import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function CustomCards({ linkTxt, cardImg, txt }) {
    return (
        <Card sx={{ height: 240, maxWidth: 300 }}>
            <CardActionArea>
                <Link to={linkTxt} style={{ textDecoration: 'none' }}>
                    <CardMedia
                        component="img"
                        src={cardImg}
                        style={{ height: 140 }}
                        alt="Card Image"
                    />
                    <CardContent>
                        <Typography style={{ fontSize: 14, fontFamily: 'Calibri', color: '#0937FF', fontWeight: 'bold' }}>
                            {txt}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card >
    );
}

export function CustomCardsMobile({ linkTxt, txt }) {
    return (
        <Card sx={{ height: 100, maxWidth: 300 }}>
            <CardActionArea>
                <Link to={linkTxt} style={{ textDecoration: 'none' }}>
                    <CardContent>
                        <Typography style={{ fontSize: 14, fontFamily: 'Calibri', color: '#0937FF', fontWeight: 'bold' }}>
                            {txt}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card >
    );
}

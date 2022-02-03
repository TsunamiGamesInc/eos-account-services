import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomButtons, { CustomButtonNoTopBorder, CustomButtonNoRipple } from './CustomButtons';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import { InfoAlert, InfoAlertMobile } from './CustomAlerts';
import { Link } from 'react-router-dom';

export default function NavBar({ totalPrice }) {
    const [infoOpen, setInfoOpen] = React.useState(false);

    const handleGitClick = (e) => {
        const gitUrl = 'https://github.com/TsunamiGamesInc/eos-account-services';
        window.open(gitUrl, '_blank');
    }

    const handleInfoClick = () => {
        setInfoOpen(true)
    }

    return (
        <Box sx={{ height: '100vh', width: '250px' }}>
            <Grid container >
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh' }} />
                </Grid>
                <Grid item xs={12}>
                    <Link to="/app/create-account.html" style={{ textDecoration: 'none' }}>
                        <CustomButtons txt="Create Account" />
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/app/resources.html" style={{ textDecoration: 'none' }}>
                        <CustomButtonNoTopBorder txt="Get RAM" />
                    </Link>
                </Grid>
                {/*                 <Grid item xs={12}>
                    <Link to="/app/create-token" style={{ textDecoration: 'none' }}>
                        <CustomButtonNoTopBorder txt="Create Custom Token" />
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/app/vanity-keys" style={{ textDecoration: 'none' }}>
                        <CustomButtonNoTopBorder txt="Vanity Keys" />
                    </Link>
                </Grid> */}
                <Grid item xs={12}>
                    <Box sx={{ height: '5vh' }} />
                </Grid>
                <Grid item xs={12}>
                    <CustomButtonNoRipple txt={totalPrice} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '0.2vh' }} />
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={9} />
                    <Grid item xs={1.25}>
                        <IconButton
                            aria-label="Questions?"
                            sx={{
                                padding: "0px 0px 0px 0px",
                                "&:hover": {
                                    backgroundColor: 'transparent'
                                }
                            }}
                            onClick={handleInfoClick}>
                            <HelpOutlineIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1.25}>
                        <IconButton
                            aria-label="Github"
                            sx={{
                                padding: "0px 0px 0px 0px",
                                "&:hover": {
                                    backgroundColor: 'transparent'
                                }
                            }}
                            onClick={handleGitClick}>
                            <GitHubIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <InfoAlert
                        infoOpen={infoOpen} setInfoOpen={setInfoOpen} text={"info@eosaccountservices.com"}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export function NavBarMobile() {
    const [infoOpen, setInfoOpen] = React.useState(false);

    const handleGitClick = (e) => {
        const gitUrl = 'https://github.com/TsunamiGamesInc/eos-account-services';
        window.open(gitUrl, '_blank');
    }

    const handleInfoClick = () => {
        setInfoOpen(true)
    }

    return (
        <Grid container>
            <Grid item xl={12} container justifyContent="center">
                <Grid item xs={12}>
                    <Box sx={{ height: '4vh', backgroundColor: 'transparent' }} />
                </Grid>
                <Grid item xs={8}>
                    <Link to="/app/create-account.html" style={{ textDecoration: 'none' }}>
                        <CustomButtons txt="Create Account" />
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '4vh', backgroundColor: 'transparent' }} />
                </Grid>
                <Grid item xs={8}>
                    <Link to="/app/resources.html" style={{ textDecoration: 'none' }}>
                        <CustomButtons txt="Get RAM" />
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '0.25vh', backgroundColor: 'transparent' }} />
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={7.9} />
                    <Grid item xs={1}>
                        <IconButton
                            aria-label="Questions?"
                            sx={{
                                padding: "0px 0px 0px 0px",
                                "&:hover": {
                                    backgroundColor: 'transparent'
                                }
                            }}
                            onClick={handleInfoClick}>
                            <HelpOutlineIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            aria-label="Github"
                            sx={{
                                padding: "0px 0px 0px 0px",
                                "&:hover": {
                                    backgroundColor: 'transparent'
                                }
                            }}
                            onClick={handleGitClick}>
                            <GitHubIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <InfoAlertMobile
                        infoOpen={infoOpen} setInfoOpen={setInfoOpen} text={"info@eosaccountservices.com"}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

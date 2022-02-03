import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function CustomAlert({ open, setOpen, text }) {
    const handleClose = (e, reason) => {
        setOpen(false)
    }

    if (open) {
        return (
            <Grid container>
                <Grid item xs={1.75} />
                <Grid item xs={10}>
                    <Snackbar
                        style={{
                            position: 'inherit'
                        }}
                        open={open}
                        onClose={handleClose}
                        autoHideDuration={3000}>
                        <Alert
                            severity="error"
                            style={{
                                fontFamily: 'Calibri',
                                borderRadius: '10px',
                                blockSize: '20px',
                                padding: '0px 10px 15px 10px',
                                fontSize: '15px'
                            }}>
                            {text}
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        );
    }
    else {
        return (
            <Box sx={{ height: '2.7vh' }} />
        );
    }
}

export function InfoAlert({ infoOpen, setInfoOpen, text }) {
    const handleClose = (e, reason) => {
        setInfoOpen(false)
    }

    return (
        <Snackbar
            style={{
                position: 'inherit'
            }}
            open={infoOpen}
            onClose={handleClose}
            autoHideDuration={5000}>
            <Box sx={{ padding: `5px 0px 0px 0px` }}>
                <Alert
                    severity="info"
                    style={{
                        fontFamily: 'Calibri',
                        borderRadius: '10px',
                        blockSize: '20px',
                        padding: '0px 10px 15px 10px',
                        fontSize: '15px'
                    }}>
                    {text}
                </Alert>
            </Box>
        </Snackbar>
    );
}

export function InfoAlertMobile({ infoOpen, setInfoOpen, text }) {
    const handleClose = (e, reason) => {
        setInfoOpen(false)
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={infoOpen}
            onClose={handleClose}
            autoHideDuration={5000}>
            <Box sx={{ padding: `5px 0px 0px 0px` }}>
                <Alert
                    severity="info"
                    style={{
                        fontFamily: 'Calibri',
                        borderRadius: '10px',
                        blockSize: '20px',
                        padding: '0px 10px 15px 10px',
                        fontSize: '15px'
                    }}>
                    {text}
                </Alert>
            </Box>
        </Snackbar>
    );
}

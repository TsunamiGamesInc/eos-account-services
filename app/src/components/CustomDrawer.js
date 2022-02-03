import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { NavBarMobile } from './NavBar';

export default function CustomDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (toggle) => () => {
        setOpen(toggle)
    }

    const Puller = styled(Box)(({ theme }) => ({
        width: 30,
        height: 6,
        backgroundColor: '#2DB2FF',
        borderRadius: 10,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)'
    }));

    return (
        <>
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: '60%',
                        overflow: 'visible',
                        backgroundColor: 'transparent'
                    }
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={58}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#FFFFFF',
                        opacity: 0.5,
                        position: 'absolute',
                        top: -53,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        visibility: 'visible',
                        right: 0,
                        left: 0
                    }}
                    display={{ xs: 'block', md: 'none' }}
                >
                    <Puller />
                    <Box
                        sx={{
                            height: '54px'
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        height: '500px'
                    }}
                >
                    <NavBarMobile />
                </Box>
            </SwipeableDrawer>
        </>
    );
}
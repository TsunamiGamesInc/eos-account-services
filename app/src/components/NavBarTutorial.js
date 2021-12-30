import React from 'react';
import CustomButton from './CustomButton';
import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    bar: {
        paddingTop: "1.15rem",
        backgroundColor: "#fff",
        ['@media (max-width: 780px)']: {
            flexDirection: "row"
        }
    },
    menuItem: {
        cursor: "pointer",
        flexGrow: 1,
        "&:hover": {
            color: "#4f25c8"
        },
        ['@media (max-width: 780px']: {
            paddingBottom: "1rem"
        }
    }
})

function NavBar() {
    const classes = styles()
    return (
        <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
            <Typography variant="h6" className={classes.menuItem}>
                Create Account
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                Get Resources
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                Create NFTs
            </Typography>
            <Typography variant="h6" className={classes.menuItem}>
                Create Custom Token
            </Typography>
        </Toolbar>
    )
}

export default NavBar

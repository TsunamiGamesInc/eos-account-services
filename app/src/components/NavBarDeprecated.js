/* import React, { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import ChangeVisibility from './ChangeVisibility';

const StyledButtonTop = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "48px",
        padding: "20px 50px",
        boxSizing: "border-box",
        borderColor: "#fff",
        borderRadius: "15px",
        color: "#fff",
        transition: "background .3s,border-color .30s, color .3s",
        "&:hover": {
            backgroundColor: "#2DB2FF"
        },
        fontSize: "20px"
    },
    label: {
        textTransform: "capitalize",
    }
})(Button);

const StyledButton = withStyles({
    root:
    {
        borderTop: 0
    }
})(StyledButtonTop);

const navBar = [
    <StyledButtonTop
        variant="outlined"
        onClick={() => ChangeVisibility('Create Account')}>Create Account</StyledButtonTop>,
    <StyledButton variant="outlined">Get Resources</StyledButton>,
    <StyledButton variant="outlined">Create NFTs</StyledButton>,
    <StyledButton variant="outlined">Create Custom Token</StyledButton>
]

export default function SetButtonGroup() {
    return (
        <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
            {navBar}
        </ButtonGroup>
    );
}
 */
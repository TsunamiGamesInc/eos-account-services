import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@mui/material/Tooltip';
import { SvgIcon } from '@mui/material';
import { ReactComponent as CheckIconSm } from '../images/check-icon-sm.svg';
import { ReactComponent as CloseIconSm } from '../images/close-icon-sm.svg';

const StyledButton = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "48px",
        minWidth: '100%',
        maxWidth: '100%',
        padding: "20px 50px",
        boxSizing: "border-box",
        borderColor: "#fff",
        borderRadius: "10px",
        color: "#fff",
        transition: "background .3s,border-color .30s, color .3s",
        fontSize: "16px",
        "&:hover": {
            backgroundColor: "#2DB2FF"
        }
    },
    label: {
        textTransform: "capitalize",
    }
})(Button);

const StyledButtonNoTopBorder = withStyles({
    root:
    {
        borderTop: 0
    }
})(StyledButton);

const StyledRecommendedButton = withStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "16px",
        minWidth: '100%',
        padding: '18.25px 0px 0px 0px',
        boxSizing: "border-box",
        color: "#0937FF",
        transition: "background .3s,border-color .30s, color .3s",
        "&:hover": {
            backgroundColor: "transparent"
        },
        fontSize: "16px"
    },
    label: {
        textTransform: "capitalize",
    }
})(Button);

const StyledButtonNoRipple = withStyles({
    root:
    {
        "&:hover": {
            backgroundColor: "transparent",
            cursor: "default"
        }
    }
})(StyledButton);

export default function CustomButton(props) {
    return (
        <StyledButton variant="outlined">{props.txt}</StyledButton>
    );
}

export function CustomButtonNoTopBorder(props) {
    return (
        <StyledButton variant="outlined">{props.txt}</StyledButton>
    );
}

export function RecommendedButton({ value, setValue, valueR, setValueR }) {
    let recommendedIcon = null;
    let checkIcon =
        <SvgIcon>
            <CheckIconSm />
        </SvgIcon>;
    const closeIcon =
        <SvgIcon>
            <CloseIconSm />
        </SvgIcon>;

    if ((value < 5) || (valueR < 5)) {
        recommendedIcon = closeIcon
    }
    else {
        recommendedIcon = checkIcon
    }

    function setRecommended() {
        setValue(5)
        setValueR(5)
        recommendedIcon = checkIcon
    }

    return (
        <StyledRecommendedButton
            variant="text"
            disableRipple
            onClick={setRecommended}
            endIcon={recommendedIcon}
        >Recommended</StyledRecommendedButton>
    );
}

export function CustomButtonNoRipple(props) {
    return (
        <StyledButtonNoRipple variant="outlined" disableRipple>{props.txt}</StyledButtonNoRipple>
    );
}

export function CustomButtonSmall(props) {
    const [text, setText] = React.useState("Click to copy");
    const [canClick, setClick] = React.useState(true);

    function defaultText() {
        setText("Click to copy")
        setClick(true)
    }

    function ChangeText() {
        if (text === "Click to copy") {
            setText("Copied")
            setClick(false)
            setTimeout(defaultText, 2000)
        }
        else {
            setText("Click to copy")
        }
    }

    return (
        <Tooltip
            title={text}
            placement="top-end">
            <StyledButton
                variant="outlined"
                onClick={() => {
                    if (canClick) {
                        ChangeText()
                        navigator.clipboard.writeText(props.txt)
                    }
                }}
                style={{
                    height: '16px',
                    padding: "16px 50px",
                    fontSize: "14px",
                }}>{props.txt}</StyledButton>
        </Tooltip>
    );
}

export function CheckoutButton(props) {
    return (
        <StyledButton variant="outlined" style={{ backgroundColor: '#0083FF' }} onClick={null}>
            {props.txt}</StyledButton>
    );
}

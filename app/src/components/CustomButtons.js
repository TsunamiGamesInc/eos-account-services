import React, { useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@material-ui/core';
import { SvgIcon } from '@mui/material';
import { ReactComponent as CheckIconSm } from '../images/check-icon-sm.svg';
import { ReactComponent as CloseIconSm } from '../images/close-icon-sm.svg';

const StyledButton = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48px',
        minWidth: '100%',
        maxWidth: '100%',
        padding: '20px 50px',
        boxSizing: 'border-box',
        borderColor: '#fff',
        borderRadius: '10px',
        color: '#fff',
        transition: 'background .3s,border-color .30s, color .3s',
        fontSize: '16px',
        "&:hover": {
            backgroundColor: '#2DB2FF'
        }
    },
    label: {
        textTransform: 'capitalize',
        overflowX: 'hidden'
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
        <StyledButtonNoTopBorder variant="outlined">{props.txt}</StyledButtonNoTopBorder>
    );
}

export function RecommendedButton({ ramQuantity, setRamQuantity }) {
    let recommendedIcon = null;
    let checkIcon =
        <SvgIcon>
            <CheckIconSm />
        </SvgIcon>;
    const closeIcon =
        <SvgIcon>
            <CloseIconSm />
        </SvgIcon>;

    if (ramQuantity < 5) {
        recommendedIcon = closeIcon
    }
    else {
        recommendedIcon = checkIcon
    }

    function setRecommended() {
        setRamQuantity(5)
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

/* export function VanityButtonSmall({ vanityName, recieverPrivKey, setRecieverPrivKey, setRecieverPubKey }) {
    const [vanityText, setVanityText] = React.useState("Generate Vanity Key");
    const [keysCreated, setKeysCreated] = React.useState(0);

    function handleClick() {
        let testers = "Searching... " + keysCreated + " keys created";
        setVanityText(testers)
        //GenerateVanityKey(vanityName, { keysCreated, setKeysCreated, setVanityText, setRecieverPrivKey, setRecieverPubKey })
    }

    return (
        <StyledButton
            variant="outlined"
            onClick={handleClick}
            style={{
                height: '16px',
                padding: "16px 50px",
                fontSize: "14px",
            }}>{vanityText}</StyledButton>
    );
} */

export function ButtonSmallNoRipple(props) {
    return (
        <StyledButtonNoRipple
            variant="outlined"
            onClick={null}
            style={{
                height: '16px',
                padding: "16px 50px",
                fontSize: "14px",
            }}
            disableRipple>{props.txt}</StyledButtonNoRipple>
    );
}

export function TooltipButtonSmall(props) {
    const [text, setText] = React.useState("Click to copy");
    const [canClick, setCanClick] = React.useState(true);
    const timer = useRef();

    function ChangeText() {
        if (canClick) {
            navigator.clipboard.writeText(props.txt)
            setCanClick(false)
            setText("Copied")
            timer.current = setTimeout(RevertText, 3000)
        }
    }

    function RevertText() {
        setText("Click to copy")
        setCanClick(true)
    }

    useEffect(() => {
        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    return (
        <Tooltip
            title={text}
            placement="top-end">
            <StyledButton
                variant="outlined"
                onClick={ChangeText}
                style={{
                    height: '16px',
                    padding: "16px 10px",
                    fontSize: "14px",
                }}>{props.txt}</StyledButton>
        </Tooltip>
    );
}

export function CheckoutButton({ children, keyCopied, setOpen, postData }) {
    const handleClick = () => {
        if (!keyCopied) {
            setOpen(true)
        }
        else {
            fetch('/server/eos_functions/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then(res => res.json())
                .then(session => {
                    window.location.assign(session.redirect)
                })
        }
    }

    return (
        <StyledButton variant="outlined" style={{ backgroundColor: '#0083FF' }} onClick={handleClick}>
            {children}
        </StyledButton>
    );
}

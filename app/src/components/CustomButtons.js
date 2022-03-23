import React, { useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@material-ui/core';
import { SvgIcon } from '@mui/material';
import { ReactComponent as CheckIconSm } from '../images/check-icon-sm.svg';
import { ReactComponent as CloseIconSm } from '../images/close-icon-sm.svg';
import * as IPFS from 'ipfs-core';

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

const StyledButtonNoTransform = withStyles({
    label: {
        whiteSpace: 'nowrap',
        textTransform: 'none'
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

let timer;
let counter = 0;
export function VanityButtonSmall({ accountName, vkWorker }) {
    function handleClick() {
        clearInterval(timer)
        counter = 0
        document.getElementById("wait").innerHTML = "Searching..."
        timer = setInterval(displayTimer, 1000)

        function displayTimer() {
            if (document.getElementById("wait").innerHTML.startsWith("F")) {
                clearInterval(timer)
            }
            else {
                counter++
                document.getElementById("wait").innerHTML = "Search time: " + counter + " second(s)."
            }
        }

        for (var i = 0; i < 6; i++) {
            vkWorker[i].postMessage({ accountName: accountName })
        }
    }

    useEffect(() => () => {
        clearInterval(timer)
    }, [])

    return (
        <StyledButton
            variant="outlined"
            onClick={handleClick}
            style={{
                height: '16px',
                minWidth: '180px',
                maxWidth: '180px',
                padding: "16px 10px",
                fontSize: "14px",
                backgroundColor: '#2DB2FF'
            }}>Generate Vanity Key</StyledButton>
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
                    padding: '16px 10px',
                    fontSize: '14px'
                }}>{props.txt}</StyledButton>
        </Tooltip>
    );
}

export function UploadButton({ setNftHash }) {
    const [buttonText, setButtonText] = React.useState("Upload Media (Img/Video/Song: 200MB Max)");

    const onChange = file => {
        if (file.target.files[0].size < 209715200.1) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file.target.files[0])
            reader.onload = async () => {
                const ipfs = await IPFS.create({ repo: ('repo' + Math.random()) });
                const cid = await ipfs.add(reader.result);

                console.log(cid.path)

                setNftHash(cid.path)
            }
            setButtonText(file.target.files[0].name)
        }
        else {
            setButtonText("File too large. Upload Media (200MB Max)")
        }
    }

    return (
        <StyledButtonNoTransform
            variant="outlined"
            component="label"
            style={{
                height: '16px',
                padding: '16px 5px',
                fontSize: '14px'
            }}>
            {buttonText}
            <input type="file" hidden onChange={onChange} />
        </StyledButtonNoTransform>
    );
}

export function CheckoutButton({ children, keyCopied, setOpen, postData }) {
    const handleClick = () => {
        if (!keyCopied) {
            setOpen(true)
        }
        else {
            children = "Processing..."
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

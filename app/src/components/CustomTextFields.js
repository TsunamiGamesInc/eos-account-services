import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { SvgIcon } from '@mui/material';
import { ReactComponent as CheckIconMd } from '../images/check-icon-md.svg';
import { ReactComponent as CloseIconMd } from '../images/close-icon-md.svg';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import GetAccountInfo, { CheckExistingName, GetAccountInfoNoValid } from './EosClient';

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
                borderRadius: '10px',
            },
            '&:hover fieldset': {
                borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white'
            }
        },
        '& .MuiInputBase-root': {
            color: 'white'
        },
        '& .MuiFormLabel-root': {
            color: 'white'
        },
        minWidth: '90%'
    }
})(TextField);

let checkIconMd =
    <SvgIcon>
        <CheckIconMd />
    </SvgIcon>;
let closeIconMd =
    <SvgIcon>
        <CloseIconMd />
    </SvgIcon>;

export default function CustomTextField({ accountName, setAccountName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("Exactly 12 characters (a-z, 1-5)");

    useEffect(() => {
        if (accountName.includes(".")) {
            let removeDot = accountName.replace('.', '')
            setAccountName(removeDot)
        }

        if (accountName.length === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if (accountName.length < 12) {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if (accountName.length === 12) {
            GetAccountInfo(accountName.toLowerCase(), setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle)
        }
    }, [accountName, setAccountName, setValidName])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((newValue.slice(-1).match(/[a-zA-Z1-5]/)) || (newValue === "")) {
            setError("")
            setAccountName(newValue)
        }
        else {
            setError("a-z, 1-5 only")
        }
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    label="Choose an account name!"
                    value={accountName}
                    onChange={onChange}
                    helperText={error}
                    error={!!error}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
                        'aria-label': 'Choose an account name!',
                        maxLength: 12,
                        style: {
                            textTransform: 'lowercase',
                        }
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function ResourcesTextField({ accountName, setAccountName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("Type your account name!");
    const nameTimer = useRef(null);

    useEffect(() => {
        if (accountName.length === 0) {
            clearTimeout(nameTimer.current)
            setIcon(null)
            setValidName(false)
            setTooltipTitle("12 characters (a-z, 1-5) or a premium name")
        }
        else {
            clearTimeout(nameTimer.current)
            nameTimer.current = setTimeout(() => CheckExistingName(accountName.toLowerCase(), setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle), 1000)
        }
    }, [accountName, setAccountName, setValidName, nameTimer])

    useEffect(() => () => {
        clearTimeout(nameTimer.current)
    }, [])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((newValue.slice(-1).match(/[a-zA-Z1-5.]/)) || (newValue === "")) {
            setError("")
            setAccountName(newValue)
        }
        else {
            setError("a-z, 1-5, and . only")
        }
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    label="Enter your account name!"
                    value={accountName}
                    onChange={onChange}
                    helperText={error}
                    error={!!error}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
                        'aria-label': 'Enter your account name!',
                        maxLength: 12,
                        style: {
                            textTransform: 'lowercase',
                        }
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function SliderTextField({ setValue, valueMirror, endAdornmentText }) {
    const handleInputChange = (e) => {
        const newValue = e.target.value;

        if (newValue.slice(-1).match(/[0-9]/)) {
            setValue(newValue === '' ? '' : Number(newValue))
        }
        else if (newValue === "") {
            valueMirror = ""
            setValue(0)
        }
    };

    return (
        <StyledTextField
            variant="outlined"
            value={valueMirror}
            size="small"
            onChange={handleInputChange}
            InputProps={{
                endAdornment: endAdornmentText
            }}
            inputProps={{
                'aria-label': 'RAM Quantity',
                maxLength: 3,
            }}
        />
    );
}

export function VanityTextField({ accountName, setAccountName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("1 to 5 characters (a-z, 1-9)");

    useEffect(() => {
        if (accountName.length > 5) {
            let truncName = accountName.substring(0, 5)
            setAccountName(truncName)
        }

        if (accountName.length === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("1 to 5 characters (a-z, 1-9)")
        }
        else if ((accountName.length > 0) && (icon !== checkIconMd)) {
            setIcon(checkIconMd)
            setValidName(true)
            setTooltipTitle("Matching keys available!")
        }
    }, [accountName, setValidName, setAccountName, icon])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((newValue.slice(-1).match(/[a-zA-Z1-9]/)) || (newValue === "")) {
            setError("")
            setAccountName(newValue)
        }
        else {
            setError("a-z, 1-9 only")
        }
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    aria-label="Choose a prefix!"
                    label="Choose a prefix!"
                    value={accountName}
                    onChange={onChange}
                    helperText={error}
                    error={!!error}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
                        'aria-label': 'Choose a prefix!',
                        maxLength: 5,
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function TokenTextField({ tokenName, setTokenName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("3 to 7 characters, A-Z only");

    useEffect(() => {
        if (tokenName.length === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("3 to 7 characters, A-Z only")
        }
        else if ((tokenName.length < 3) && (icon !== closeIconMd)) {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("3 to 7 characters, A-Z only")
        }
        else if ((tokenName.length >= 3) && (icon !== checkIconMd)) {
            setIcon(checkIconMd)
            setValidName(true)
            setTooltipTitle("Token name available!")
        }
    }, [tokenName, setValidName, icon])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((newValue.slice(-1).match(/[a-zA-Z]/)) || (newValue === "")) {
            setError("")
            setTokenName(newValue.toUpperCase())
        }
        else {
            setError("A-Z only")
        }
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    label="Choose a token name!"
                    value={tokenName}
                    onChange={onChange}
                    helperText={error}
                    error={!!error}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
                        'aria-label': 'Choose a token name!',
                        maxLength: 7,
                        style: {
                            textTransform: 'uppercase',
                        }
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function TokenAccountTextField({ accountName, setAccountName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("Exactly 12 characters (a-z, 1-5)");

    useEffect(() => {
        if (accountName.includes(".")) {
            let removeDot = accountName.replace('.', '')
            setAccountName(removeDot)
        }

        if (accountName.length === 0) {
            setIcon(null)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if (accountName.length < 12) {
            setIcon(closeIconMd)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if (accountName.length === 12) {
            GetAccountInfoNoValid(accountName.toLowerCase(), setIcon, checkIconMd, closeIconMd, setTooltipTitle)
        }
    }, [accountName, setAccountName])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((newValue.slice(-1).match(/[a-zA-Z1-5]/)) || (newValue === "")) {
            setError("")
            setAccountName(newValue)
        }
        else {
            setError("a-z, 1-5 only")
        }
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    label="Choose a Super Admin name!"
                    value={accountName}
                    onChange={onChange}
                    helperText={error}
                    error={!!error}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
                        'aria-label': 'Choose a Super Admin name!',
                        maxLength: 12,
                        style: {
                            textTransform: 'lowercase',
                        }
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function TokenSupplyTextField({ maxTokenSupply, setMaxTokenSupply }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(checkIconMd);
    const [tooltipTitle, setTooltipTitle] = useState("1 to 999 trillion");

    useEffect(() => {
        if (maxTokenSupply.length === 0) {
            setIcon(null)
            setTooltipTitle("1 to 999 trillion")
        }
        else if ((maxTokenSupply.length >= 1) && (icon !== checkIconMd)) {
            setIcon(checkIconMd)
            setTooltipTitle("Good choice!")
        }
    }, [maxTokenSupply, icon])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((newValue.slice(-1).match(/[0-9]/) || (newValue === ""))) {
            setError("")
            setMaxTokenSupply(newValue)
        }
        else {
            setError("0-9 only")
        }
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    label="Maximum token supply"
                    value={maxTokenSupply}
                    onChange={onChange}
                    helperText={error}
                    error={!!error}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
                        'aria-label': 'Maximum token supply',
                        maxLength: 15,
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function PrecisionTextField({ precision, setPrecision }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(checkIconMd);
    const [tooltipTitle, setTooltipTitle] = useState("0 to 15 decimals");

    useEffect(() => {
        if (precision.length === 0) {
            setIcon(null)
            setTooltipTitle("0 to 15 decimals")
        }
        else if ((precision.length >= 1) && (icon !== checkIconMd)) {
            setIcon(checkIconMd)
            setTooltipTitle("Good choice!")
        }
    }, [precision, icon])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((newValue.slice(-1).match(/[0-9]/) || (newValue === ""))) {
            setError("")

            if (newValue > 15) {
                setPrecision(15)
            }
            else {
                setPrecision(newValue)
            }
        }
        else {
            setError("0-9 only")
        }
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    label="Decimal precision"
                    value={precision}
                    onChange={onChange}
                    helperText={error}
                    error={!!error}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
                        'aria-label': 'Decimal precision',
                        maxLength: 2,
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function NFTTitleTextField({ nftTitle, setNftTitle }) {
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("Up to 64 characters");

    useEffect(() => {
        if (nftTitle.length === 0) {
            setIcon(null)
            setTooltipTitle("Up to 64 characters")
        }
        else {
            setIcon(checkIconMd)
            setTooltipTitle("Good choice!")
        }
    }, [nftTitle, setNftTitle])

    const onChange = (e) => {
        const newValue = e.target.value;
        setNftTitle(newValue)
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    label="Choose your NFT Title!"
                    value={nftTitle}
                    onChange={onChange}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
                        'aria-label': 'Choose your NFT Title!',
                        maxLength: 64
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function NFTDescTextField({ nftDesc, setNftDesc }) {
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("Up to 280 characters");

    useEffect(() => {
        if (nftDesc.length === 0) {
            setIcon(null)
            setTooltipTitle("Up to 280 characters")
        }
        else {
            setIcon(checkIconMd)
            setTooltipTitle("Good choice!")
        }
    }, [nftDesc, setNftDesc])

    const onChange = (e) => {
        const newValue = e.target.value;
        setNftDesc(newValue)
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    label="Next, describe your NFT..."
                    value={nftDesc}
                    onChange={onChange}
                    InputProps={{
                        endAdornment: icon
                    }}
                    inputProps={{
                        'aria-label': 'Next, describe your NFT...',
                        maxLength: 280
                    }}
                />
            </Box>
        </Tooltip>
    )
}
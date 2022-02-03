import React, { useState, useEffect } from 'react';
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
        else if ((accountName.length < 12) && (icon !== closeIconMd)) {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if ((accountName.length === 12) && (icon !== checkIconMd)) {
            GetAccountInfo(accountName.toLowerCase(), setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle)
        }
    }, [accountName, setAccountName, setValidName, icon])

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
        else if ((accountName.length < 12) && (icon !== closeIconMd)) {
            setIcon(closeIconMd)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if ((accountName.length === 12) && (icon !== checkIconMd)) {
            GetAccountInfoNoValid(accountName, setIcon, checkIconMd, closeIconMd, setTooltipTitle)
        }
    }, [accountName, icon, setAccountName])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((newValue.slice(-1).match(/[a-zA-Z1-5]/)) || (newValue === "")) {
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

export function ResourcesTextField({ accountName, setAccountName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("Type your account name!");

    useEffect(() => {
        if (accountName.length === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("12 characters (a-z, 1-5) or a premium name")
        }
        else {
            CheckExistingName(accountName.toLowerCase(), setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle)
        }
    }, [accountName, setAccountName, setValidName, icon])


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

export function TokenTextField({ tokenName, setTokenName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("3 to 7 characters, a-z only");

    useEffect(() => {
        if (tokenName.length === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("3 to 7 characters, a-z only")
        }
        else if ((tokenName.length < 3) && (icon !== closeIconMd)) {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("3 to 7 characters, a-z only")
        }
        else if ((tokenName.length >= 3) && (icon !== checkIconMd)) {
            setIcon(checkIconMd)
            setValidName(true)
            setTooltipTitle("Token name available!")
        }
    }, [tokenName, icon, setValidName, setTokenName])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((!newValue.match(/[a-zA-Z]/)) || (newValue === "")) {
            setError("")
            setTokenName(newValue)
        }
        else {
            setError("a-z only")
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
                            textTransform: 'lowercase',
                        }
                    }}
                />
            </Box>
        </Tooltip>
    )
}

export function VanityTextField({ vanityName, setVanityName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null);
    const [tooltipTitle, setTooltipTitle] = useState("1 to 5 characters (a-z, 0-9)");

    useEffect(() => {
        if (vanityName.length === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("1 to 5 characters (a-z, 0-9)")
        }
        else if ((vanityName.length > 0) && (icon !== checkIconMd)) {
            setIcon(checkIconMd)
            setValidName(true)
            setTooltipTitle("Matching keys available!")
        }
    }, [vanityName, icon, setValidName, setVanityName])

    const onChange = (e) => {
        const newValue = e.target.value;

        if ((!newValue.match(/[a-zA-Z1-5]/)) || (newValue === "")) {
            setError("")
            setVanityName(newValue)
        }
        else {
            setError("a-z, 0-9 only")
        }
    };

    return (
        <Tooltip title={tooltipTitle} placement="right">
            <Box sx={{ height: '50px' }}>
                <StyledTextField
                    variant="outlined"
                    aria-label="Choose a prefix!"
                    label="Choose a prefix!"
                    value={vanityName}
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

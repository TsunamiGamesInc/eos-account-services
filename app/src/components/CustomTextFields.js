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
    const [icon, setIcon] = useState(null)
    const [tooltipTitle, setTooltipTitle] = useState("Exactly 12 characters (a-z, 1-5)")

    useEffect(() => {
        if (accountName.includes("."))
        {
            let removeDot = accountName.replace('.','')
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
        else if ((accountName.length === 12) && (icon !== checkIconMd))
        {
            GetAccountInfo(accountName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle)
        }
    }, [accountName, icon, setValidName, setAccountName])

    const onChange = (e) => {
        const newValue = e.target.value;

        if (!newValue.match(/[!@#$%^&*()-+`~|{}[:;"'<>,.06789\]=\-_?/ \\]/)) {
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
    const [icon, setIcon] = useState(null)
    const [tooltipTitle, setTooltipTitle] = useState("Exactly 12 characters (a-z, 1-5)")

    useEffect(() => {
        if (accountName.includes("."))
        {
            let removeDot = accountName.replace('.','')
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
        else if ((accountName.length === 12) && (icon !== checkIconMd))
        {
            GetAccountInfoNoValid(accountName, setIcon, checkIconMd, closeIconMd, setTooltipTitle)
        }
    }, [accountName, icon, setAccountName])

    const onChange = (e) => {
        const newValue = e.target.value;

        if (!newValue.match(/[!@#$%^&*()-+`~|{}[:;"'<>,.06789\]=\-_?/ \\]/)) {
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
    const [icon, setIcon] = useState(null)
    const [tooltipTitle, setTooltipTitle] = useState("Type your account name!")

    useEffect(() => {
        if (accountName.length === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if (((accountName.length < 12) && (!accountName.includes('.'))) && (icon !== closeIconMd)) {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if (((accountName.length === 12) || (accountName.includes('.'))) && (icon !== checkIconMd))
        {
            CheckExistingName(accountName, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle)
        }
    }, [accountName, icon, setValidName, setAccountName])


    const onChange = (e) => {
        const newValue = e.target.value;

        if (!newValue.match(/[!@#$%^&*()-+`~|{}[:;"'<>,06789\]=\-_?/ \\]/)) {
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
                    label="Enter your account name!"
                    value={accountName}
                    onChange={onChange}
                    helperText={error}
                    error={!!error}
                    InputProps={{
                        endAdornment: icon,
                    }}
                    inputProps={{
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

export function SliderTextField({ setValue, valueMirror, maxValue, endAdornmentText }) {
    const handleInputChange = (e) => {
        const newSliderTextFieldValue = e.target.value;

        if (!newSliderTextFieldValue.match(
            /[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-+`~|{}[:;"'<>,.\]=\-_?/ \\]/
        )) {
            if (newSliderTextFieldValue === "") {
                valueMirror = ""
                setValue(0)
            }
            else if (newSliderTextFieldValue > maxValue) {
                valueMirror = 10
                setValue(10)
            }
            else {
                setValue(newSliderTextFieldValue === '' ? '' : Number(newSliderTextFieldValue))
            }
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
                maxLength: 3,
            }}
        />
    );
}

export function TokenTextField({ tokenName, setTokenName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null)
    const [tooltipTitle, setTooltipTitle] = useState("3 to 7 characters, a-z only")

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
        else if ((tokenName.length >= 3) && (icon !== checkIconMd))
        {
            setIcon(checkIconMd)
            setValidName(true)
            setTooltipTitle("Token name available!")
        }
    }, [tokenName, icon, setValidName, setTokenName])

    const onChange = (e) => {
        const newValue = e.target.value;

        if (!newValue.match(/[!@#$%^&*()-+`~|{}[:;"'<>,.0123456789\]=\-_?/ \\]/)) {
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

import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { SvgIcon } from '@mui/material';
import { ReactComponent as CheckIconMd } from '../images/check-icon-md.svg';
import { ReactComponent as CloseIconMd } from '../images/close-icon-md.svg';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import GetAccountInfo, { CheckExistingName } from './EosClient';

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

    const onChange = (e) => {
        const newValue = e.target.value;
        let accountNameLength = e.target.value.length;

        if (!newValue.match(/[!@#$%^&*()-+`~|{}[:;"'<>,.06789\]=\-_?/ \\]/)) {
            setError("")
            setAccountName(newValue)
        }
        else {
            setError("a-z, 1-5 only")
            accountNameLength--;
        }

        if (accountNameLength === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
        }
        else if (accountNameLength === 12) {
            GetAccountInfo(newValue, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle)
        }
        else {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("Exactly 12 characters (a-z, 1-5)")
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

export function ResourcesTextField({ accountName, setAccountName, setValidName }) {
    const [error, setError] = useState("");
    const [icon, setIcon] = useState(null)
    const [tooltipTitle, setTooltipTitle] = useState("Type your account name!")

    const onChange = (e) => {
        const newValue = e.target.value;
        let accountNameLength = e.target.value.length;

        if (!newValue.match(/[!@#$%^&*()-+`~|{}[:;"'<>,06789\]=\-_?/ \\]/)) {
            setError("")
            setAccountName(newValue)
        }
        else {
            setError("a-z, 1-5 only")
            accountNameLength--;
        }

        if (accountNameLength === 0) {
            setIcon(null)
            setValidName(false)
            setTooltipTitle("Type your account name!")
        }
        else if ((accountNameLength === 12) || (newValue.includes("."))) {
            CheckExistingName(newValue, setIcon, checkIconMd, closeIconMd, setValidName, setTooltipTitle)
        }
        else {
            setIcon(closeIconMd)
            setValidName(false)
            setTooltipTitle("That account doesn't exist!")
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

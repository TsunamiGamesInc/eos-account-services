import React from 'react';
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch';

const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            color: '#CCCCCC',
            '& + .MuiSwitch-track': {
                opacity: 0.5,
                backgroundColor: 'white'
            }
        }
    },
    '& .MuiSwitch-track': {
        opacity: 0.5,
        backgroundColor: 'white',
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#CCCCCC',
        boxShadow: 'transparent',
        '&:hover': {
            boxShadow: 'inherit'
        }
    },
}));

export default function CustomSwitch() {
    return (
        <StyledSwitch
            aria-label='Prefix/Suffix Switch'
            disableRipple />
    );
}

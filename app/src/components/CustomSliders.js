import React, { useState } from 'react';
import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider';

const StyledSlider = styled(Slider)({
    color: 'white',
    height: 6,
    minWidth: '100%',
    '& .MuiSlider-track': {
        border: 'none'
    },
    '& .MuiSlider-thumb': {
        height: 32,
        width: 32,
        backgroundColor: '#CCCCCC',
        pointerEvents: 'none',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit'
        },
        '&:before': {
            display: 'none'
        }
    },
    '&:before': {
        display: 'none'
    }
});

const StyledSliderMobile = styled(Slider)({
    color: 'white',
    height: 3,
    minWidth: '100%',
    '& .MuiSlider-track': {
        border: 'none'
    },
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: '#CCCCCC',
        pointerEvents: 'none',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit'
        },
        '&:before': {
            display: 'none'
        }
    },
    '&:before': {
        display: 'none'
    }
});

export default function CustomSlider({ value, setValue, minimum, maximum }) {
    const error = useState(0);

    const handleSliderChange = (e, newValue) => {
        if (typeof newValue == 'number') {
            setValue(newValue)
        }
    };

    return (
        <StyledSlider
            aria-label="RAM Slider"
            value={value}
            valueLabelDisplay='off'
            step={1}
            min={minimum}
            max={maximum}
            marks
            onChange={handleSliderChange}
            error={error}
        />
    )
}

export function CustomSliderMobile({ value, setValue, minimum, maximum }) {
    const error = useState(0);

    const handleSliderChange = (e, newValue) => {
        if (typeof newValue == 'number') {
            setValue(newValue)
        }
    };

    return (
        <StyledSliderMobile
            sx={{
                zoom: { xs: '181%' }
            }}
            aria-label="RAM Slider"
            value={value}
            valueLabelDisplay='off'
            step={1}
            min={minimum}
            max={maximum}
            marks
            onChange={handleSliderChange}
            error={error}
        />
    )
}

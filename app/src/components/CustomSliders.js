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
        backgroundColor: '#CCCCCC'
    },
    '&:before': {
        display: 'none'
    }

/*  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit'
    },
    '&:before': {
        display: 'none'
    }
*/
});

export default function CustomSlider({ value, setValue, valueMirror, minimum, maximum }) {
    const error = useState(0);

    const handleSliderChange = (e, newValue) => {
        if (typeof newValue == 'number') {
            setValue(newValue)
            valueMirror = value;
        }
    };

    return (
        <StyledSlider
            aria-label="RAM Slider"
            value={value}
            valueLabelDisplay="off"
            step={1}
            min={minimum}
            max={maximum}
            marks
            onChange={handleSliderChange}
            error={error}
        />
    )
}

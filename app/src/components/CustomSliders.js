import React, { useState } from 'react';
import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

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
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#CCCCCC',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
        },
        '& > *': {
            transform: 'rotate(45deg)'
        }
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
        <div>
            <Box display={{ xs: 'none', md: 'block' }}>
                <StyledSlider
                    aria-label="Resource Slider"
                    value={value}
                    valueLabelDisplay="off"
                    step={1}
                    min={minimum}
                    max={maximum}
                    marks
                    onChange={handleSliderChange}
                    error={error}
                />
            </Box>
            <Box display={{ xs: 'block', md: 'none' }}>
                <StyledSlider
                    aria-label="Resource Slider"
                    value={value}
                    valueLabelDisplay="auto"
                    step={1}
                    min={minimum}
                    max={maximum}
                    marks
                    onChange={handleSliderChange}
                    error={error}
                />
            </Box>
        </div>
    )
}

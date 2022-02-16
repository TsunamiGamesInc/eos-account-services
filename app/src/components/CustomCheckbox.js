import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { SvgIcon } from '@mui/material';
import { ReactComponent as CheckboxBlankSm } from '../images/checkbox-blank-sm.svg'
import { ReactComponent as CheckboxMarkedSm } from '../images/checkbox-marked-sm.svg'

export default function CustomCheckBox({ label, labelMobile, keyCopied, setKeyCopied }) {
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        icon={
                            <SvgIcon>
                                <CheckboxBlankSm />
                            </SvgIcon>}
                        checkedIcon={
                            <SvgIcon>
                                <CheckboxMarkedSm />
                            </SvgIcon>}
                        onChange={() => { setKeyCopied(!keyCopied) }}
                    />
                }
                label={
                    <div>
                        <Box display={{ xs: 'none', md: 'block' }}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontFamily: 'Calibri', fontSize: 12 }}>
                                {label}
                            </p>
                        </Box>
                        <Box display={{ xs: 'block', md: 'none' }}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontFamily: 'Calibri', fontSize: 12 }}>
                                {labelMobile}
                            </p>
                        </Box>
                    </div>
                }
            />
        </FormGroup>
    )
}

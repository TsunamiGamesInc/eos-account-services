import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SvgIcon } from '@mui/material';
import { ReactComponent as CheckboxBlankSm } from '../images/checkbox-blank-sm.svg'
import { ReactComponent as CheckboxMarkedSm } from '../images/checkbox-marked-sm.svg'

export default function CustomCheckBox({ scaledLabel }) {
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
                    />
                }
                label={<p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontFamily: 'Calibri', fontSize: 12 }}>{scaledLabel}</p>}
            />
        </FormGroup>
    )
}

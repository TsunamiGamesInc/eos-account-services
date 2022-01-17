import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TokenTextField } from '../CustomTextFields';
import CreateTokenValidName, { TokenValidNameComponentsTwo } from './CreateTokenValidName.js'

export default function CreateTokenComponents({ eosQuantity, setEosQuantity, ramQuantity, setRamQuantity,
    accountName, setAccountName, validName, setValidName, setRecieverPubKey, totalPrice }) {
    let eosQuantityMirror = eosQuantity;
    let ramQuantityMirror = ramQuantity;

    return (
        <Grid container spacing={3}>
            <Grid item xs={9.5} container>
                <Grid item xs={12}>
                    <Box sx={{ height: '15vh', backgroundColor: 'transparent' }} />
                </Grid>
                <Grid item xs={12}>
                    <TokenTextField accountName={accountName} setAccountName={setAccountName} setValidName={setValidName} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ height: '1vh' }} />
                </Grid>
                {!validName &&
                    <Grid item xs={12} container spacing={0}>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16, padding: '12px 0px 0px 0px' }}>
                                Getting started is as easy as choosing your token name.
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                EOS token names are 3 to 7 characters long (A through Z only).
                            </p>
                        </Grid>
                        <Grid item xs={12}>
                            <p style={{ color: 'white', lineHeight: 0, fontWeight: 'normal', fontSize: 16 }}>
                                Don't worry, the textbox will help you along.
                            </p>
                        </Grid>
                    </Grid>
                }
                {validName &&
                    <CreateTokenValidName
                        eosQuantity={eosQuantity} setEosQuantity={setEosQuantity}
                        ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                        eosQuantityMirror={eosQuantityMirror} ramQuantityMirror={ramQuantityMirror}
                        setRecieverPubKey={setRecieverPubKey} totalPrice={totalPrice}
                    />}
            </Grid>
            {validName &&
                <TokenValidNameComponentsTwo
                    eosQuantity={eosQuantity} setEosQuantity={setEosQuantity}
                    ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                    eosQuantityMirror={eosQuantityMirror} ramQuantityMirror={ramQuantityMirror}
                />}
        </Grid >
    );
}

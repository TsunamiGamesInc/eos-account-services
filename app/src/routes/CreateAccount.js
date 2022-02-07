import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CreateAccountComponents from '../components/createAccount/CreateAccountComponents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';

export default function CreateAccount({ accountName, setAccountName, validName, setValidName,
    ramQuantity, setRamQuantity, recieverPubKey, setRecieverPubKey, totalPrice, setTotalPrice }) {
    const [items, setItems] = React.useState(
        [
            {
                price: 'price_1KLXPhAVYdsvCkiZzOz41XOl',
                quantity: 1,
                description: "Account Name: " + accountName
            },
            {
                price: 'price_1KLx2tAVYdsvCkiZ6U3mHNxW',
                quantity: ramQuantity
            }
        ]
    );
    let postData = {
        accountDetails: {
            accountName: accountName,
            ramQuantity: ramQuantity,
            recieverPubKey: recieverPubKey,
        },
        lineItems: items
    };

    useEffect(() => {
        if (ramQuantity === 0) {
            setItems(
                [
                    {
                        price: 'price_1KK7ZXAVYdsvCkiZdawW9HoX',
                        quantity: 1,
                        description: "For Account: " + accountName
                    }
                ]
            )
        }
        else {
            setItems(
                [
                    {
                        price: 'price_1KLXPhAVYdsvCkiZzOz41XOl',
                        quantity: 1,
                        description: "Account Name: " + accountName
                    },
                    {
                        price: 'price_1KQfYuAVYdsvCkiZEVuwDThX',
                        quantity: ramQuantity
                    }
                ]
            )
        }
    }, [ramQuantity, accountName, setItems])

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let accountPrice;

        if (!validName) {
            accountPrice = formatter.format(1.89) + " USD"
        }
        else {
            accountPrice = formatter.format(1.89 + (0.3 * ramQuantity)) + " USD"
        }
        setTotalPrice(accountPrice)
    }, [validName, ramQuantity, setTotalPrice])

    return (
        <div>
            <Helmet>
                <title>Create Account</title>
                <meta
                    name="description"
                    content="The easiest and cheapest EOS account creation."
                />
                <meta
                    name="keywords"
                    content="EOS Account Creator, Cheap, Easy, Credit Card"
                />
            </Helmet>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xl={2} display={{ xs: 'none', xl: 'block' }} />
                <Grid item display={{ xs: 'none', md: 'block' }}>
                    <Box sx={{ width: '250px' }}>
                        <NavBar totalPrice={totalPrice} />
                    </Box>
                </Grid>
                <Grid item xl={6}>
                    <Box sx={{ zoom: { xs: '55%', md: '100%' }, width: '525px' }}>
                        <CreateAccountComponents
                            ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                            accountName={accountName} setAccountName={setAccountName}
                            validName={validName} setValidName={setValidName}
                            setRecieverPubKey={setRecieverPubKey}
                            postData={postData} totalPrice={totalPrice}
                        />
                    </Box>
                </Grid>
                <Grid item display={{ xs: 'block', md: 'none' }}>
                    <CustomDrawer />
                </Grid>
            </Grid>
        </div>
    );
}

// <Box sx={{ width: { xs: '405px', md: '525px' } }}>

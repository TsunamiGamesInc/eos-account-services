import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CreateAccountComponents from '../components/createAccount/CreateAccountComponents';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import CustomDrawer from '../components/CustomDrawer';

export default function CreateAccount({ accountName, setAccountName, validName, setValidName,
    ramQuantity, setRamQuantity, pUWeeks, setPUWeeks, receiverPrivKey, setReceiverPrivKey,
    receiverPubKey, setReceiverPubKey, totalPrice, setTotalPrice }) {
    const [items, setItems] = React.useState(
        [
            {
                price: 'price_1KLXPhAVYdsvCkiZzOz41XOl', //'price_1KK7ZXAVYdsvCkiZdawW9HoX'
                quantity: 1,
                description: "Account Name: " + accountName
            },
            {
                price: 'price_1KLx2tAVYdsvCkiZ6U3mHNxW', //'price_1KQfYuAVYdsvCkiZEVuwDThX',
                quantity: ramQuantity
            },
            {
                price: 'price_1KgzriAVYdsvCkiZ0EW9azxR',
                quantity: pUWeeks,
                description: "3ms CPU & 2KB NET Daily for " + pUWeeks + " weeks"
            }
        ]
    );
    let postData = {
        accountDetails: {
            accountName: accountName,
            receiverPubKey: receiverPubKey,
            ramQuantity: ramQuantity,
            pUWeeks: pUWeeks
        },
        lineItems: items
    };

    useEffect(() => {
        if ((ramQuantity === 0) && (pUWeeks === 0)) {
            setItems(
                [
                    {
                        price: 'price_1KLXPhAVYdsvCkiZzOz41XOl',
                        quantity: 1,
                        description: "For Account: " + accountName
                    }
                ]
            )
        }
        else if (!(ramQuantity === 0) && (pUWeeks === 0)) {
            setItems(
                [
                    {
                        price: 'price_1KLXPhAVYdsvCkiZzOz41XOl',
                        quantity: 1,
                        description: "For Account: " + accountName
                    },
                    {
                        price: 'price_1KLx2tAVYdsvCkiZ6U3mHNxW', //'price_1KQfYuAVYdsvCkiZEVuwDThX',
                        quantity: ramQuantity
                    }
                ]
            )
        }
        else if ((ramQuantity === 0) && !(pUWeeks === 0)) {
            setItems(
                [
                    {
                        price: 'price_1KLXPhAVYdsvCkiZzOz41XOl',
                        quantity: 1,
                        description: "For Account: " + accountName
                    },
                    {
                        price: 'price_1KgzriAVYdsvCkiZ0EW9azxR',
                        quantity: pUWeeks,
                        description: "3ms CPU & 2KB NET Daily for " + pUWeeks + " for account " + accountName
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
                        price: 'price_1KLx2tAVYdsvCkiZ6U3mHNxW',
                        quantity: ramQuantity
                    },
                    {
                        price: 'price_1KgzriAVYdsvCkiZ0EW9azxR',
                        quantity: pUWeeks,
                        description: "3ms CPU & 2KB NET Daily for " + pUWeeks + " weeks"
                    }
                ]
            )
        }
    }, [accountName, ramQuantity, pUWeeks, setItems])

    useEffect(() => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        let accountPrice;

        if (!validName) {
            accountPrice = formatter.format(4.00) + " USD"
        }
        else {
            accountPrice = formatter.format(4.00 + (0.4 * ramQuantity) + (7 * pUWeeks)) + " USD"
        }
        setTotalPrice(accountPrice)
    }, [validName, ramQuantity, pUWeeks, setTotalPrice])

    return (
        <div>
            <Helmet>
                <title>Create Account</title>
                <meta
                    name="description"
                    content="The easiest and cheapest EOS account creation by credit card."
                />
                <meta
                    name="keywords"
                    content="EOS Account Creator, Blockchain, Cheap, Easy, Credit Card"
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
                    <Box sx={{ width: { xs: '410px', md: '525px' }}}>
                        <CreateAccountComponents
                            accountName={accountName} setAccountName={setAccountName}
                            ramQuantity={ramQuantity} setRamQuantity={setRamQuantity}
                            pUWeeks={pUWeeks} setPUWeeks={setPUWeeks}
                            validName={validName} setValidName={setValidName}
                            receiverPrivKey={receiverPrivKey} setReceiverPrivKey={setReceiverPrivKey}
                            setReceiverPubKey={setReceiverPubKey}
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

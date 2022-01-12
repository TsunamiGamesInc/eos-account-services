import React from 'react';

export default function Checkout({ accountName, recieverPubKey, value, valueR, totalPrice }) {
    function TransferToken() {
        const postData = {
            accountName: accountName,
            recieverPubKey: recieverPubKey,
            value: value,
            valueR: valueR,
            totalPrice: totalPrice
        };

        fetch('/server/eos_functions/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }

    return (
        <button onClick={TransferToken}>Process Payment</button>
    );
}

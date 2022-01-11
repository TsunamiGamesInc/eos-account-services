import React from 'react';
import CustomButton from '../components/CustomButtons';

export default function Checkout() {
    return (
        <>
            <CustomButton onClick={TransferToken} txt="Transfer" />
            <p>Testing</p>
            <button onClick={TransferToken}>Silly</button>
        </>
    );
}

function TransferToken() {
    fetch('/server/eos_functions/transfer', {
        method: 'GET'
    })
        .then(data => console.log(data));
}

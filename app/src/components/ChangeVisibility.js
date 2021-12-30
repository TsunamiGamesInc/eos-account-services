import React, { useState } from 'react';

const ChangeVisibility = (contentName) => {
    const [show, setShow] = useState(false);
    return (
        <>
            {setShow(prev => !prev)}
            {show && contentName}
        </>
    );
}

export default ChangeVisibility

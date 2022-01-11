import React from 'react';
import { Link } from 'react-router-dom';

export default function ConditionalLink({ children, to, condition }) {
    if (condition) {
        return (
            <Link to={to} style={{ textDecoration: 'none' }}>
                {children}
            </Link>
        );
    }
    else {
        return (
            <>
                {children}
            </>
        )
    }
}

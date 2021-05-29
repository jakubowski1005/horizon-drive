import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../service/AuthService';

export const Logout = () => {

    const history = useHistory();
    const [timer, setTimer] = useState(3)

    useEffect(() => {
        console.log('token: ' + sessionStorage.getItem('token'))
        logout();
        let i = timer;
        setInterval(() => {
            if (i<1) {
                //history.push('/')
                window.location.href = '/'
            } else {
                setTimer(i--);
            };
            
        }, 1000)
        
    }, [])

    return (
        <div className="card">
            <h2>Redirect to home page in {timer}</h2>
        </div>
    )
}
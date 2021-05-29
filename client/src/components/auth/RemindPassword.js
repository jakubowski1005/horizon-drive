import React, { useState } from 'react';
import { remindPassword } from '../../service/AuthService.js';

export const RemindPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const remind = () => {
        remindPassword(email);
        setMessage('Check email');
    }

    return (
        <div className="card">
            {message ? <p>{message}</p> : <>
                <input type="text" placeholder="email" onChange={(event => setEmail(event.target.value))}/><br/>
                <button className="btn" onClick={remind}>Remind password</button>
            </>}
        </div>
    )
}
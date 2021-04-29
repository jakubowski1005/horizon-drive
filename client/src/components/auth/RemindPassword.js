import React, { useState } from 'react';
import { remindPassword } from '../../service/AuthService.js';

export const RemindPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const remindPassword = () => {
        remindPassword(email);
    }

    return (
        <div className="card">
            <h3>Forgotten password panel</h3>
            <input type="text" onChange={(event => setEmail(event.target.value))}/><br/>
            <button onClick={remindPassword}>Remind password</button>
        </div>
    )
}
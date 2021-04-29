import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../service/AuthService.js';

export const Login = () => {

    const history = useHistory();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const signIn = () => {
        sessionStorage.setItem('token', 'token');
        window.location.href = '/app'
        // login(login, password)
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res)
        //         const token = res.type + res.token;
        //         sessionStorage.setItem('token', token)
        //     }).catch(err => {
        //         console.error(err);
        // })
    }

    const checkToken = () => {
        console.log(sessionStorage.getItem('token'));
    }

    
    return (
        <div className="card">
            <h3>Login Page</h3>
            <p style={{color: 'red'}}>{message}</p><br/>
            Username: <input type="text" onChange={(event => setLogin(event.target.value))}/><br/>
            Password: <input type="password" onChange={(event => setPassword(event.target.value))}/><br/>
            <button onClick={signIn}>Sign In</button>
            <button onClick={checkToken}>Check token</button>
            <button onClick={() => history.push('/remindPassword')}>Remind password</button>
        </div>
    )
}
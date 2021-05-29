import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../service/AuthService.js';

export const Login = () => {

    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const signIn = () => {
        login(username, password)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(body => {
                            console.log(body)
                            const token = body.type + body.token;
                            sessionStorage.setItem('token', token)
                            setMessage('Redirecting...');
                            setTimeout(() => window.location.href = '/app', 1000)
                        })
                } else {
                    setMessage('Wrong credentials');
                }
            }).catch(err => {
                console.error(err);
                setMessage('Something went wrong');
        })
    }

    const checkToken = () => {
        console.log(sessionStorage.getItem('token'));
    }

    return (
        <div className="card">
            {message && <><p style={{color: 'red'}}>{message}</p><br/></>}
            <input type="text" placeholder="username" onChange={(event => setUsername(event.target.value))}/><br/>
            <input type="password" placeholder="password" onChange={(event => setPassword(event.target.value))}/><br/>
            <button className="btn-small" onClick={() => history.push('/remindPassword')}>Remind password</button><br/>
            <button className="btn" onClick={signIn}>Sign In</button>
        </div>
    )
}
import React, { useState } from "react";

export const LoginTest = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const signIn = () => {
        const url = "http://localhost:8080/auth/login"
        const headers = {'Content-Type': 'application/json'}
        const body = {
            username: login,
            password: password
        }
        const bodyStr = JSON.stringify(body)
        console.log(body);
        fetch(url, {method: 'POST', headers: headers, body: bodyStr})
            .then(res => res.json())
            .then(res => {
                console.log(res)
                const token = res.type + res.token;
                sessionStorage.setItem('token', token)
            }).catch(err => {
                console.error(err);
        })
    }

    const checkToken = () => {
        console.log(sessionStorage.getItem('token'));
    }

    return (
        <>
            <h3>Login Page</h3>
            <p style={{color: 'red'}}>{message}</p><br/>
            <input type="text" onChange={(event => setLogin(event.target.value))}/><br/>
            <input type="password" onChange={(event => setPassword(event.target.value))}/><br/>
            <button onClick={signIn}>Sign In</button>
            <button onClick={checkToken}>Check token</button>
        </>
    )
}
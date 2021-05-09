import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../service/AuthService.js'

export const Register = () => {

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [checkTerms, setCheckTerms] = useState(false);
    const [message, setMessage] = useState('');

    const signUp = () => {
        if (areCredentialsValid && checkTerms) {
            register(login, email, password)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    setMessage('Redirecting...');
                    setTimeout(() => window.location.href = '/login', 1000);
                } else {
                    setMessage('Something went wrong');
                }
            }).catch(err => {
                console.error(err);
        })
        }
    }

    const areCredentialsValid = () => {
        return password === passwordConfirmation;
    }

    return (
        <div className="card">
            <h3>Register Page</h3>
            <p style={{color: 'red'}}>{message}</p><br/>
            Username: <input type="text" onChange={(event => setLogin(event.target.value))}/><br/>
            Email: <input type="text" onChange={(event => setEmail(event.target.value))}/><br/>
            Password: <input type="password" onChange={(event => setPassword(event.target.value))}/><br/>
            Confirm password: <input type="password" onChange={(event => setPasswordConfirmation(event.target.value))}/><br/>
            <input type="checkbox" onChange={(event => setCheckTerms(event.target.value))}/> <Link to="/terms">Terms</Link><br/>
            <button onClick={signUp}>Sign Up</button>
        </div>
    )
}
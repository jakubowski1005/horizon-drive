import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../service/AuthService.js'
import { validateCredentials } from '../../service/utils.js';

export const Register = () => {

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [checkTerms, setCheckTerms] = useState(false);
    const [message, setMessage] = useState('');

    const signUp = () => {
        const validationResults = validateCredentials(login, email, password, passwordConfirmation, checkTerms);
        if (!validationResults[0]) {
            setMessage(validationResults[1]);
            return;
        }

        if (validationResults[0]) {
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
                setMessage('Something went wrong');
        })
        }
    }

    return (
        <div className="card">
            <p style={{color: 'red'}}>{message}</p><br/>
            <input type="text" placeholder="username" onChange={(event => setLogin(event.target.value))}/><br/>
            <input type="text" placeholder="email" onChange={(event => setEmail(event.target.value))}/><br/>
            <input type="password" placeholder="password" onChange={(event => setPassword(event.target.value))}/><br/>
            <input type="password" placeholder="confirm password" onChange={(event => setPasswordConfirmation(event.target.value))}/><br/>
            <input type="checkbox" onChange={(event => setCheckTerms(event.target.value))}/> 
                I agree all statements in <Link as="span" to="/terms" className="checkbox">Terms of service</Link><br/>
            <button className="btn" onClick={signUp}>Sign Up</button>
        </div>
    )
}
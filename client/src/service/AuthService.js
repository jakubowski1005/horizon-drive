import { URL } from '../constants/urls';
import { HTTP } from '../constants/http';

const headers = {'Content-Type': 'application/json'}

export const login = (username, password) => {
    const url = URL.BASE + URL.LOGIN;
    const body = JSON.stringify({
        username: username,
        password: password
    });
    return fetch(url, {
        method: HTTP.POST, 
        headers: headers, 
        body: body
    });
}

export const register = (username, email, password) => {
    const url = URL.BASE + URL.REGISTER;
    const body = JSON.stringify({
        username: username,
        email: email,
        password: password
    });

    return fetch(url, {
        method: HTTP.POST, 
        headers: headers, 
        body: body
    });
}

export const remindPassword = (email) => {
    console.log('remindPassword: ' + email);
}

export const logout = () => {
    sessionStorage.removeItem('token');
}
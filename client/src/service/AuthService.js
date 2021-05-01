import { URL } from '../constants/urls';
import { HTTP } from '../constants/http';

const headers = {'Content-Type': 'application/json'}

export const login = (username, password) => {
    const url = URL.BASE + URL.LOGIN;
    const body = {
        username: username,
        password: password
    }

    console.log('calling api: ' + url);
    console.log('with header:');
    console.log(headers);
    console.log('with data:');
    console.log(body);

    return fetch(url, {
        method: HTTP.POST, 
        headers: headers, 
        body: body
    });
}

export const register = (username, email, password) => {
    const url = URL.BASE + URL.REGISTER;
    const body = {
        username: username,
        email: email,
        password: password
    }

    const bodyJson = JSON.stringify(body);

    console.log('calling api: ' + url);
    console.log('with header:');
    console.log(headers);
    console.log('with data:');
    console.log(body);
    console.log(bodyJson);

    return fetch(url, {
        method: HTTP.POST, 
        headers: headers, 
        body: bodyJson
    });
}

export const remindPassword = (email) => {
    console.log('remindPassword')
}

export const logout = () => {
    sessionStorage.removeItem('token');
}
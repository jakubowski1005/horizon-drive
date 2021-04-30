
export const login = (username, password) => {
    const url = "http://localhost:8080/auth/login"
    const headers = {'Content-Type': 'application/json'}
    const body = {
        username: login,
        password: password
    }
    return fetch(url, {method: 'POST', headers: headers, body: body});
}

export const register = (username, email, password) => {
    const url = "http://localhost:8080/auth/register"
    const headers = {'Content-Type': 'application/json'}
    const body = {
        username: login,
        email: email,
        password: password
    }
    return fetch(url, {method: 'POST', headers: headers, body: body});
}

export const remindPassword = (email) => {
    console.log('remindPassword')
}

export const logout = () => {
    sessionStorage.removeItem('token');
}
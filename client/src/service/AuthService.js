
export const login = (username, password) => {
    const url = "http://localhost:8080/auth/login"
    const headers = {'Content-Type': 'application/json'}
    const body = {
        username: username,
        password: password
    }
    return fetch(url, {method: 'POST', headers: headers, body: body});
}

export const register = (username, email, password) => {
    const url = "http://localhost:8080/auth/register"
    const headers = {"Content-Type": "application/json"}
    const body = {
        username: username,
        email: email,
        password: password
    }
    const bodyJson = JSON.stringify(body);
    console.log(body)
    console.log(bodyJson)

    return fetch(url, {method: "POST", headers: headers, body: bodyJson});
}

export const remindPassword = (email) => {
    console.log('remindPassword')
}

export const logout = () => {
    sessionStorage.removeItem('token');
}
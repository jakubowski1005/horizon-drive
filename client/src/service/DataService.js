import { folders, files } from '../constants/testData';
import { URL } from '../constants/urls';
import { HTTP } from '../constants/http';



export const getFolders = () => {
    const res = new Response(JSON.stringify(folders));
    return Promise.resolve(res);
    const url = URL.BASE + URL.FOLDERS;
    return fetch(url, {
        method: HTTP.GET,
        headers: getHeader()
    });
}

export const createFolder = (name, color) => {
    const url = URL.BASE + URL.FOLDERS;
    const body = {
        name: name,
        color: color
    }
    console.log('calling api: ' + url);
    console.log('with header:\n' + getHeader());
    console.log('with data:\n' + body);
    return;

    return fetch(url, {
        method: HTTP.POST, 
        headers: getHeader(), 
        body: body
    });
}

export const updateFolder = (id, folder) => {
    const url = URL.BASE + URL.FOLDERS + id;
    console.log('calling api: ' + url);
    console.log('with header:\n' + getHeader());
    console.log('with data:\n' + folder);
    return;

    return fetch(url, {
        method: HTTP.PUT,
        headers: getHeader(),
        body: folder
    });
}

export const deleteFolder = (id) => {
    const url = URL.BASE + URL.FOLDERS + id;
    console.log('calling api: ' + url);
    console.log('with header:\n' + getHeader());
    return;

    return fetch(url, {
        method: HTTP.DELETE,
        headers: getHeader()
    });
}

export const getFiles = () => {
    const res = new Response(JSON.stringify(files));
    return Promise.resolve(res);
    const url = URL.BASE + URL.FILES;
    return fetch(url, {
        method: HTTP.GET,
        headers: getHeader() 
    });
}

export const uploadFile = (file) => {
    const url = URL.BASE + URL.FILES;
    console.log('calling api: ' + url);
    console.log('with header:\n' + getHeader());
    console.log('with data:\n' + file);
    return;

    return fetch(url, {
        method: HTTP.POST,
        headers: getHeader(),
        body: file
    });
}

export const updateFile = (id, fileData) => {
    const url = URL.BASE + URL.FILES + id;
    console.log('calling api: ' + url);
    console.log('with header:\n' + getHeader());
    console.log('with data:\n' + fileData);
    return;

    return fetch(url, {
        method: HTTP.PUT,
        headers: getHeader(),
        body: fileData
    })
}

export const deleteFile = (id) => {
    const url = URL.BASE + URL.FILES + id;

    console.log('calling api: ' + url);
    console.log('with header:\n' + getHeader());
    return;

    return fetch(url, {
        method: HTTP.DELETE,
        headers: getHeader()
    })
}

const getHeader = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': getToken()
    }
}

const getToken = () => {
    return sessionStorage.getItem('token');
}
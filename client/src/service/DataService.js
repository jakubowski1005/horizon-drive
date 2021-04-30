import { folders, files } from '../constants/testData';

export const getFolders = () => {
    return folders;
}

export const getFiles = () => {
    return files;
}

export const uploadFile = (file) => {
    const url = "http://localhost:8080/upload"
    return fetch(url, {method: 'POST', body: file});
}
import React, { useState, useEffect } from 'react';
import { getFolders, getFiles } from '../../service/DataService';
import { FileTable } from './FileTable';
import { Sidebar } from './Sidebar';
import { Uploader } from './Uploader';
import { Settings } from './Settings';

export const HorizonDrive = () => {

    const [loading, setLoading] = useState(true);
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [filesToShow, setFilesToShow] = useState([]);
    const [activeOption, setActiveOption] = useState('all');

    useEffect(async () => {
        setLoading(true);
        let mounted = true;

        const constFolders = [
            {name: 'all', color: 'black'},
            {name: 'shared', color: 'grey'}
        ];

        getFolders()
        .then(res => res.json())
        .then(data => mounted ? setFolders([...constFolders, ...data]) : null)
        .then(() => console.log('folders'))
        .then(() => console.log(folders))
        .catch(err => console.error(err))

        getFiles()
        .then(res => res.json())
        .then(data => mounted ? setFiles(data) : null)
        .then(() => console.log('files'))
        .then(() => console.log(files))
        .catch(err => console.error(err))

        setLoading(false);
        return () => mounted = false;
        
    }, [])

    const select = (option) => {
        setActiveOption(option);
        if (option === 'settings') {
            return;
        }

        if (option === 'all') {
            setFilesToShow(files);
            return;
        }
        const folderId = folders.find(folder => folder.name === option).id;
        const filteredFiles = files.filter(file => file.folder === folderId);
        setFilesToShow(filteredFiles);
    }

    const sortFiles = (column, order) => {
        let sortedFiles;
        if (order === 'asc') {
            console.log('asc')
            console.log(column)
            console.log(files[0][column])
            sortedFiles = files.sort((a,b) => (a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0));
            console.log(sortedFiles)
        } else {
            sortedFiles = files.sort((a,b) => (a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0));
            console.log(sortedFiles)
        }
        setFilesToShow(sortedFiles);
    }
    
    return (
        <>
            {loading && 'Loading...'}
            {!loading && <>
            <Sidebar folders={folders} select={select}/>
            <div className="content">
                {activeOption === 'settings' && <Settings />}
                {activeOption !== 'settings' && <>
                    <Uploader />
                    <FileTable key={"filetable"} files={filesToShow} sortFiles={sortFiles}/>
                </>}
            </div>
            </>}
        </>
    )
}
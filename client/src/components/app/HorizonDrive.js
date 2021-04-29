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

    useEffect(() => {
        const allFiles = getFiles();
        setFiles(allFiles)
        setFilesToShow(allFiles);
        setFolders([
            {name: 'all', color: 'black'},
            {name: 'shared', color: 'grey'},
            ...getFolders()
        ])
        setLoading(false);
        // getFolders()
        // .then(res => res.json())
        // .then(data => setFolders(data))
        // .then(() => {
        //     getFiles()
        //     .then(res => res.json())
        //     .then(data => setFiles(data))
        //     .catch(err => console.error(err))
        // })
        // .catch(err => console.error(err))
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
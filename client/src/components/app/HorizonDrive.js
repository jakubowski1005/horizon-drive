import React, { useState, useEffect } from 'react';
import { getFolders, getFiles } from '../../service/DataService';
import { FileTable } from './FileTable';
import { Sidebar } from './Sidebar';
import { Uploader } from './Uploader';
import { FolderLabel } from './FolderLabel';
import { FreeSpace } from './FreeSpace';

const staticFolders = [
    {id: 0, rowId: 1, folderName: 'Add new', color: '#0094FF', icon: 'create_new_folder'},
    {id: 1, rowId: 2, folderName: 'All', color: 'black', icon: 'folder_special'},
    {id: 2, rowId: 3, folderName: 'Shared', color: 'grey', icon: 'folder_shared'}
];

export const HorizonDrive = () => {
    const [foldersLoading, setFoldersLoading] = useState(true);
    const [filesLoading, setFilesLoading] = useState(true);
    const [foldersToShow, setFoldersToShow] = useState([]);
    const [files, setFiles] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [userInfoLoading, setUserInfoLoading] = useState(true);
    const [filesToShow, setFilesToShow] = useState([]);
    const [activeOption, setActiveOption] = useState('All');
    const [activeFolder, setActiveFolder] = useState(staticFolders[1]);

    useEffect(() => {
        // const callout = async () => {
        //     const mockData = {username: 'root', freeSpace: 2 * 1000 * 1000 * 1000 * 8};
        //     const response = mockData;
        //     setUserInfo(response);
        //     setUserInfoLoading(false);
        // }
        // callout();
            const mockData = {username: 'root', freeSpace: 2 * 1000 * 1000 * 1000 * 8};
            const response = mockData;
            setUserInfo(response);
            setUserInfoLoading(false);
    }, [])

    useEffect(() => {
        const callout = async () => {
            const response = await getFolders();
            const folders = await response.json();
            getFoldersToShow(folders);
            setFoldersLoading(false)
        }
        callout();
    }, [])

    const getFoldersToShow = (folders) => {
        let index = 4;
        const apiFolders = folders.map(folder => ({
            rowId: index++,
            icon: 'folder',
            ...folder
        }))
        
        setFoldersToShow([...staticFolders, ...apiFolders]);
        console.log(foldersToShow);
    }

    useEffect(() => {
         const callout = async () => {
            const response = await getFiles();
            const files = await response.json();
            setFiles(files);
            getFilesToShow(files);
            setFilesLoading(false)
        }
        callout();
    }, [])

    const getFilesToShow = (files) => {
        let index = 1;
        const apiFiles = files.map(file => ({
            rowId: index++,
            date: new Date(file.createdAt),
            ...file
        }))
        setFilesToShow(apiFiles);
    }

    const select = (option) => {
        setActiveFolder(foldersToShow.find(folder => folder.folderName === option));
        setActiveOption(option);
        
        switch (option) {
            case 'All':
                getFilesToShow(files);
                return;
            case 'Shared':
                const sharedFiles = files.filter(file => file.sharedFor.includes('test'))
                getFilesToShow(sharedFiles);
                return;
        }
        const selectedFolder = foldersToShow.find(folder => folder.folderName === option);
        setActiveFolder(selectedFolder);
        const folderName = selectedFolder.folderName;
        const filteredFiles = files.filter(file => file.folders.includes(folderName));
        getFilesToShow(filteredFiles);
    }

    const sortFiles = (column, order) => {
        const sortedFiles = (order === 'asc') ?
         filesToShow.sort((a,b) => (a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0)) :
         filesToShow.sort((a,b) => (a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0));
        getFilesToShow(sortedFiles);
    }
    
    return (
        <>
            {(foldersLoading || filesLoading || userInfoLoading) ? 
            <Loading /> : 
            <>
                <Sidebar folders={foldersToShow} username={userInfo.username} select={select}/>
                <div className="content">
                    <div className="flex">
                        <div className="top-bar-item">
                            <FolderLabel folderName={activeOption} folderColor={activeFolder.color} folderIcon={activeFolder.icon}/>
                        </div>
                        <div className="top-bar-item"><FreeSpace freeSpace={userInfo.freeSpace} /></div>
                        <div className="top-bar-item"><Uploader /></div>
                    </div>
                        <FileTable 
                        files={filesToShow}
                        sortFiles={sortFiles}/>
                </div>
            </>}
        </>
    )
}

const Loading = () => {
    return (
        <div className="card">
            <p>Loading...</p>
        </div>
    )
}
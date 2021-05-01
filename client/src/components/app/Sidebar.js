import React, { useEffect, useState } from 'react';
import { createFolder, updateFolder, deleteFolder } from '../../service/DataService';
import { Folder } from './Folder'

export const Sidebar = ({folders, select}) => {

    const [folderColor, setFolderColor] = useState('');
    const [folderName, setFolderName] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const selectFolder = (option) => {
        select(option);
    }

    const addFolder = () => {
        console.log('add folder');
        return;
        createFolder(folderName, folderColor)
        .then(res => {
            console.log(res);
        }).catch(err => console.error(err))
    }

    const updateFolder = () => {
        console.log('update folder');
        return;
        updateFolder(folderName, folderColor)
        .then(res => {
            console.log(res);
        }).catch(err => console.error(err))
    }

    const deleteFolder = () => {
        console.log('delete folder');
        return;
        deleteFolder(folderName, folderColor)
        .then(res => {
            console.log(res);
        }).catch(err => console.error(err))
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <>
        <div className="sidebar">
            <img src="src/styles/avatar.png" alt="Avatar" className="avatar"/>
            <p>Artur Jakubowski</p>
            <hr/>
            <button onClick={openModal}>+ Add folder</button>
            {folders.map(folder => <Folder key={folder.name} folder={folder} onClick={() => selectFolder(folder.name)} />)}
            <hr/>
            <div onClick={() => selectFolder('settings')}>Settings</div>
        </div>
        {modalOpen && <div className="modal" id="createFolderModal">
            <div className="modal-content">
                <p>Select folder name:</p>
                <p>Select folder color:</p>
                <button onClick={addFolder}>Add</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
        }
        </>
    )
}
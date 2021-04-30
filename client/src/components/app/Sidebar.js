import React, { useEffect, useState } from 'react';
import { Folder } from './Folder'

export const Sidebar = ({folders, select}) => {

    useEffect(() => console.log(folders), []);

    const selectFolder = (option) => {
        select(option);
    }

    const addFolder = () => {
        console.log('add folder');
    }

    return (
        <div className="sidebar">
            <img src="src/styles/avatar.png" alt="Avatar" className="avatar"/>
            <p>Artur Jakubowski</p>
            <hr/>
            <button onClick={addFolder}>+ Add folder</button>
            {folders.map(folder => <Folder key={folder.name} folder={folder} onClick={() => selectFolder(folder.name)} />)}
            <hr/>
            <div onClick={() => selectFolder('settings')}>Settings</div>
        </div>
    )
}
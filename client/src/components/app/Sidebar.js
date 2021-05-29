import React, { useState } from 'react';
import { Folder } from './Folder'
import { FolderModal } from './FolderModal';

export const Sidebar = ({folders, select, username}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const selectFolder = (option) => {
        if (option === 'Add new') {
            setModalOpen(true);
            return;
        }
        select(option);
    }

    return (
        <>
        <div className="sidebar">
            <p>{username}</p>
            <hr/>
            {folders.map(folder => 
            <Folder 
                key={folder.rowId} 
                folder={folder} 
                onClick={() => selectFolder(folder.folderName)} />)}
        </div>
        {modalOpen && <FolderModal creation closeModal={() => setModalOpen(false)} />}
        </>
    )
}
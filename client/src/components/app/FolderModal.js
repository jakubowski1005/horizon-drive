import React, { useState } from 'react';
import { createFolder, updateFolder } from '../../service/DataService';

export const FolderModal = ({folder, creation, closeModal}) => {

    const [name, setName] = useState(folder ? folder.name : '');
    const [color, setColor] = useState(folder ? folder.color : '');

    const close = () => closeModal();

    const create = () => {
        createFolder(name, color)
            .then(res => console.log(res))
            .catch(err => console.error(err))
            .finally(() => close())
    }

    const update = () => {
        let updatedFolder = folder;
        updatedFolder.name = name;
        updatedFolder.color = color;
        console.log(updatedFolder);
        updateFolder(folder.id, updatedFolder)
            .then(res => console.log(res))
            .catch(err => console.error(err))
            .finally(() => close())
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <p>Select folder name:</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                <p>Select folder color:</p>
                <input type="text" value={color} onChange={e => setColor(e.target.value)} /><br/><br/>
                {creation ? <button onClick={create}>Add</button> : <button onClick={update}>Update</button>}
                <button onClick={close}>Close</button>
            </div>
        </div>
    )
}
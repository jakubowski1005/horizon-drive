import React, { useState } from 'react';
import { updateFile } from '../../service/DataService';

export const FileModal = ({id, filename, folders, sharedFor, closeModal}) => {

    const [newFilename, setNewFilename] = useState(filename);
    const [newFolders, setNewFolders] = useState(folders.join());
    const [newSharedFor, setNewSharedFor] = useState(sharedFor.join());

    const close = () => closeModal();

    const update = () => {
        const updatedFile = {
            filename: newFilename,
            folders: newFolders.split(","),
            sharedFor: newSharedFor.split(",")
        }

        updateFile(id, updatedFile)
        .then(res => console.log(res))
        .catch(err => console.error(err))
        .finally(() => close());
    }

    return (
        <div className="modal">
        <div className="modal-content">
            <p>Select file name:</p>
            <input type="text" value={newFilename} onChange={e => setNewFilename(e.target.value)} />
            <p>Select folders:</p>
            <input type="text" value={newFolders} onChange={e => setNewFolders(e.target.value)} /><br/><br/>
            <p>Select shared for:</p>
            <input type="text" value={newSharedFor} onChange={e => setNewSharedFor(e.target.value)} /><br/><br/>
            <button onClick={update}>Update</button>
            <button onClick={close}>Close</button>
        </div>
    </div>
    )
}
import React, { useState } from 'react';
import MaterialIcon from 'material-icons-react';
import { FileModal } from './FileModal';
import { deleteFile } from '../../service/DataService'
import { truncate, timeAgo, printSize } from '../../service/utils';

export const File = ({data}) => {
    const [openModal, setOpenModal] = useState(false);

    const downloadFile = () => {
        console.log('download file:');
        console.log(data);
    }

    const remove = () => {
        deleteFile(data.id);

    }

    return (
        <div className="file">
            <div style={{display: 'inline', width: "70%"}}><MaterialIcon icon="description" size="small"/>{truncate(data.filename)}</div>
            <div style={{width: "10%"}}>{printSize(data.filesize)}</div>
            <div style={{width: "10%"}}>{timeAgo(data.date)}</div>
            <div style={{display: 'inline', width: "10%"}}>
                <MaterialIcon icon="edit" size="small" onClick={() => setOpenModal(true)}/>
                <MaterialIcon icon="download" size="small" onClick={downloadFile}/>
                <MaterialIcon icon="delete" size="small" onClick={remove}/>
            </div>
            {openModal && <FileModal 
            id = {data.id}
            filename={data.filename} 
            folders={data.folders} 
            sharedFor={data.sharedFor} 
            closeModal={() => setOpenModal(false)}/>}
        </div>
    )
}
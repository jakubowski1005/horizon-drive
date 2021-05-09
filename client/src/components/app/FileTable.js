import React, { useEffect, useState } from 'react';
import { File } from './File'
import { getFolders, getFiles } from '../../service/DataService'

export const FileTable = ({files, sortFiles}) => {

    const [loading, setLoading] = useState(false);
    //const [folders, setFolders] = useState([]);
    //const [files, setFiles] = useState([]);

    // useEffect(() => {
    //     getFolders()
    //     .then(res => res.json())
    //     .then(data => setFolders(data))
    //     .then(() => {
    //         getFiles()
    //         .then(res => res.json())
    //         .then(data => setFiles(data))
    //         .catch(err => console.error(err))
    //     })
    //     .catch(err => console.error(err))
    // }, [])

    // useEffect(() => {
    //     console.log({files, sortFiles});
    // })

    const sort = (column, order) => {
        console.log(column, order);
        sortFiles(column, order);
    }

    return (
        <div>
            {loading && 'Loading...'}
            {!loading && <>
                <div className="file-columns">
                    <div> 
                        <div>No</div>
                        <div onClick={() => sort('id', 'asc')}>ASC</div>
                        <div onClick={() => sort('id', 'desc')}>DESC</div>
                    </div>
                    <div>Filename</div>
                    <div>Filesize</div>
                    <div>Date</div>
                    <div></div>
                </div>
                {files.map(file => <File key={"file"} data={file} />)}
            </>}
        </div>
    )
}
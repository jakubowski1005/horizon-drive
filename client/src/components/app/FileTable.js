import React from 'react';
import { File } from './File'

export const FileTable = ({files, sortFiles}) => {
    const sort = (column, order) => sortFiles(column, order);

    return (
        <>
                {files.map(file => <File key={file.id} data={file} />)}
            </>
    )
}
import React  from 'react';
import MaterialIcon from 'material-icons-react';

export const Folder = ({folder, onClick}) => {
    return (
        <div className="folder" onClick={onClick}>
            <MaterialIcon icon={folder.icon} color={folder.color} size="medium"/>
            <span>&nbsp;{folder.folderName}</span>
        </div>
    )
}
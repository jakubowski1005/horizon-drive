import React from 'react';
import MaterialIcon from 'material-icons-react';

export const FolderLabel = ({folderName, folderColor, folderIcon}) => {
    return (
            <div className="folder-label">
                <MaterialIcon icon={folderIcon} color={folderColor} size="large"/>
                <span>&nbsp;{folderName}</span>
            </div>
    )
}
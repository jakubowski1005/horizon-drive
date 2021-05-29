import React from 'react';
import { printSize } from '../../service/utils';

export const FreeSpace = ({freeSpace}) => {
    return (
            <div className="folder-label">
            {printSize(freeSpace)} / 5GB
            </div>
    )
}
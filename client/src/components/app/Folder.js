import React, { useEffect, useState } from 'react';

export const Folder = ({folder, onClick}) => {

    useEffect(() => console.log(folder),[])

    return (
        <div data-reactid={folder.name} className="folder" onClick={onClick}>
            <p className={{color: folder.color}}>{folder.name}</p>
        </div>
    )
}
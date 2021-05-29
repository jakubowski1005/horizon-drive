import React, { useState } from 'react';
import { ConfirmModal } from './ConfirmModal';
import avatar from '../../styles/avatar.png'

export const Settings = () => {
    return (
        <>
            <p>Settings</p>
            <div className="navbar">
                <div className="navbar-item">
                    User Info
                </div>
                <div className="navbar-item">
                    <a>Change password</a>
                </div>
                <div className="navbar-item">
                    <a>Delete account or files</a>
                </div>
            </div>
        </>
    )
}

const UserInfo = () => {
    const editAvatar = () => {
        console.log('edit avatar');
    }

    return (
        <div className="card">
            <img src={avatar} alt="Avatar" className="avatar"/>
            <p>Artur Jakubowski</p>
            <button onClick={editAvatar}>Edit avatar</button>
        </div>
    )
}

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updatePassword = () => {
        if (newPassword === confirmPassword) {
            console.log('change password');
        }
    }

    return (
        <div className="card">
            <p>New password:</p>
            <input type="password" onChange={e => setNewPassword(e.target.value)} />
            <p>Confirm password:</p>
            <input type="password" onChange={e => setConfirmPassword(e.target.value)} />
            <button onClick={updatePassword}>Submit</button>
        </div>
    )
}

const DeleteAccount = () => {
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [deleteFilesModal, setDeleteFilesModal] = useState(false);

    const deleteAccount = () => {
        console.log('delete account');
    }

    const deleteAllFiles = () => {
        console.log('delete all files');
    }

    return (
        <div className="card">
            <button onClick={() => setDeleteAccountModal(true)}>Delete account</button>
            <button onClick={() => setDeleteFilesModal(true)}>Delete all files</button>
            {deleteAccountModal && <ConfirmModal onConfirm={deleteAccount} closeModal={() => setDeleteAccountModal(true)} />}
            {deleteFilesModal && <ConfirmModal onConfirm={deleteAccount} closeModal={() => setDeleteAccountModal(true)} />}
        </div>
    )
}
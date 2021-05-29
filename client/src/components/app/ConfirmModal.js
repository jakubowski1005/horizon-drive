import React from 'react';

export const ConfirmModal = ({onConfirm, closeModal}) => {

    const confirm = () => onConfirm();
    const close = () => closeModal();
    
    return (
        <div className="modal">
            <div className="modal-content">
                <p>Are you sure?</p>
                <button onClick={confirm}>Confirm</button>
                <button onClick={close}>Close</button>
            </div>
        </div>
    )
}
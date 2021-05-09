import React, { useState } from 'react';
import { URL } from '../../constants/urls'

export const HomePage = () => {

    const [status, setStatus] = useState('');

    const testConnection = () => {
        fetch(URL.BASE + "/test")
        .then(res => res.status === 200 ? setStatus('Success') : setStatus('Failed'))
        .catch(err => console.error(err))
    }
    return (
        <div className="card">
            <h1>Welcome in Horizon Drive</h1>
            <button onClick={testConnection}>Test Connection</button>
            {status && <p style={{color: status==='Success' ? 'green' : 'red'}}>{status}</p>}
        </div>
    )
}
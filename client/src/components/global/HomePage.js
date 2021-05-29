import React from 'react';

export const HomePage = () => {
    return (
        <div className="card">
            <h1>Store, share and manage your files everytime from everywhere.</h1>
            <h1>Up to 5GB free space.</h1>
            <button className="btn" onClick={() => window.location.href="/register"}>Click here to start</button>
        </div>
    )
}
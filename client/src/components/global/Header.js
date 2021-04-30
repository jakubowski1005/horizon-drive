import React, { useEffect, useState } from "react";
import { NavLink, BrowserRouter } from 'react-router-dom';
import '../../styles/styles.css'

export const Header = () => {
    
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token') != null) {
            setAuth(true);
        }
    }, [])

    return (
        <div className="navbar">
            <BrowserRouter forceRefresh>
                <NavLink to="/" className="navbar-item" activeClassName="active" strict>Horizon Drive</NavLink>
                {!auth && <>
                    <NavLink to="/login" className="navbar-item" activeClassName="active" strict>Sign In</NavLink>
                    <NavLink to="/register" className="navbar-item" activeClassName="active" strict>Sign Up</NavLink>
                </>}
                {auth && <>
                    <NavLink to="/app" className="navbar-item" activeClassName="active" strict>Drive</NavLink>
                    <NavLink to="/logout" className="navbar-item" activeClassName="active" strict>Logout</NavLink>
                </>}
            </BrowserRouter>
        </div>
    )
}
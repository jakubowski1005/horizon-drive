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
            <BrowserRouter forceRefresh className="navbar">
                    <NavLink to="/" exact className="navbar-item" activeClassName="active" strict>HorizonDrive</NavLink>
                {!auth && <div className="right">
                    <NavLink to="/login" className="navbar-item" activeClassName="active" strict>Sign In</NavLink>
                    <NavLink to="/register" className="navbar-item" activeClassName="active" strict>Sign Up</NavLink>
                </div>}
                {auth && <div className="right">
                    <NavLink to="/app" className="navbar-item" activeClassName="active" strict>Drive</NavLink>
                    <NavLink to="/settings" className="navbar-item" activeClassName="active" strict>Settings</NavLink>
                    <NavLink to="/logout" className="navbar-item" activeClassName="active" strict>Logout</NavLink>
                </div>}
            </BrowserRouter>
        </div>
    )
}
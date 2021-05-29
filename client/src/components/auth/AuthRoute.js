import React from 'react';
import { Route } from 'react-router-dom';

export const AuthRoute = ({path, component}) => {
    return (
        sessionStorage.getItem('token') == null ? 
            window.location.href = '/login' : 
            <Route path={path} component={component} />
    )
}
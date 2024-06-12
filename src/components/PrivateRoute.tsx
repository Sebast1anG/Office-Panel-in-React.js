import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * @param {{ element: React.ReactNode }} props
 */
const PrivateRoute = ({ element }: { element: React.ReactNode; }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;

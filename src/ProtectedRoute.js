//check if user loggedin, if not send to login screen


import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../src/Pages/UserAuthorization/AuthContext';  // Import your Auth Context

function ProtectedRoute({ children }) {
    const { currentUser } = useAuth(); // Get the current user from context

    if (!currentUser) {
        // User not logged in, redirect to login page
        return <Navigate to="/login" />;
    }

    return children;
}
export default ProtectedRoute;
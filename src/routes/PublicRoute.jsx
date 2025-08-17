import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    // Redirect authenticated users to the page they were trying to access or dashboard
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;

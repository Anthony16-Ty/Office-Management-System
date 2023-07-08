import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ component: Component, isLoggedIn, isadmin, isStaff, ...rest }) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (isadmin) {
    return <Route {...rest} element={<Component />} />;
  }

  if (isStaff) {
    return <Route {...rest} element={<Component />} />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoutes;

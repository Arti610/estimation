
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Custom PrivateRoute component
const PrivateRoute = ({ element: Element, ...rest }) => {
  // Check if the user is logged in (you can implement your own logic here)
  const isLoggedIn = /* Add your logic to check if the user is logged in */ true;

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;

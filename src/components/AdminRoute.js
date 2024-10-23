import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element }) => {
 // const { user } = useContext(AuthContext);  // Access user and role from AuthContext
  let user= JSON.parse(localStorage.getItem('user'))
  // Check if the user is logged in and has an admin role
  if (user && user.role === 'admin') {
    return element;
  }

  // If not an admin, redirect to login or any other page
  return <Navigate to="/login" />;
};

export default AdminRoute;

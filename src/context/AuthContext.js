// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component that wraps around the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in a user
  const login = (userData) => {
    console.log("userc",userData)
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Optionally, store user in localStorage
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Optionally, remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

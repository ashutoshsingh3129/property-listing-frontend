import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';  // Import the AuthProvider
import Payment from './components/Payment';
import SignupPage from './components/SignupPage';
import PropertyDetailsPage from './components/PropertyDetailsPage';
import PropertyListingPage from './components/PropertyListingPage';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import AdminRoute from './components/AdminRoute';
import CreateEditProperty from './components/CreateEditProperty';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Define all your routes here */}
          <Route path="/" element={<PropertyListingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protect Admin Routes */}
          <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="/create" element={<AdminRoute element={<CreateEditProperty />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

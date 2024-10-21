// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Payment from './components/Payment';
import SignupPage from './components/SignupPage';
import PropertyDetailsPage from './components/PropertyDetailsPage';
import PropertyListingPage from './components/PropertyListingPage';
import AdminDashboard from './components/AdminDashboard';
import CreateProperty from './components/CreatePropery';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define all your routes here */}
        <Route path="/" element={<PropertyListingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create" element={<CreateProperty />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </Router>
  );
}

export default App;

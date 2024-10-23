// LoginPage.js
import React, { useContext, useState } from 'react';
import '../css/login.css';
import { axiosRequest } from '../service/axiosRequest';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');    // Error state
  const [success, setSuccess] = useState(''); // Success state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');    // Clear previous error
    setSuccess('');  // Clear previous success message

    try {
      const response = await axiosRequest("POST", '/api/auth/login', formData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        login(response);

        if (response.role === "admin") {
          setSuccess('Login successful! Redirecting to admin page...');
          setTimeout(() => navigate('/admin'), 2000); // Redirect after 2 seconds
        } else {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        }
      } else {
        setError('Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Login</button>

        {/* Error message */}
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        {/* Success message */}
        {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}

        <p>No account? <Link to='/signup' style={{ color: 'blue' }}>Create an account</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;

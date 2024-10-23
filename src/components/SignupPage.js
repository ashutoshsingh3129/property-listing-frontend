// SignupPage.js
import React, { useState } from 'react';
import '../css/signup.css';
import { axiosRequest } from '../service/axiosRequest';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages

    try {
      const res = await axiosRequest("POST", '/api/auth/signup', formData);
      if (res?.token) {
        localStorage.setItem('token', res.token);
        setSuccess('User signed up successfully! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Link to='/login' className='right primary-button'>Login</Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
        />
        <button type="submit">Sign Up</button>

        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        {success && <p className="success-message" style={{ color: 'green' }}>{success}</p>}
        
        <p>Already have an account? <Link to='/login' style={{color:'blue'}}>Login</Link></p>
      </form>
    </>
  );
};

export default SignupPage;

import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import { axiosRequest } from '../service/axiosRequest';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { user, logout ,login} = useContext(AuthContext); 

  const navigate=useNavigate()
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

    try {
      const response = await axiosRequest("POST",'/api/auth/login', formData)
        console.log("rrr",response)
        localStorage.setItem('token',response.token)
        login(response)
        if(response.role==="admin") navigate('/admin')
        else navigate('/')
      // Redirect or perform post-login actions here
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
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
         No account?<Link to='/signup' style={{color:'blue'}}>Create a account</Link>
      </form>
    </div>
  );
};

export default LoginPage;

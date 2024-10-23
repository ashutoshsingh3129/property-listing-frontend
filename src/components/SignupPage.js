// SignupPage.js
import React, { useState } from 'react';
import '../css/signup.css';
import { axiosRequest } from '../service/axiosRequest';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =axiosRequest("POST",'/api/auth/signup', formData)
     // await axios.post('/api/auth/signup', formData);
      if(res?.token){
        localStorage.setItem('token',res.token)
        navigate('/')
      }
      console.log('User signed up:', res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <> <Link to='/login' className='right primary-button'>Login</Link>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Sign Up</button>
      Already have account?<Link to='/login' style={{color:'blue'}}>Login</Link>
    </form>
    </>
  );
};

export default SignupPage;


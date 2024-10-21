// SignupPage.js
import React, { useState } from 'react';
import '../css/signup.css';
import { axiosRequest } from '../service/axiosRequest';
const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =axiosRequest("POST",'/api/auth/signup', formData)
     // await axios.post('/api/auth/signup', formData);
      if(res?.token){
        localStorage.setItem('token',res.token)
      }
      console.log('User signed up:', res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
    </form>
  );
};

export default SignupPage;


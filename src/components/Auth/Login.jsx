// src/components/Auth/Login.js


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://job-listing-portal-1-rbo7.onrender.com/api/auth/login', { email, password });
      console.log('Login successful', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Login</h2>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" id="corner1"  className="btn btn-primary">Login</button>
    </form>
  </div>
  );
};

export default Login;

// src/components/Auth/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('job-seeker');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('https://job-listing-portal-1-rbo7.onrender.com/api/auth/register', { name, email, password, confirmPassword, role });

      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Register</h2>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="job-seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  </div>
  
  );
};

export default Register;

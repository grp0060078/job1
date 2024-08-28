// src/components/JobListing/JobCreate.js

import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'

const JobCreate = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://job-listing-portal-1-rbo7.onrender.com/api/jobs', { title, company, location, salary, description }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Job created');
    } catch (err) {
      setError('Error creating job');
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="mb-4">Create Job Listing</h2>
    {error && <div className="alert alert-danger">{error}</div>}
    <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
      <div className="form-group">
        <label>Job Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Company</label>
        <input type="text" className="form-control" value={company} onChange={(e) => setCompany(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Salary</label>
        <input type="text" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Create Job</button>
    </form>
  </div>
  
  );
};

export default JobCreate;

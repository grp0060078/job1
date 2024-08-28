// src/components/Dashboard/EmployerDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'

const EmployerDashboard = () => {
  const [jobListings, setJobListings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await axios.get('https://job-listing-portal-1-rbo7.onrender.com/api/jobs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setJobListings(response.data);
      } catch (err) {
        setError('Error fetching job listings');
      }
    };

    fetchJobListings();
  }, []);

  return (
    <div className="container mt-5">
    <h2 className="mb-4">Employer Dashboard</h2>
    {error && <div className="alert alert-danger">{error}</div>}
    <h3>My Job Listings</h3>
    <ul className="list-group">
      {jobListings.length === 0 ? (
        <li className="list-group-item">No job listings found.</li>
      ) : (
        jobListings.map((job) => (
          <li className="list-group-item" key={job._id}>
            <h5>{job.title}</h5>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
          </li>
        ))
      )}
    </ul>
  </div>
  );
};

export default EmployerDashboard;

// src/components/JobListing/JobList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css'

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://job-listing-portal-1-rbo7.onrender.com/api/jobs');
        setJobs(response.data);
      } catch (err) {
        setError('Error fetching job list');
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mt-5 job-list">
    <h2 className="mb-4">Job Listings</h2>
    <div className="row">
      {jobs.length === 0 ? (
        <div className="col-12">
          <div className="alert alert-info">No job listings available.</div>
        </div>
      ) : (
        jobs.map((job) => (
          <div className="col-md-4" key={job._id}>
            <div className="job-list-item">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.salary}</p>
              <Link to={`/job-detail/${job._id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  
  );
};

export default JobList;

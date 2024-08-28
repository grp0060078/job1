// src/components/JobDetails/JobDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const JobDetails = () => {
  const { id: jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://job-listing-portal-1-rbo7.onrender.com/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (err) {
        setError('Error fetching job details');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
       <h2>Job Details</h2>
      <h2 className="mb-4">{job.title}</h2>
      <div className="mb-4">
        <strong>Company:</strong> {job.company}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {job.description}
      </div>
      <div className="mb-4">
        <strong>Location:</strong> {job.location}
      </div>
      <div className="mb-4">
        <strong>Salary:</strong> {job.salary}
      </div>
      <Link to={`/job-apply/${job._id}`} className="btn btn-primary">Apply Now</Link>
      
     
    </div>
  );
};

export default JobDetails;

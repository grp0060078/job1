import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      if (searchTerm.trim() === '') return;

      try {
        const response = await axios.get(`https://job-listing-portal-1-rbo7.onrender.com/api/jobs/search?query=${searchTerm}`, {
          params: { query: searchTerm },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('Search Response:', response.data);  // Debugging line
        setJobs(response.data);
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('No jobs found matching your search');
        } else if (err.response && err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Error fetching jobs');
        }
        setJobs([]); 
      }
    };

    fetchJobs();
  }, [searchTerm]);

  return (
    <div className="container">
      <h2>Job Search</h2>
      <input
        type="text"
        placeholder="Search for jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
            </li>
          ))
        ) : (
          !error && <p>No jobs found</p>
        )}
      </ul>
    </div>
  );
};

export default JobSearch;

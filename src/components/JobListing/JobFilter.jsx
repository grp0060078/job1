import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobFilter = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({ title: '', company: '', location: '', status: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://job-listing-portal-1-rbo7.onrender.com/api/jobs/filter', {
          params: filters,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('data fetch' ,response.data);
        setApplications(response.data);
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('No applications found matching your filters');
        } else {
          setError('Server error. Please try again later.');
        }
        setApplications([]);
      }
    };

    fetchApplications();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <h2>Job Applications</h2>
      
      <div className="filter-section">
        <input
          type="text"
          name="title"
          placeholder="Filter by Job Title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Filter by Company"
          value={filters.company}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">Filter by Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <ul>
        {applications.length > 0 ? (
          applications.map((application) => (
            <li key={application._id}>
              <h3>{application.job.title}</h3>
              <p><strong>Company:</strong> {application.job.company}</p>
              <p><strong>Location:</strong> {application.job.location}</p>
              <p><strong>Status:</strong> {application.status}</p>
              <p><strong>Applied on:</strong> {new Date(application.createdAt).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          !error && <p>No applications found</p>
        )}
      </ul>
    </div>
  );
};

export default JobFilter;

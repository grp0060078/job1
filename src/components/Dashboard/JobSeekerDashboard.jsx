import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://job-listing-portal-1-rbo7.onrender.com/api/Applications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('fetchdata',response.data)
        setApplications(response.data);
      } catch (err) {
        setError('Error fetching job listings');
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">JobSeeker Dashboard</h2>
     
      <h3>My Applications</h3>
      {applications.length === 0 ? (
        <p className="list-group-item">No applications found.</p>
      ) : (
        <ul className="list-group">
          {applications.map((app) => (
            <li className="list-group-item" key={app._id}>
              <h5>{app.title}</h5>
              <p>Resume: {app.resume}</p>
              <p>CoverLetter: {app.coverLetter}</p>
              <p>Status: {app.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobSeekerDashboard;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const JobEdit = () => {
  const { id: jobId } = useParams(); 
  const [job, setJob] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://job-listing-portal-1-rbo7.onrender.com/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (err) {
        setError('Error fetching job');
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://job-listing-portal-1-rbo7.onrender.com/api/jobs/${jobId}`, job, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Job updated');
    } catch (err) {
      setError('Error updating job');
    }
  };

  return (
    <div className="container mt-5 job-edit">
      <h3>Edit Job Listing</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="form-group">
          <label>Job Title</label>
          <input type="text" className="form-control" value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input type="text" className="form-control" value={job.company} onChange={(e) => setJob({ ...job, company: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" className="form-control" value={job.location} onChange={(e) => setJob({ ...job, location: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Salary</label>
          <input type="text" className="form-control" value={job.salary} onChange={(e) => setJob({ ...job, salary: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Job</button>
      </form>
    </div>
  );
};

export default JobEdit;

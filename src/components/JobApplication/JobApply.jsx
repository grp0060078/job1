// src/components/JobApplication/JobApply.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../App.css';

const JobApply = () => {
  const { id: jobId } = useParams();
  
  const [title, setTitle] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleApply = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('coverLetter', coverLetter);
    if (resume) formData.append('resume', resume[0]);
  
    try {
      const response = await axios.post(`https://job-listing-portal-1-rbo7.onrender.com/api/jobs/${jobId}/apply`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data.message); 
      navigate('/'); 
    } catch (err) {
      setError(`Error applying for job: ${err.response ? err.response.data.error : err.message}`);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Apply for Job</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleApply} className="bg-light p-4 rounded shadow-sm">
        <div className="form-group">
          <label>Title</label>
          <textarea
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cover Letter</label>
          <textarea
            className="form-control"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Resume (PDF)</label>
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => setResume(e.target.files)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Apply</button>
      </form>
    </div>
  );
};

export default JobApply;

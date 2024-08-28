import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'; 

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://job-listing-portal-1-rbo7.onrender.com/api/profiles/job-seeker', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('fetching data', response.data)
        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (err) {
        setError('Error fetching profile');
      }
    };
  
    fetchProfile();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://job-listing-portal-1-rbo7.onrender.com/api/profiles/job-seeker', updatedProfile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError('Error updating profile');
    }
  };

  return (
    <div className="container profile-container">
      <h2>Job Seeker Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={updatedProfile.name || ''}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={updatedProfile.email || ''}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, email: e.target.value })}
            />
          </div>
       
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
       
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default JobSeekerProfile;

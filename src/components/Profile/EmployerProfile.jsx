import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'; 

const EmployerProfile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://job-listing-portal-1-rbo7.onrender.com/api/profile/employer', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
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
      await axios.put('https://job-listing-portal-1-rbo7.onrender.com/api/profile/employer', updatedProfile, {
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
    <div className="container mt-5 profile-container">
      <h2 className="mb-4">Employer Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              className="form-control"
              value={updatedProfile.companyName || ''}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, companyName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              className="form-control"
              value={updatedProfile.contactEmail || ''}
              onChange={(e) => setUpdatedProfile({ ...updatedProfile, contactEmail: e.target.value })}
            />
          </div>
        
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Company Name:</strong> {profile.companyName}</p>
          <p><strong>Contact Email:</strong> {profile.contactEmail}</p>
         
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;

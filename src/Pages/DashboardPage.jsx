// src/pages/DashboardPage.js
import React, { useState } from 'react';
import JobSeekerDashboard from '../Pages/DashboardPage';
import EmployerDashboard from '../Pages/DashboardPage';
import '../App.css';

const DashboardPage = () => {
  const [activeDashboard, setActiveDashboard] = useState('jobSeeker');

  const renderDashboard = () => {
    if (activeDashboard === 'jobSeeker') {
      return <JobSeekerDashboard />;
    } else if (activeDashboard === 'employer') {
      return <EmployerDashboard />;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <div className="btn-group mb-4" role="group">
        <button
          type="button"
          className={`btn ${activeDashboard === 'jobSeeker' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveDashboard('jobSeeker')}
        >
          Job Seeker Dashboard
        </button>
        <button
          type="button"
          className={`btn ${activeDashboard === 'employer' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveDashboard('employer')}
        >
          Employer Dashboard
        </button>
      </div>
      {renderDashboard()}
    </div>
  );
};

export default DashboardPage;

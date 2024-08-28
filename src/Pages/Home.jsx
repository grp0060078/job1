// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'


const Home = () => {
  return (
    <div id="hh" className="container home">
    
      <h1>Welcome to the Job Portal</h1>
      <p>Your gateway to finding the perfect job or hiring the best talent.</p>
      <div className="home-links">
        <Link to="/job-search" className="btn btn-primary">Search Jobs</Link>
        <Link to="/login" className="btn btn-secondary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
        <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Job Portal. All rights reserved.</p>
          
        </div>
      </footer>
    </div>
  );
};

export default Home;

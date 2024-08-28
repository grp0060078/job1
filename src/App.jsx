// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import JobList from './components/JobListing/JobList';
import JobDetail from './components/JobListing/JobDetail';
import JobCreate from './components/JobListing/JobCreate';
import JobEdit from './components/JobListing/JobEdit';
import JobSearch from './components/JobSearch/JobSearch';
import JobApply from './components/JobApplication/JobApply';
import JobSeekerProfile from './components/Profile/JobSeekerProfile';
import EmployerProfile from './components/Profile/EmployerProfile';
import DashboardPage from './Pages/DashboardPage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import JobSeekerDashboard from './components/Dashboard/JobSeekerDashboard';
import EmployerDashboard from './components/Dashboard/EmployerDashboard';
import  Navbar  from './Navbar'

import 'bootstrap/dist/css/bootstrap.min.css';

import JobFilter from './components/JobListing/JobFilter';


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/applications" element={<JobFilter />} />
          <Route path="/job-list" element={<JobList />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/job-create" element={<JobCreate />} />
          <Route path="/job-edit/:id" element={<JobEdit />} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/job-apply/:id" element={<JobApply />} />
          <Route path="/profile/job-seeker" element={<JobSeekerProfile />} />
          <Route path="/profile/employer" element={<EmployerProfile />} />
          <Route path="/dashboard/job-seeker" element={<JobSeekerDashboard />} />
          <Route path="/dashboard/employer" element={<EmployerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

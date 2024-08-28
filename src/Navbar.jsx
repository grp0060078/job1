// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import './App.css'

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Job Portal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link as={Link} to="/about" className="nav-link">About</Nav.Link>
        <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
          <Nav.Link as={Link} to="/job-list" className="nav-link">Jobs</Nav.Link>
          <Nav.Link as={Link} to="/job-search" className="nav-link">Search</Nav.Link>
          <Nav.Link as={Link} to="/job-create" className="nav-link">Create Job</Nav.Link>
          <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
          <Nav.Link as={Link} to="/register" className="nav-link">Register</Nav.Link>
          <Nav.Link as={Link} to="/dashboard" className="nav-link">Dashboard</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;



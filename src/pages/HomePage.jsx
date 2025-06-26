// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Smart Study Scheduler</h1>

      {/* Dashboard Component */}
      <Dashboard />

      {/* Navigation Links */}
      <nav>
        <ul>
          <li><Link to="/study-calendar">Study Calendar</Link></li>
          <li><Link to="/progress-tracker">Progress Tracker</Link></li>
          <li><Link to="/login-component">Login</Link></li>
          <li><Link to="/register-component">Register</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;

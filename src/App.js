import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Payments from './pages/Payments';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import './App.css'; // Importing your custom app.css for additional styling

export default function App() {
  return (
    <Router>
      <div className="container py-4">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#100901' }}>
          <Link className="navbar-brand text-warning fw-bold" to="/">
            Gym Manager
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/customers">Customers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/payments">Payments</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </div>
    </Router>
  );
}

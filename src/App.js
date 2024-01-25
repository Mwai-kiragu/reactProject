import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';
import Userdetails from './components/Userdetails';
import Albumdetails from './components/Albumdetails';
import Photodetails from './components/Photodetails';
import Albums from './components/Albums';
import Photos from './components/Photos';

const App = () => {
  const user = {
    email: 'user@gmail.com',
  };

  const handleSignOut = () => {
    console.log('User signed out');
  };

  return (
    <Router>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
          </div>

          <div className='col-md-8'>
            <div className="navbar" id="navbarNav">
              <ul className="list">
                <li>
                <NavLink
                  to="/"
                  style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', textDecoration: 'underline' }}
                  activestyle={{ fontWeight: 'bold', textDecoration: 'underline' }}
                >
                  Users
                </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/albums"
                    style={{ textDecoration: 'none', color: 'black' }}
                    activestyle={{ fontWeight: 'bold', textDecoration: 'underline' }}
                  >
                    Album
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/photos"
                    style={{ textDecoration: 'none', color: 'black' }}
                    activestyle={{ fontWeight: 'bold', textDecoration: 'underline' }}
                  >
                    Photo
                  </NavLink>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                <span className="m-2">{user.email}</span>
                <button className="btn btn-outline-danger" onClick={handleSignOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className='col-md-2'>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/users/:userId" element={<Userdetails />} />
        <Route path="/albums/:albumId" element={<Albumdetails />} />
        <Route path="/photos/:photoId" element={<Photodetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/photos" element={<Photos />} />
        {/* Add routes for other components as needed */}
      </Routes>
    </Router>
  );
};

export default App;

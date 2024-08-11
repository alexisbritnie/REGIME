import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './BottomNavigationBar.css'; // CSS file

const BottomNavigationBar = () => {
  return (
    <div className="bottom-nav">
      <Link to="/" exact className="nav-link" activeClassName="active">Home</Link>

      <Link to="/CharacterProfile" className="nav-link" activeClassName="active">Profile</Link>
  

      {/* Add additional navigation links as needed */}

      
    </div>
  );
};

export default BottomNavigationBar;
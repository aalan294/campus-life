import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav>
      <div className="logo">
        <img src="assets/logos/logo1.webp" alt="SRM Logo" />
      </div>
      <ul>
        <li>
          
          <Link 
            to="/" 
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            onClick={(e) => handleNavigation(e, 'about')}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/events" 
            // onClick={(e) => handleNavigation(e, 'events')}
          >
            Events
          </Link>
        </li>
        <li>
          <Link 
            to="/faculty" 
            onClick={(e) => handleNavigation(e, 'faculty')}
          >
            Faculty
          </Link>
        </li>
        <li>
          <Link 
            to="/team" 
            onClick={(e) => handleNavigation(e, 'team')}
          >
            Team
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
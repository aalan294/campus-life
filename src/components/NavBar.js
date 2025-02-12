import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 4rem;
`;

const Logo = styled.div`
  img {
    height: 50px;
    width: auto;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background-color: #000000;
    padding: 1rem;
    text-align: center;
  }
`;

const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #4a90e2;
    }

    &.active {
      color: #4a90e2;
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <NavbarContainer>
      <Logo>
        <img src="https://i.ibb.co/S7B2Zpqv/camp.png" alt="SRM Logo" />
      </Logo>
      
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </HamburgerButton>

      <NavLinks isOpen={isOpen}>
        <NavItem>
          <Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link 
            to="/about" 
            className={isActive('/about')}
            onClick={(e) => handleNavigation(e, 'about')}
          >
            About
          </Link>
        </NavItem>
        <NavItem>
          <Link 
            to="/events" 
            className={isActive('/events')}
          >
            Events
          </Link>
        </NavItem>
        <NavItem>
          <Link 
            to="/faculty" 
            className={isActive('/faculty')}
            onClick={(e) => handleNavigation(e, 'faculty')}
          >
            Faculty
          </Link>
        </NavItem>
        <NavItem>
        <Link 
            to="/teams" 
            className={isActive('/team')}
          >
            Team
          </Link>
        </NavItem>
        <NavItem>
          <Link 
            to="/" 
            className={isActive('/')}
          >
          </Link>
        </NavItem>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
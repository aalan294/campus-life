import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import styled from 'styled-components';
import Navbar from './components/NavBar.js';
import Home from './pages/home';
import WebTeam from './pages/webteam.js';
import Footer from './components/Footer';
import EventsPage from './pages/events';
import './style.css';
import api from './API/api.js';

// Styled Components for Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -16px;
  right: -16px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
  }
`;

const AdImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 16px;
`;

const LoadingText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff5733;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 16px;

  &:hover {
    background-color: #e04b2a;
  }
`;

// AdModal Component
const AdModal = ({ isOpen, onClose, imageUrl, isLoading }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        {isLoading ? (
          <LoadingText>Loading image...</LoadingText>
        ) : imageUrl ? (
          <>
            <AdImage
              src={`https://campus-life-server.onrender.com/${imageUrl}`}
              alt="Advertisement"
            />
            <RegisterButton onClick={onClose} to="/events">
              Register
            </RegisterButton>
          </>
        ) : (
          <LoadingText>Failed to load image</LoadingText>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

const App = () => {
  const [showAd, setShowAd] = useState(true);
  const [adImageUrl, setAdImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchLatestPoster = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/posters');
      console.log(response);
      setAdImageUrl(response.data[0].image);
    } catch (error) {
      console.error('Error fetching posters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestPoster();
  }, []);

  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
    <Router>
      <div>
        <AdModal
          isOpen={showAd}
          onClose={handleCloseAd}
          imageUrl={adImageUrl}
          isLoading={isLoading}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<WebTeam />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

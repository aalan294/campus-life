import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { X } from 'lucide-react';
import styled from 'styled-components';
import Navbar from './components/NavBar.js';
import Home from './pages/home';
import WebTeam from './pages/webteam.js';
import Footer from './components/Footer';
import EventsPage from './pages/events';
import RegisterPage from './pages/registerpage';
import './style.css';
import api from './API/api.js'


// Styled Components
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
  width: 80%;
  max-width: 800px;
  aspect-ratio: 1;
  background: white;
  border-radius: 8px;
  padding: 16px;
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
  height: 100%;
  object-fit: contain;
`;

const LoadingText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
          <AdImage src={`http://localhost:3500/${imageUrl}`} alt="Advertisement" />
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


  useEffect(() => {
    const fetchLatestPoster = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/posters');
        console.log(response)
        setAdImageUrl(response.data[0].image)
      } catch (error) {
        console.error('Error fetching posters:', error);
      } finally {
        setIsLoading(false);
      }
    };

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
          <Route path="/webteam" element={<WebTeam />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/register/:slug/:sheet" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
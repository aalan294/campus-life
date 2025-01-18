import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import HomeSection from '../components/HomeSection.js';
import AboutSection from '../components/AboutSection.js';
import EventsSection from '../components/EventsSection.js';
import FacultySection from '../components/FacultySection.js';

import '../style.css';
import Marque from '../components/Marque.js';
import api from '../API/api.js'
import FacultySection2 from '../components/FacultySection2.js';

// Styled Components for the button
const JoinButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  margin-bottom: 30px;
`;

const JoinButton = styled.a`
  padding: 16px 32px;
  background-color: #FFD700;  // Yellow color
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;  // Remove underline
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.7), 0 0 30px rgba(255, 215, 0, 1);  // Gold glowing effect
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5), 0 0 10px rgba(255, 215, 0, 0.7), 0 0 15px rgba(255, 215, 0, 1);  // Text glowing effect
  transition: background-color 0.3s, box-shadow 0.3s, text-shadow 0.3s;

  &:hover {
    background-color: #FFA500;  // Darker yellow when hovered
    box-shadow: 0 0 15px rgba(255, 165, 0, 0.7), 0 0 30px rgba(255, 165, 0, 1), 0 0 45px rgba(255, 165, 0, 1.2);  // Stronger gold glow on hover
    text-shadow: 0 0 10px rgba(255, 165, 0, 0.7), 0 0 20px rgba(255, 165, 0, 1), 0 0 30px rgba(255, 165, 0, 1.2);  // Stronger glow on text
  }

  &:active {
    background-color: #FF8C00;  // Even darker yellow on click
    box-shadow: 0 0 20px rgba(255, 140, 0, 0.9), 0 0 40px rgba(255, 140, 0, 1), 0 0 60px rgba(255, 140, 0, 1.3);  // Stronger gold shine on click
    text-shadow: 0 0 15px rgba(255, 140, 0, 0.9), 0 0 30px rgba(255, 140, 0, 1), 0 0 45px rgba(255, 140, 0, 1.3);  // Stronger text glow on click
  }
`;

const Home = () => {
  const [recruitment,setRecruitment] = useState('');
  useEffect(()=>{
    const fetchRecruitments = async () => {
      try {
        const response = await api.get('/recruitments');
        setRecruitment(response.data[0].url);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecruitments();
  },[])
  return (
    <div>
      <HomeSection />
      <Marque />
      <AboutSection />
      <EventsSection />
      <FacultySection />
      <FacultySection2/>
      
      {/* Container to center the button */}
      <JoinButtonContainer>
        <JoinButton href={recruitment} target="_blank">
          Join CampusLife
        </JoinButton>
      </JoinButtonContainer>
    </div>
  );
};

export default Home;

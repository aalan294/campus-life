import React from 'react';
import logo from '../assets/logos/clogo.png'
import Marque from './Marque';
import styled from 'styled-components';

const HomeSection = () => {
  return (
    <section id="home">
      <div className="hero">
        <div className="hero-background"></div>
        <div className="hanging-gallery">
          {[1, 14, 9, 8, 14].map((eventId, index) => (
            <div className="hanging-image" key={index}>
              <div className="rope"></div>
              <div className="frame">
                <img src={`./assets/events/${eventId}.JPG`} alt="Event" />
              </div>
            </div>
          ))}
        </div>
        <div className="hero-content">
          <div className="title-container">
            <StyledHeading>Welcome to <span className="highlight">Campus Life</span></StyledHeading>
            <h2>SRMIST (E&T) Ramapuram</h2>
          </div>
          <div className="hero-logo-container">
            <img src={logo} alt="SRM Logo" className="hero-logo" />
          </div>
          <div className="quote-container">
            <p className="quote">"The Heart of Campus"</p>
            <p className="quote-subtitle">Where Moments Become Memories, and Dreams Take Flight</p>
          </div>
          <div>
            <Marque />
          </div>
        </div>
      </div>
    </section>
  );
};

const StyledHeading = styled.h1`
  /* Desktop view */
  @media (min-width: 1024px) {
    margin-top: 5rem;
  }
`;

export default HomeSection;

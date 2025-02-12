import React from 'react';
import logo from '../assets/logos/logo.png'
import Marque from './Marque';
import styled from 'styled-components';

const HomeSection = () => {
  return (
    <section id="home">
      <div className="hero" style={{paddingTop:0}}>
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
            <StyledHeading>SRMIST (E&T) Ramapuram</StyledHeading>
            <StyleH2>Welcome to <span className="highlight">Campus Life</span></StyleH2>
          </div>
          <div className="hero-logo-container">
            <StyleLogo src={logo} alt="SRM Logo" className="hero-logo" />
          </div>
          <StyleQuote  className="quote-container">
            <p className="quote">"The Heart of Campus"</p>
            <p className="quote-subtitle">Where Moments Become Memories, and Dreams Take Flight</p>
          </StyleQuote>
          <div>
            <Marque />
          </div>
        </div>
      </div>
    </section>
  );
};

const StyleLogo = styled.img`
  border-radius: 20px;
`
// const StyleLogo = styled.img`
//   filter: drop-shadow( 4px 4px 10px rgba(234, 233, 233, 0.8)); 
//     border-radius: 8px;`

const StyledHeading = styled.h1`
  /* Desktop view */
  /* @media (min-width: 1024px) {
    margin-top: 5rem;
  } */
   margin-top:6rem;
   margin-bottom: 0;
`;
const StyleH2 = styled.h2`
   margin: 0;
`;

const StyleQuote = styled.div`
.quote-subtitle{
  margin-bottom:0;
}
`

export default HomeSection;

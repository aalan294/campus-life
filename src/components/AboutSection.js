import React from 'react';
import im from '../assets/events/rmp.jpeg'

const AboutSection = () => {
  return (
    <section id="about">
      <h2 style={{marginBottom:"2rem"}} >About Campus Life</h2>
      <div className="about-content">
        <div className="about-text">
         <p>Campus Life at SRM Ramapuram E&T is the heart of cultural activities, driven by passionate students and faculty. We organize festivals, workshops, and talent showcases, fostering creativity, collaboration, and inclusivity. From celebrating diversity to inspiring innovation, our events bring the community together. With every initiative, we aim to create cherished memories and meaningful connections.</p>
        </div>
        <div className="about-image">
          <img src={im} alt="Campus Life Event" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
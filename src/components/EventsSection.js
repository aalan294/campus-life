import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../API/api';

const StyledSection = styled.section`
  background: #000;
  width: 100%;
  height: 70vh;
  position: relative;

  @media (max-width: 768px) {
    min-height: auto;
    height: auto;
    display: block;
    position: relative;
  }
`;

const Title = styled.h2`
  color: #ffff00;
  text-align: center;
  font-size: 2.5rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin: 0.5rem 0;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vw * 0.75); /* Creates a 4:3 aspect ratio based on screen width */
    max-height: 70vh; /* Prevents it from being too tall on taller phones */
  }
`;

const CarouselInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  position: relative;
  height: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* Removes any potential image spacing */

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const SlideTitle = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.3rem;
    bottom: 2rem;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 2;
  ${props => props.$position === 'left' ? 'left: 0;' : 'right: 0;'}

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
`;

const IndicatorsContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 2;

  @media (max-width: 768px) {
    bottom: 0.3rem;
    gap: 0.3rem;
  }
`;

const IndicatorDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;

// Component logic remains the same
const EventsSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await api.get('/events/slide');
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <StyledSection>
        <Title>Our Events</Title>
        <div>Loading...</div>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <Title>Our Events</Title>
      <CarouselContainer>
        <CarouselInner style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <Slide
              key={slide.id}
              $active={index === currentSlide}
            >
              <SlideImage
                src={`https://campus-life-server.onrender.com/${slide.image}`}
                alt={slide.eventName}
              />
              <SlideTitle>{slide.eventName}</SlideTitle>
            </Slide>
          ))}
        </CarouselInner>

        <CarouselButton
          $position="left"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ←
        </CarouselButton>

        <CarouselButton
          $position="right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          →
        </CarouselButton>

        <IndicatorsContainer>
          {slides.map((_, index) => (
            <IndicatorDot
              key={index}
              $active={index === currentSlide}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </IndicatorsContainer>
      </CarouselContainer>
    </StyledSection>
  );
};

export default EventsSection;

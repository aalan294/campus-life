import React, { useEffect, useState } from 'react';
import api from '../API/api'

const EventsSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);



  // Fetch slides from Firestore and convert CID to signed URL
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

  // Auto-advance slides
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
      <section id="events">
        <h2>Our Events</h2>
        <div>Loading...</div>
      </section>
    );
  }

  return (
    <section id="events">
      <h2>Our Events</h2>
      <div className="carousel relative">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            >
              <img 
                src={`https://campus-life-server.onrender.com/${slide.image}`} 
                alt={slide.eventName}
                className="w-full h-auto"
              />
              <div className="carousel-title-overlay">
                {slide.eventName}
              </div>
            </div>
          ))}
        </div>
        <button 
          className="carousel-control prev" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          className="carousel-control next" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

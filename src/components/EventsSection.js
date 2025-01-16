import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { pinata } from '../config';
import { db } from '../firebase/config';

const EventsSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to fetch the signed URL from Pinata
  const getSignedUrl = async (cid) => {
    try {
      const signedUrl = await pinata.gateways.createSignedURL({
        cid: cid,
        expires: 600, // Set expiration time (in seconds)
      });
      return signedUrl;
    } catch (err) {
      console.error('Error fetching signed URL:', err);
      return ''; // Return empty if error occurs
    }
  };

  // Fetch slides from Firestore and convert CID to signed URL
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const slidesRef = collection(db, 'homepageSlides');
        const q = query(slidesRef, orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);

        const fetchedSlides = querySnapshot.docs.map(async (doc) => {
          const slideData = doc.data();
          const imageUrl = await getSignedUrl(slideData.imageUrl); // Assuming 'cid' is the field name

          return {
            id: doc.id,
            ...slideData,
            imageUrl, // Add resolved image URL to the slide data
          };
        });

        // Resolve all promises to get final slides array with image URLs
        const finalSlides = await Promise.all(fetchedSlides);
        setSlides(finalSlides);
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
                src={slide.imageUrl} 
                alt={slide.title}
                className="w-full h-auto"
              />
              <div className="carousel-title-overlay">
                {slide.title}
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

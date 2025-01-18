import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import api from '../API/api'


const Marque = () => {
  const [images,setImages] = useState([]);

  useEffect(()=>{
    const fetchSlides = async () => {
      try {
        const response = await api.get('/hero');
        setImages(response.data); // Set the slides data
      } catch (err) {
        console.error('Error fetching slides:', err);
      }
    };
    fetchSlides();
  },[])
  return (
    <Marquee speed={100} direction="right" autoFill="true">
      <div className="marquee">
        { images && images.map((img) => {
          return (
            <img
              key={img._id}
              src={`http://localhost:3500/${img.image}`}
              style={{
                width: "200px",
                height: "100px",
                margin: 30,
                marginBottom: 70,
                objectFit: "cover",
              }}
            />
          );
        })}
      </div>
    </Marquee>
  );
};

export default Marque;

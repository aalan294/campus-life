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
    <Marquee speed={20} direction="right" autoFill="true">
      <div className="marquee">
        { images && images.map((img) => {
          return (
            <img
              key={img._id}
              src={`https://campus-life-server.onrender.com/${img.image}`}
              style={{
                width: "250px",
                height: "150px",
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

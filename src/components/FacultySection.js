import React, { useEffect } from 'react';
import vp from '../assets/faculties/vp1.jpg'
import cochairman from '../assets/faculties/co-chairman1.jpg'

const facultyData = [
  
  {
    name: "Dr. R. Shivakumar",
    position: "Chairman",
    image: "assets/faculties/chairman.jpg",
    details: "Chairman\nSRM Group of Institutions\nRamapuram & Trichy"
},
{
    name: "Mr. S. Niranjan",
    position: "Co-Chairman",
    image: cochairman,
    details: "Co-Chairman\nSRM Group of Institutions\nRamapuram & Trichy"
},
{
    name: "Dr. M. Sakthi Ganesh",
    position: "Dean E&T",
    image: "assets/faculties/dean.jpg",
    details: "Dean of Engineering & Technology"
},
{
  name: "Dr. Balika J Chelliah",
  position: "Vice Principal",
  image: vp,
  details: "Vice Principal (Admin)"
}
];

const FacultySection = () => {
  useEffect(() => {
    const facultyGrid = document.querySelector('.dict');
    facultyGrid.innerHTML = '';

    facultyData.forEach((faculty) => {
      const card = document.createElement('div');
      card.className = 'dic person-card';
      
      card.innerHTML = `
        <img src="${faculty.image}" alt="${faculty.name}">
        <div class="person-info">
          <h3>${faculty.name}</h3>
          <h4>${faculty.position}</h4>
          <p>${faculty.details.replace(/\n/g, '<br>')}</p>
        </div>
      `;
      facultyGrid.appendChild(card);
    });
  }, []);

  return (
    <section id="faculty">
      <h2>Our Dignitaries</h2>
      <div className="faculty-grid dict"></div>
    </section>
  );
};

export default FacultySection;
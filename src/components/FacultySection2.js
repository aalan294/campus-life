import React, { useEffect } from 'react';
import vp from '../assets/faculties/vp.jpg'
import fc from '../assets/faculties/fc.jpg'
import styled from 'styled-components';

const facultyData = [
  {
    name: "Dr. Visnu Dharshini",
    position: "Campus Life Overall Coordinator",
    image: fc,
    details: "Department of Computer Science and Engineering"
},
{
    name: "Dr. Monika",
    position: "Campus Life Overall Coordinator",
    image: "assets/faculties/fc2.jpg",
    details: "Department of Biotechnology"
}
  // Add more faculty members...
];

const FacultySection2 = () => {
  useEffect(() => {
    const facultyGrid = document.querySelector('.fact');
    facultyGrid.innerHTML = '';

    facultyData.forEach((faculty) => {
      const card = document.createElement('div');
      card.className = 'person-card fac';
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
      <h2>Our Faculty</h2>
      <StyledDiv className="fact"></StyledDiv>
    </section>
  );
};

const StyledDiv = styled.div`
  width: 100vw;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  .fac{
    width: 300px;
    height: 450px;
    .person-info{
      background-color: inherit;
    }
  }

`

export default FacultySection2;

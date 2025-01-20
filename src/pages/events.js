import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/api';
import styled from 'styled-components';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to check if event is upcoming or past based on today's date
  const isEventUpcoming = (eventDate) => {
    const today = new Date();
    const [day, month, year] = eventDate.split('/');
    const eventDateObj = new Date(`${year}-${month}-${day}`);
    return eventDateObj >= today;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        if (response.status === 200) {
          setEvents(response.data.events);
        }
      } catch (err) {
        setError('Error fetching events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <LoadingText>Loading events...</LoadingText>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  // Separate upcoming and past events
  const upcomingEvents = events.filter((event) => isEventUpcoming(event.eventDate));
  const pastEvents = events.filter((event) => !isEventUpcoming(event.eventDate));

  return (
    <Container>
      <Section>
        <SectionHeader>Upcoming Events</SectionHeader>
        <EventGrid>
          {upcomingEvents.map((event) => (
            <EventCard key={event._id}>
              {event.imageUrl && (
                <EventImage>
                  <img src={`https://campus-life-server.onrender.com/${event.imageUrl}`} alt={event.title} />
                </EventImage>
              )}
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                <EventDescription>{event.description}</EventDescription>
                <EventDetails>
                  <EventDetail>
                    <span>Date:</span> {new Date(event.eventDate).toLocaleDateString()}
                  </EventDetail>
                  <EventDetail>
                    <span>Fee:</span> ₹{event.fee}
                  </EventDetail>
                </EventDetails>
                <RegisterButton>
                  <a href={event.formLink}>Register Now</a>
                </RegisterButton>
                {event.maxParticipants && (
                  <RegistrationInfo>
                    Max participants: <span>{event.maxParticipants}</span>
                  </RegistrationInfo>
                )}
              </EventContent>
            </EventCard>
          ))}
        </EventGrid>
      </Section>

      <Section>
        <SectionHeader>Past Events</SectionHeader>
        <EventGrid>
          {pastEvents.map((event) => (
            <EventCard key={event._id}>
              {event.imageUrl && (
                <EventImage>
                  <img src={`https://campus-life-server.onrender.com/${event.imageUrl}`} alt={event.title} />
                </EventImage>
              )}
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                <EventDescription>{event.description}</EventDescription>
                <EventDetails>
                  <EventDetail>
                    <span>Date:</span> {new Date(event.eventDate).toLocaleDateString()}
                  </EventDetail>
                  <EventDetail>
                    <span>Fee:</span> ₹{event.fee}
                  </EventDetail>
                </EventDetails>
                <DisabledButton>Event Ended</DisabledButton>
                {event.maxParticipants && (
                  <RegistrationInfo>
                    Max participants: <span>{event.maxParticipants}</span>
                  </RegistrationInfo>
                )}
              </EventContent>
            </EventCard>
          ))}
        </EventGrid>
      </Section>
    </Container>
  );
}

// Styled Components

const Container = styled.div`
  background-color: #111;
  color: #fff;
  padding: 40px 20px;
`;

const Section = styled.div`
margin-top: 3rem;
  margin-bottom: 40px;
`;

const SectionHeader = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffd700;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));  /* Making cards square shaped */
  gap: 20px;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Display two cards per row on mobile */
  }
`;

const EventCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  width: 100%;
  height: 350px;  /* Making the card square-shaped */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const EventImage = styled.div`
  height: 150px;
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EventContent = styled.div`
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EventTitle = styled.h2`
  font-size: 1.1rem;  /* Decreased font size */
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 8px;
`;

const EventDescription = styled.p`
  color: #ddd;
  font-size: 0.9rem;  /* Decreased font size */
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const EventDetails = styled.div`
  font-size: 0.8rem;  /* Decreased font size */
  margin-bottom: 15px;
`;

const EventDetail = styled.div`
  span {
    font-weight: bold;
  }
`;

const RegisterButton = styled.button`
  background-color: #ffd700;
  color: #111;
  padding: 10px 18px;
  font-size: 0.9rem;  /* Decreased font size */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  a {
    color: #111;
    text-decoration: none;
  }

  &:hover {
    background-color: #ffbf00;
  }
`;

const DisabledButton = styled.button`
  background-color: #666;
  color: #fff;
  padding: 10px 18px;
  font-size: 0.9rem;  /* Decreased font size */
  border: none;
  border-radius: 5px;
  cursor: not-allowed;
  width: 100%;
`;

const RegistrationInfo = styled.div`
  font-size: 0.8rem;  /* Decreased font size */
  color: #ddd;
  margin-top: 10px;
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 1.2rem;  /* Decreased font size */
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 1.2rem;  /* Decreased font size */
  text-align: center;
  margin-top: 20px;
`;

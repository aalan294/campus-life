import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/api';
import '../style.css';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        if (response.status === 200) {
          setEvents(response.data.events);
        }
        console.log(response.data.events);
      } catch (err) {
        setError('Error fetching events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once the fetch operation is complete
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Upcoming Events</h1>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            {event.imageUrl && (
              <div className="event-image">
                <img src={`https://campus-life-server.onrender.com/${event.imageUrl}`} alt={event.title} />
              </div>
            )}
            <div className="event-content">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>

              <div className="event-details">
                <div className="event-detail">
                  <span>Date:</span> {new Date(event.eventDate).toLocaleDateString()}
                </div>
                <div className="event-detail">
                  <span>Fee:</span> ₹{event.fee}
                </div>
              </div>

              <button className="register-button">
                <a href={event.formLink}>Register Now</a>
              </button>

              <div className="registration-info">
                {event.maxParticipants && (
                  <div>
                    Max participants: <span>{event.maxParticipants}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

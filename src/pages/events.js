import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { pinata } from '../config';
import '../style.css';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(
          eventsRef,
          where('status', '==', 'upcoming')
        );

        const querySnapshot = await getDocs(q);

        // Debugging log
        console.log('Fetched events:', querySnapshot.docs.map((doc) => doc.data()));

        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate?.toDate ? doc.data().startDate.toDate() : null,
          endDate: doc.data().endDate?.toDate ? doc.data().endDate.toDate() : null,
          registrationDeadline: doc.data().registrationDeadline?.toDate
            ? doc.data().registrationDeadline.toDate()
            : null,
        }));

        // Generate signed URLs for images (if imageUrl contains a CID)
        const eventsWithSignedUrls = await Promise.all(eventsList.map(async (event) => {
          if (event.imageUrl) {
            const signedUrl = await getSignedUrl(event.imageUrl); // Assuming imageUrl is the CID
            return {
              ...event,
              imageUrl: signedUrl,
            };
          }
          return event;
        }));

        setEvents(eventsWithSignedUrls);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getSignedUrl = async (cid) => {
    try {
      const signedUrl = await pinata.gateways.createSignedURL({
        cid: cid,
        expires: 60,
      });
      return signedUrl;
    } catch (err) {
      console.error('Error fetching signed URL:', err);
      return '';
    }
  };

  const handleRegister = (slug, sheet) => {
    navigate(`/register/${slug}/${sheet}`);
  };

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
          <div key={event.id} className="event-card">
            {event.imageUrl && (
              <div className="event-image">
                <img src={event.imageUrl} alt={event.title} />
              </div>
            )}
            <div className="event-content">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>

              <div className="event-details">
                <div className="event-detail">
                  <span>Date:</span> {new Date(event.startDate).toLocaleDateString()}
                </div>
                <div className="event-detail">
                  <span>Time:</span> {new Date(event.startDate).toLocaleTimeString()}
                </div>
                <div className="event-detail">
                  <span>Venue:</span> {event.venue}
                </div>
                <div className="event-detail">
                  <span>Fee:</span> ₹{event.fee}
                </div>
              </div>

              <button
                className="register-button"
                onClick={() => handleRegister(event.slug, event.sheet)}
              >
                Register Now
              </button>

              <div className="registration-info">
                <div>
                  {event.registrationRequired ? (
                    <>
                      Registration closes on{' '}
                      <span>
                        {new Date(event.registrationDeadline).toLocaleDateString()}
                      </span>
                    </>
                  ) : (
                    'No registration required'
                  )}
                </div>
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

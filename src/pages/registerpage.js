import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import axios from 'axios'; // Import Axios



export default function RegistrationPage() {
  const { slug, sheet } = useParams();
  const [eventName, setEventName] = useState('');
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    registrationNumber: '',
    department: '',
    phoneNumber: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where('slug', '==', slug));
        const querySnapshot = await getDocs(q);


        if (!querySnapshot.empty) {
          const eventData = querySnapshot.docs[0].data();
          setEventName(eventData.title);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };


    fetchEventDetails();
  }, [slug]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const sendEmail = async () => {
    try {
      const emailData = {
        sender: { name: eventName, email: 'arbaazsms04@gmail.com' },
        to: [{ email: formData.email, name: formData.studentName }],
        subject: `Registration Confirmation for ${eventName}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #4CAF50;">Thank you for registering for ${eventName}!</h2>
            <p>We are excited to have you at our event. Here are your registration details:</p>
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${formData.studentName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${formData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Registration Number:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${formData.registrationNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Department:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${formData.department}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone Number:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${formData.phoneNumber}</td>
              </tr>
            </table>
            <p>We look forward to seeing you there!</p>
          </div>
        `,
      };


      const response = await axios.post('https://api.sendinblue.com/v3/smtp/email', emailData, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': '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',
        },
      });


      if (response.status === 201) {
        console.log('Email sent successfully:', response.data);
        return true;
      }
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('loading');


    try {
      const response = await fetch(
        `https://script.google.com/macros/s/${sheet}/exec`,
        {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
            eventName,
            registrationDate: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        // Save registration to Firestore
        await addDoc(collection(db, 'registrations'), {
          ...formData,
          eventName,
          registrationDate: new Date(),
        });


        // Send email
        const emailSent = await sendEmail();


        if (emailSent) {
          setStatus('success');
          setFormData({
            studentName: '',
            email: '',
            registrationNumber: '',
            department: '',
            phoneNumber: '',
          });
        } else {
          setStatus('partial');
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!eventName) {
    return <div>Loading event details...</div>;
  }


  return (
    <div className="registration-container">
      <div className="registration-header">
        <h1>{eventName} Registration</h1>
        <p>Please fill in your details to register</p>
      </div>


      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>


        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Complete Registration'}
        </button>
      </form>


      {status && (
        <div className={`status-message ${status}`}>
          {status === 'loading' && <span>Submitting registration...</span>}
          {status === 'success' && 'Registration completed successfully!'}
          {status === 'error' && 'Registration failed. Please try again later.'}
        </div>
      )}
    </div>
  );
}
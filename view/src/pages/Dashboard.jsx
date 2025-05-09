import React from 'react';
import Navbar from '../components/Navbar';
import BookingsList from '../components/BookedAppointments';
import Forum from '../components/Forum';
import Quotes from '../components/Quotes';
import '../styles/styles.css';
import Challenge from '../components/Challenge';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Quotes />
      <div className="section bookings-section">
        <h2>Your Bookings</h2>
        <BookingsList />
      </div>
      <div className="section forum-section">
        <Forum />
      </div>
      <div className='challenge-section'>
        <Challenge />
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react'

const Appointment = () => {
  return (
    <div className="max-w-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Google Calendar Appointment</h1>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID"
        style={{ border: 0, width: '100%', height: '600px' }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Appointment;


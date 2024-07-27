import React, { useEffect } from 'react';

const ScheduleAppointmentButton = () => {
  useEffect(() => {
    // Load the Google Calendar scheduling script
    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Load the Google Calendar button after the script is loaded
    const handleLoad = () => {
      calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0w7X7kia3rrtSHk6lYNTFTfUx4ULhC20kUTyf9OyYdRI_S8dDAUQcty4sItEdOQRZgN5nlxfx6?gv=true',
        color: '#039BE5',
        label: 'Book an appointment',
        target: document.getElementById('schedule-appointment-button')
      });
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <button
      id="schedule-appointment-button"
      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
    >
      Book an appointment
    </button>
  );
};

export default ScheduleAppointmentButton;

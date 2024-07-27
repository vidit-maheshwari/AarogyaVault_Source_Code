// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DoctorCard from './DoctorCard';

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/v1/doctors');
//         setDoctors(response.data.doctors);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6 text-center">Doctors List</h2>
//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {doctors.map((doctor) => (
//             <DoctorCard key={doctor._id} doctor={doctor} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/doctors');
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleScheduleAppointment = (doctor) => {
    console.log(`Schedule appointment with Dr. ${doctor.name}`);
    // Implement your scheduling logic here
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Doctors List</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onScheduleAppointment={handleScheduleAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;




// import React from 'react';
// import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'; // Use Heroicons v2 path

// const DoctorCard = ({ doctor }) => {

//   const token = localStorage.getItem("token");
//   const pushUserId = () => {
//     const res = axios.get('http://localhost:8080/api/v1/user/userInfo', { headers: { 'Authorization': `Bearer ${token}` } })
//     const Id =  res.data.user._id;

//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert('Wallet address copied to clipboard!');
//     }).catch((err) => {
//       console.error('Failed to copy:', err);
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto flex flex-col">
//       <img
//         src={`http://localhost:8080/${doctor.image}`}
//         alt={doctor.name}
//         className="w-full h-40 object-cover rounded-lg mb-4"
//       />
//       <h3 className="text-xl font-bold mb-2 text-gray-900 truncate">{doctor.name}</h3>
//       <div className="flex items-center mb-2">
//         <p className="text-gray-600 truncate">Wallet Address: {doctor.walletAddress}</p>
//         <button
//           onClick={() => copyToClipboard(doctor.walletAddress)}
//           className="ml-2 p-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-200"
//         >
//           <ClipboardDocumentIcon className="w-5 h-5" />
//         </button>
//       </div>
//       <p className="text-gray-600 mb-2">Fee: ${doctor.fee}</p>
//       <p className="text-gray-600 mb-2">Specialization: {doctor.specialization}</p>
//       <p className="text-gray-600 mb-2">Experience: {doctor.experience} years</p>
//       <p className="text-gray-800 mt-2">{doctor.description}</p>
//       <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors' onClick={() => pushUserId()}  >
//         <a href='https://calendar.google.com/calendar/appointments/schedules/AcZssZ0w7X7kia3rrtSHk6lYNTFTfUx4ULhC20kUTyf9OyYdRI_S8dDAUQcty4sItEdOQRZgN5nlxfx6'>Schedule Appointment</a>
//       </button>
//     </div>
//   );
// };

// export default DoctorCard;


// import React from 'react';
// import axios from 'axios';
// import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'; // Use Heroicons v2 path
// import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

// const DoctorCard = ({ doctor }) => {
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   const token = localStorage.getItem("token");

//   const handleAppointmentClick = async () => {
//     try {
//       // Fetch patient ID from the API
//       const patientResponse = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const patientId = patientResponse.data.user._id;

//       // Push patient ID to the doctor's patients array
//       await axios.put(`http://localhost:8080/api/v1/doctor/booking`, { patientId }, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       // Redirect to the scheduling page
//       window.location.href = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0w7X7kia3rrtSHk6lYNTFTfUx4ULhC20kUTyf9OyYdRI_S8dDAUQcty4sItEdOQRZgN5nlxfx6';
//     } catch (error) {
//       console.error('Error during appointment scheduling:', error);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert('Wallet address copied to clipboard!');
//     }).catch((err) => {
//       console.error('Failed to copy:', err);
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto flex flex-col">
//       <img
//         src={`http://localhost:8080/${doctor.image}`}
//         alt={doctor.name}
//         className="w-full h-40 object-cover rounded-lg mb-4"
//       />
//       <h3 className="text-xl font-bold mb-2 text-gray-900 truncate">{doctor.name}</h3>
//       <div className="flex items-center mb-2">
//         <p className="text-gray-600 truncate">Wallet Address: {doctor.walletAddress}</p>
//         <button
//           onClick={() => copyToClipboard(doctor.walletAddress)}
//           className="ml-2 p-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-200"
//         >
//           <ClipboardDocumentIcon className="w-5 h-5" />
//         </button>
//       </div>
//       <p className="text-gray-600 mb-2">Fee: ${doctor.fee}</p>
//       <p className="text-gray-600 mb-2">Specialization: {doctor.specialization}</p>
//       <p className="text-gray-600 mb-2">Experience: {doctor.experience} years</p>
//       <p className="text-gray-800 mt-2">{doctor.description}</p>
//       <p className='text-red-500 mt-2'>{doctor._id}</p>
//       <button
//         className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors'
//         onClick={handleAppointmentClick}
//       >
//         Schedule Appointment
//       </button>
//     </div>
//   );
// };

// export default DoctorCard;

import React from 'react';
import axios from 'axios';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'; // Use Heroicons v2 path
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const token = localStorage.getItem("token");

  const handleAppointmentClick = async () => {
    try {
      // Fetch patient ID from the API
      const patientResponse = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const patientId = patientResponse.data.user._id;

      // Push patient ID to the doctor's patients array
      await axios.put(`http://localhost:8080/api/v1/doctor/booking`, {
        doctorId: doctor._id,
        patientId
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Redirect to the scheduling page
      window.location.href = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0w7X7kia3rrtSHk6lYNTFTfUx4ULhC20kUTyf9OyYdRI_S8dDAUQcty4sItEdOQRZgN5nlxfx6';
    } catch (error) {
      console.error('Error during appointment scheduling:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Wallet address copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto flex flex-col">
      <img
        src={`http://localhost:8080/${doctor.image}`}
        alt={doctor.name}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2 text-gray-900 truncate">{doctor.name}</h3>
      <div className="flex items-center mb-2">
        <p className="text-gray-600 truncate">Wallet Address: {doctor.walletAddress}</p>
        <button
          onClick={() => copyToClipboard(doctor.walletAddress)}
          className="ml-2 p-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-200"
        >
          <ClipboardDocumentIcon className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-600 mb-2">Fee: ${doctor.fee}</p>
      <p className="text-gray-600 mb-2">Specialization: {doctor.specialization}</p>
      <p className="text-gray-600 mb-2">Experience: {doctor.experience} years</p>
      <p className="text-gray-800 mt-2">{doctor.description}</p>
      <p className='text-red-500 mt-2'>{doctor._id}</p>
      <button
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors'
        onClick={handleAppointmentClick}
      >
        Schedule Appointment
      </button>
    </div>
  );
};

export default DoctorCard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

// const DoctorCard = ({ doctor }) => {
//   const [user, setUser] = useState(null);
//   const [patientId, setPatientId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         const fetchedUser = response.data.user;
//         setUser(fetchedUser);
//         setPatientId(fetchedUser._id);  // Set patient ID directly from fetched user data
//         console.log('Fetched user data:', fetchedUser);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleScheduleAppointmentClick = async () => {
//     if (!user || !doctor) {
//       console.error('User or Doctor data not available');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Wait for 3 seconds
//       await new Promise(resolve => setTimeout(resolve, 3000));

//       // Send the data to the backend
//       await axios.put('http://localhost:8080/api/v1/doctor/booking', {
//         doctorId: doctor._id,
//         patientId: patientId,
//       }, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//       });

//       // Navigate to the scheduling page
//       window.location.href = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0w7X7kia3rrtSHk6lYNTFTfUx4ULhC20kUTyf9OyYdRI_S8dDAUQcty4sItEdOQRZgN5nlxfx6';
//     } catch (error) {
//       console.error('Error during appointment scheduling:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert('Wallet address copied to clipboard!');
//     }).catch((err) => {
//       console.error('Failed to copy:', err);
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto flex flex-col">
//       <img
//         src={`http://localhost:8080/${doctor.image}`}
//         alt={doctor.name}
//         className="w-full h-40 object-cover rounded-lg mb-4"
//       />
//       <h3 className="text-xl font-bold mb-2 text-gray-900 truncate">{doctor.name}</h3>
//       <div className="flex items-center mb-2">
//         <p className="text-gray-600 truncate">Wallet Address: {doctor.walletAddress}</p>
//         <button
//           onClick={() => copyToClipboard(doctor.walletAddress)}
//           className="ml-2 p-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-200"
//         >
//           <ClipboardDocumentIcon className="w-5 h-5" />
//         </button>
//       </div>
//       <p className="text-gray-600 mb-2">Fee: ${doctor.fee}</p>
//       <p className="text-gray-600 mb-2">Specialization: {doctor.specialization}</p>
//       <p className="text-gray-600 mb-2">Experience: {doctor.experience} years</p>
//       <p className="text-gray-800 mt-2">{doctor.description}</p>
//       <div className="flex gap-2 mt-4">
//         <button
//           className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors'
//           onClick={handleScheduleAppointmentClick}
//           disabled={isLoading || !patientId}
//         >
//           {isLoading ? 'Processing...' : 'Schedule Appointment'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;



















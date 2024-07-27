import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrescriptionGrid = () => {
  const [prescriptions, setPrescriptions] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setPrescriptions(response.data.user.pastPriscriptions || []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setError('Error fetching prescriptions. Please try again later.');
        setPrescriptions([]); // Ensure it's an array
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchPrescriptions();
  }, []);

  const handleCardClick = (prescription) => {
    const imageUrl = `http://localhost:8080${prescription}`;
    window.open(imageUrl, '_blank'); // Open image in a new tab
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg  overflow-hidden transition-transform transform hover:scale-105 cursor-pointer border-2 border-black"
              onClick={() => handleCardClick(prescription)}
            >
              <img
                src={`http://localhost:8080${prescription}`}
                alt={`Prescription ${index}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-700 text-lg font-semibold">Prescription {index + 1}</p>
                <p className="text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>
                <p className="text-gray-600 mt-2">Summary text for prescription {index + 1}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No prescriptions found.</p>
        )}
      </div>
    </div>
  );
};

export default PrescriptionGrid;



// // src/components/PrescriptionGrid.jsx








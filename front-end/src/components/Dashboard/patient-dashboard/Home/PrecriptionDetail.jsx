import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PrescriptionDetail = () => {
  const { prescriptionUrl } = useParams();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.post('http://localhost:5000/process_image', { fileUrl: prescriptionUrl });
        setSummary(response.data.result_text);
      } catch (error) {
        console.error('Error fetching summary:', error);
        setError('Error fetching summary. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [prescriptionUrl]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-black">
        <img
          src={`http://localhost:8080${prescriptionUrl}`}
          alt="Prescription"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-700 text-lg font-semibold">Prescription Summary</p>
          <p className="text-gray-600 mt-2">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetail;

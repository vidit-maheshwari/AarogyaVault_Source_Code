import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AppointmentPatients = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [resultText, setResultText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image file.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/process_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data.extracted_text);
      setResultText(response.data.result_text);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to process image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md  p-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Image Text Extraction and Processing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md bg-blue-500 text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Upload and Process'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {resultText && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Processed Result:</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultText}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AppointmentPatients;

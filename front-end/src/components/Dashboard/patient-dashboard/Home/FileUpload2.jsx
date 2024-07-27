// // src/FileUpload2.jsx

// import React, { useState } from 'react';
// import { storePrescription, getPrescriptions } from '../../../../services/ethersService';

// function FileUpload2() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileURL, setFileURL] = useState('');
//   const [prescriptions, setPrescriptions] = useState([]);

//   const changeHandler = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     if (file) {
//       setFileURL(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmission = async () => {
//     if (!fileURL) return;

//     try {
//       await storePrescription(fileURL);
//       alert('Prescription uploaded and stored successfully!');
//       fetchPrescriptions();
//     } catch (error) {
//       console.error('Error storing prescription:', error);
//     }
//   };

//   const fetchPrescriptions = async () => {
//     try {
//       const pres = await getPrescriptions();
//       setPrescriptions(pres);
//     } catch (error) {
//       console.error('Error fetching prescriptions:', error);
//     }
//   };

//   return (
//     <div className="FileUpload2">
//       <label className="form-label">Choose File</label>
//       <input type="file" onChange={changeHandler} />
//       <button onClick={handleSubmission}>Submit</button>

//       {fileURL && (
//         <div>
//           <h3>File Preview:</h3>
//           <img src={fileURL} alt="Preview" style={{ maxWidth: '500px', maxHeight: '500px' }} />
//         </div>
//       )}

//       <h2>Stored Prescriptions</h2>
//       <ul>
//         {prescriptions.map((prescription, index) => (
//           <li key={index}>
//             <a href={prescription.imageURI} target="_blank" rel="noopener noreferrer">
//               Prescription {index + 1}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FileUpload2;


// // src/FileUpload2.jsx
//correct code

// import React, { useEffect, useState } from 'react';
// import { storePrescription, getPrescriptions } from '../../../../services/ethersService';

// function FileUpload2() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileURL, setFileURL] = useState('');
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const changeHandler = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     if (file) {
//       setFileURL(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmission = async () => {
//     if (!fileURL) return;

//     try {
//       const tx = await storePrescription(fileURL);
//       await tx.wait(); // Wait for the transaction to be mined
//       alert('Prescription uploaded and stored successfully!');
//       fetchPrescriptions();
//     } catch (error) {
//       console.error('Error storing prescription:', error);
//     }
//   };

//   const fetchPrescriptions = async () => {
//     try {
//       const pres = await getPrescriptions();
//       setPrescriptions(pres);
//     } catch (error) {
//       console.error('Error fetching prescriptions:', error);
//       setError('Error fetching prescriptions. Please try again later.');
//       setPrescriptions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPrescriptions();
//   }, []);

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center text-red-600">{error}</p>;

//   return (
//     <div className="FileUpload2">
//       <label className="form-label">Choose File</label>
//       <input type="file" onChange={changeHandler} />
//       <button onClick={handleSubmission}>Submit</button>

//       {fileURL && (
//         <div>
//           <h3>File Preview:</h3>
//           <img src={fileURL} alt="Preview" style={{ maxWidth: '500px', maxHeight: '500px' }} />
//         </div>
//       )}

//       <h2>Stored Prescriptions</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {prescriptions.length > 0 ? (
//           prescriptions.map((prescription, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer border-2 border-black"
//             >
//               <img
//                 src={prescription.imageURI}
//                 alt={`Prescription ${index}`}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <p className="text-gray-700 text-lg font-semibold">Prescription {index + 1}</p>
//                 <p className="text-gray-500 text-sm">Date: {new Date(prescription.timestamp * 1000).toLocaleDateString()}</p>
//                 <p className="text-gray-600 mt-2">Block Hash: {prescription.blockHash}</p>
//                 <p className="text-gray-600 mt-2">Transaction Hash: {prescription.transactionHash}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No prescriptions found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FileUpload2;

import React, { useEffect, useState } from 'react';
import { storePrescription, getPrescriptions } from '../../../../services/ethersService';

function FileUpload2() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const changeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setFileURL(URL.createObjectURL(file));
    }
  };

  const handleSubmission = async () => {
    if (!fileURL) return;

    try {
      const tx = await storePrescription(fileURL);
      await tx.wait(); 
      alert('Prescription uploaded and stored successfully!');
      fetchPrescriptions();
    } catch (error) {
      console.error('Error storing prescription:', error);
      setError('Failed to upload and store the prescription.');
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const pres = await getPrescriptions();
      setPrescriptions(pres);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setError('Error fetching prescriptions. Please try again later.');
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

//   if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//   if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Upload Prescription</h2>
        <label className="block text-lg font-medium mb-2">Choose File</label>
        <input
          type="file"
          onChange={changeHandler}
          className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200"
        />
        <button
          onClick={handleSubmission}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>

        {/* {fileURL && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">File Preview:</h3>
            <img
              src={fileURL}
              alt="Preview"
              className="max-w-full h-auto rounded-md border border-gray-300 shadow-sm"
            />
          </div>
        )} */}
      </div>

      {/* <div>
        <h2 className="text-2xl font-bold mb-4">Stored Prescriptions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer border-2 border-gray-300"
              >
                <img
                  src={prescription.imageURI}
                  alt={`Prescription ${index}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-700 text-lg font-semibold">Prescription {index + 1}</p>
                  <p className="text-gray-500 text-sm">Date: {new Date(prescription.timestamp * 1000).toLocaleDateString()}</p>
                  <p className="text-gray-600 mt-2">Block Hash: {prescription.blockHash}</p>
                  <p className="text-gray-600 mt-2">Transaction Hash: {prescription.transactionHash}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No prescriptions found.</p>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default FileUpload2;
















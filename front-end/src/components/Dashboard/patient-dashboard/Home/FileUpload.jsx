// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [fileUrl, setFileUrl] = useState('');
//   const [walletAddress, setWalletAddress] = useState('');

//   useEffect(() => {
//     const fetchWalletAddress = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         setWalletAddress(response.data.user.walletAddress);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchWalletAddress();
//   }, []);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert('Please select a file to upload');
//       return;
//     }

//     setUploading(true);
//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     formData.append('walletAddress', walletAddress); // Append the wallet address

//     try {
//       const response = await axios.post('http://localhost:8080/api/v1/file/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setFileUrl(response.data.file.url);
//       alert('File uploaded successfully!');
//     } catch (error) {
//       console.error('Failed to upload file:', error);
//       alert('Failed to upload file. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 flex justify-start">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full">
//         <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">File Upload</h2>
        
//         <div className="mb-4">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
        
//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className={`w-full py-2 px-4 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {uploading ? 'Uploading...' : 'Upload File'}
//         </button>
        
//         {fileUrl && (
//           <div className="mt-6 text-center">
//             <h3 className="text-lg font-medium text-gray-800">Uploaded File:</h3>
//             <img
//               src={`http://localhost:8080${fileUrl}`}
//               alt="Uploaded Preview"
//               className="mt-4 w-full h-48 object-cover rounded-lg border border-gray-300"
//             />
//             <a
//               href={`http://localhost:8080${fileUrl}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-indigo-600 hover:underline mt-2 inline-block"
//             >
//               View File
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [fileUrl, setFileUrl] = useState('');
//   const [walletAddress, setWalletAddress] = useState('');

//   useEffect(() => {
//     const fetchWalletAddress = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         setWalletAddress(response.data.user.walletAddress);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchWalletAddress();
//   }, []);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert('Please select a file to upload');
//       return;
//     }

//     setUploading(true);
//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     formData.append('walletAddress', walletAddress);

//     try {
//       const response = await axios.post('http://localhost:8080/api/v1/file/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setFileUrl(response.data.file.url);
//       alert('File uploaded successfully!');
//     } catch (error) {
//       console.error('Failed to upload file:', error);
//       alert('Failed to upload file. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
//       <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">File Upload</h2>
      
//       <div className="mb-4">
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>
      
//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         className={`w-full py-2 px-4 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
//       >
//         {uploading ? 'Uploading...' : 'Upload File'}
//       </button>
      
//       {fileUrl && (
//         <div className="mt-6 text-center">
//           <h3 className="text-lg font-medium text-gray-800">Uploaded File:</h3>
//           <img
//             src={`http://localhost:8080${fileUrl}`}
//             alt="Uploaded Preview"
//             className="mt-4 w-full h-48 object-cover rounded-lg border border-gray-300"
//           />
//           <a
//             href={`http://localhost:8080${fileUrl}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-indigo-600 hover:underline mt-2 inline-block"
//           >
//             View File
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setWalletAddress(response.data.user.walletAddress);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchWalletAddress();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('walletAddress', walletAddress);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFileUrl(response.data.file.url);
      setTimeout(() => {
        alert('File uploaded successfully to Pinata IPFS!');
      }, 3000);
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">File Upload</h2>
      
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-2 px-4 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
      
      {fileUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-medium text-gray-800">Uploaded File:</h3>
          <img
            src={`http://localhost:8080${fileUrl}`}
            alt="Uploaded Preview"
            className="mt-4 w-full h-48 object-cover rounded-lg border border-gray-300"
          />
          <a
            href={`http://localhost:8080${fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline mt-2 inline-block"
          >
            View File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;





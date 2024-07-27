// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ethers } from 'ethers';
// import { useDispatch } from 'react-redux';
// import { showLoading, hideLoading } from '../../redux/features/alertSlice';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [walletAddress, setWalletAddress] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleMetaMaskConnection = async () => {
//     try {
//       if (typeof window.ethereum === 'undefined') {
//         toast.error('MetaMask is not installed. Please install MetaMask and try again.', {
//           position: toast.POSITION.TOP_CENTER,
//         });
//         return;
//       }

//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       if (accounts.length > 0) {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         setWalletAddress(address);
//         return address;
//       } else {
//         toast.error('MetaMask connection failed. Please try again.', {
//           position: toast.POSITION.TOP_CENTER,
//         });
//       }
//     } catch (error) {
//       if (error.code === -32002) {
//         toast.error('MetaMask connection request already pending. Please check MetaMask.', {
//           position: toast.POSITION.TOP_CENTER,
//         });
//       } else {
//         toast.error('Error connecting to MetaMask. Please try again.', {
//           position: toast.POSITION.TOP_CENTER,
//         });
//       }
//       console.error('Error connecting to MetaMask', error);
//     }
//     return null;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const address = await handleMetaMaskConnection();
//     if (!address) return;

//     try {
//       dispatch(showLoading());
//       const res = await axios.post('http://localhost:8080/api/v1/user/login', {
//         email,
//         password,
//         walletAddress: address,
//       });

//       dispatch(hideLoading());
//       if (res.data) {
//         toast.success('Login successful', {
//           position: toast.POSITION.TOP_CENTER,
//         });
//         localStorage.setItem('token', res.data.token);
//         const userRole = res.data.role; // Assuming the role is returned in the response
//         if (userRole === 'doctor') {
//           navigate('/doctor-dashboard');
//         } else if (userRole === 'patient') {
//           navigate('/patient-dashboard');
//         }
//       } else {
//         toast.error(res.data.message, {
//           position: toast.POSITION.TOP_CENTER,
//         });
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       toast.error('Login failed. Please try again.', {
//         position: toast.POSITION.TOP_CENTER,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="daisy@site.com"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="password"
//             />
//           </div>
//           <button
//             className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
//             type="submit"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      if (typeof window.ethereum === 'undefined') {
        toast.error('MetaMask is not installed. Please install MetaMask and try again.', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          // MetaMask is connected, prompt user to disconnect
          toast.info('Please disconnect MetaMask and reconnect to continue.', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
      }
    };

    checkMetaMaskConnection();
  }, []);

  const handleMetaMaskConnection = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        toast.error('MetaMask is not installed. Please install MetaMask and try again.', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        return address;
      } else {
        toast.error('MetaMask connection failed. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      if (error.code === -32002) {
        toast.error('MetaMask connection request already pending. Please check MetaMask.', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error('Error connecting to MetaMask. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      console.error('Error connecting to MetaMask', error);
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const address = await handleMetaMaskConnection();
    if (!address) return;

    try {
      dispatch(showLoading());
      const res = await axios.post('http://localhost:8080/api/v1/user/login', {
        email,
        password,
        walletAddress: address,
      });

      dispatch(hideLoading());
      if (res.data) {
        toast.success('Login successful', {
          position: toast.POSITION.TOP_CENTER,
        });
        localStorage.setItem('token', res.data.token);
        const userRole = res.data.role; // Assuming the role is returned in the response
        if (userRole === 'doctor') {
          navigate('/doctor-dashboard/home');
        } else if (userRole === 'patient') {
          navigate('/patient-dashboard/home');
        }
      } else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="daisy@site.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="password"
            />
          </div>
          <button
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;


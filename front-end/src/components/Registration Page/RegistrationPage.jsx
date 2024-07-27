import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { useDispatch } from 'react-redux';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [role, setRole] = useState(''); // New state for role selection
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMetaMaskConnected = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          console.log("MetaMask is connected");
          return true;
        } else {
          console.log("MetaMask is not connected");
          return false;
        }
      } catch (error) {
        console.error("Error checking MetaMask connection", error);
        return false;
      }
    } else {
      console.log("MetaMask is not installed");
      return false;
    }
  };

  const handleMetaMaskConnection = async () => {
    try {
      if (await isMetaMaskConnected()) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setWalletAddress(accounts[0]);
        return;
      }

      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      if (error.code === -32002) {
        console.error("MetaMask connection request already pending. Please check MetaMask.");
      } else {
        console.error("Error connecting to MetaMask", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleMetaMaskConnection();

    try {
      dispatch(showLoading());
      const response = await axios.post('http://localhost:8080/api/v1/user/register', {
        name,
        email,
        password,
        walletAddress,
        role, // Include role in the registration request
      });

      dispatch(hideLoading());
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error("Error during registration:", error.response ? error.response.data : error.message);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-4"
          onClick={handleMetaMaskConnection}
        >
          Connect MetaMask
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Daisy"
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Role</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <button
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;

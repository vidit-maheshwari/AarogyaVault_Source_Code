import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('token');

    // Notify user
    toast.success('Logged out successfully!', {
      position: toast.POSITION.TOP_CENTER,
    });

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;

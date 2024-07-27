import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';

export default function PublicRoute({ children }) {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
            headers: {
              'authorization': `Bearer ${token}`
            }
          });
          setUserRole(response.data.user.role);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>; // Or a spinner component
  }

  if (userRole) {
    // Redirect based on user role
    if (userRole === 'doctor') {
      return <Navigate to="/doctor-dashboard/appointments" />;
    } else if (userRole === 'patient') {
      return <Navigate to="/patient-dashboard" />;
    } else {
      return <Navigate to="/" />; // Default route if the role is not recognized
    }
  } else {
    // Render the public route if the user is not authenticated
    return children;
  }
}

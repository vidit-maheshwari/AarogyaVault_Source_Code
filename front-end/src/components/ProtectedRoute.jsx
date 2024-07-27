// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children, allowedRoles }) {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserRole(response.data.user.role);
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

  if (allowedRoles.includes(userRole)) {
    return children;
  } else if (userRole === null) {
    return <Navigate to="/login" />;
  } else {
    return <Navigate to="/" />; // Redirect to a default route or an error page
  }
}

export default ProtectedRoute;

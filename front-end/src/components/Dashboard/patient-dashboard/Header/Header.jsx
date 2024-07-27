import React, { useEffect, useState } from "react";
import axios from "axios";

// Function to get the token (You might get this token from localStorage or context)
const getToken = () => {
  // Example: retrieve token from localStorage or another secure place
  return localStorage.getItem("token");
};

const getUser = async () => {
  const token = getToken();
  try {
    const res = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle specific error responses here if needed
    return null;
  }
};

const Header = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      } else {
        setError("Failed to fetch user data. Please check your authentication.");
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {/* Display user info or error message */}
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : user ? (
        <div className="flex items-center text-xl font-bold">
          <span className="mr-4">{user.user.name}</span>
          {/* <span>{user.user.email}</span> */}
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </header>
  );
};

export default Header;

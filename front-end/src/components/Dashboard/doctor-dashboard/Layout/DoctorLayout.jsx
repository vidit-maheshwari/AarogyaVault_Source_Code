import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import { useEffect, useState } from 'react';

const getToken = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Ensure this is properly handled in your useEffect
    }
};

function DoctorLayout() {
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                await getToken();
                // Handle successful token fetch if needed
            } catch (error) {
                setError("Failed to fetch user data.");
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <>
            <div>
                <div className='flex'>
                    <div className='sticky'>
                        <Sidebar />
                    </div>
                    <div className='w-full'>
                        <Header />
                        <Outlet />
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorLayout;

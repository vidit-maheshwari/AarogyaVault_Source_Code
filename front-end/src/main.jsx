// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { Provider, useSelector } from 'react-redux';
// import { ClerkProvider } from '@clerk/clerk-react';
// import store from './redux/store.js';
// import './index.css';
// import LandingPage from './components/Landing Page/src/Pages/LandingPage.jsx';
// import RegistrationPage from './components/Registration Page/RegistrationPage.jsx';
// import LoginPage from './components/Login Page/LoginPage.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';
// import PublicRoute from './components/PublicRoute.jsx';
// import PatientLayout from './components/Dashboard/patient-dashboard/Layout/PatientLayout.jsx';
// import DoctorLayout from './components/Dashboard/doctor-dashboard/Layout/DoctorLayout.jsx';






// // Define Spinner component (if it's not imported from elsewhere)
// const Spinner = () => {
//   <h1>spinner</h1>
// }

// // const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <><LandingPage /></>,
//   },
//   {
//     path: "/register",
//     element: <PublicRoute><RegistrationPage /></PublicRoute>,
//   },
//   {
//     path: "/login",
//     element: <PublicRoute><LoginPage /></PublicRoute>,
//   },
//   {
//     path: "/doctor-dashboard",
//     element: <ProtectedRoute><DoctorLayout /></ProtectedRoute>,
//   },
//   {
//     path: "/patient-dashboard",
//     element: <ProtectedRoute><PatientLayout /></ProtectedRoute>,
//   }

// ]);

// const App = () => {
//   const { loading } = useSelector((state) => state.alerts.loading);

//   return (
//     <>
//       {loading ? <Spinner /> : <RouterProvider router={router} />}
//     </>
//   );
// };

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <React.StrictMode>
//       {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
//         <App />
//       {/* </ClerkProvider> */}
//     </React.StrictMode>
//   </Provider>
// );


// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import LandingPage from './components/Landing Page/src/Pages/LandingPage.jsx';
import RegistrationPage from './components/Registration Page/RegistrationPage.jsx';
import LoginPage from './components/Login Page/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import PatientLayout from './components/Dashboard/patient-dashboard/Layout/PatientLayout.jsx';
import DoctorLayout from './components/Dashboard/doctor-dashboard/Layout/DoctorLayout.jsx';
import Home from './components/Dashboard/patient-dashboard/Home/Home.jsx';
import DoctorHome from './components/Dashboard/doctor-dashboard/Home/DoctorHome.jsx';
import Profile from './components/Dashboard/doctor-dashboard/Profile/Profile.jsx';
import DoctorList from './components/Dashboard/patient-dashboard/Doctors/DoctorList.jsx';
import AppointmentsPatient from './components/Dashboard/patient-dashboard/Appointments/Appointments.jsx';
import Appointments from './components/Dashboard/doctor-dashboard/Appointments/Appointments.jsx';
import TransactionsDoctor from './components/Dashboard/patient-dashboard/Transctions/Transctions-Patient.jsx';
import TransactionsPatient from './components/Dashboard/patient-dashboard/Transctions/Transctions-Patient.jsx';
import MediBuddy from './components/Dashboard/patient-dashboard/Chatbot/MediBuddy.jsx';




const Spinner = () => <h1>Loading...</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <PublicRoute><RegistrationPage /></PublicRoute>,
  },
  {
    path: "/login",
    element: <PublicRoute><LoginPage /></PublicRoute>,
  },
  {
    path: "/doctor-dashboard",
    element: <ProtectedRoute allowedRoles={['doctor']}><DoctorLayout /></ProtectedRoute>,
    children: [
      {
        path: "home",
        element:<DoctorHome/>
      },
      {
        path:"profile",
        element:<Profile/>
      },
      // {
      //   path:"appointments",
      //   element:<Appointments/>
      // },
      {
        path:"transctions",
        element:<TransactionsDoctor/>
      }
    ]
  },
  {
    path: "/patient-dashboard",
    element: <ProtectedRoute allowedRoles={['patient']}><PatientLayout /></ProtectedRoute>,
    children: [
      {
        path: "home",
        element:<Home/>
      },
      {
        path:"doctors",
        element:<DoctorList/>
      }
      ,{
        path:"appointments",
        element:<AppointmentsPatient/>
      },
      {
        path:"transactions",
        element:<TransactionsPatient/>
      } ,
      {
        path:"medibuddy",
        element:<MediBuddy/>
      }

    ]
  }
]);

const App = () => {
  const { loading } = useSelector((state) => state.alerts.loading);

  return (
    <>
      {loading ? <Spinner /> : <RouterProvider router={router} />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);


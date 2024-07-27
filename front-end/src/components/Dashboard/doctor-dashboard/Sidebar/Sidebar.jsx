import { SignOutButton } from '@clerk/clerk-react';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdHome, MdAnalytics, MdAttachMoney } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { RiRobot2Line } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import Logout from '../../patient-dashboard/Sidebar/Logout';

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  const data = [
    {
      name: "Home",
      icon: <MdHome size={30} className="mr-2" />,
      route: "/doctor-dashboard/home",
    },
    {
      name: "Transctions",
      icon: <MdAttachMoney size={30} className="mr-2" />,
      route: "/doctor-dashboard/transctions",
    },
    // {
    //   name: "Appointments",
    //   icon: <PiStudentBold size={30} className="mr-2" />,
    //   route: "/doctor-dashboard/appointments",
    // },
    // {
    //   name: "ChatBot",
    //   icon: <PiStudentBold size={30} className="mr-2" />,
    //   route: "/doctor-dashboard/chatbot",
    // },
    // {
    //   name: "Investment",
    //   icon: <MdAnalytics size={30} className="mr-2" />,
    //   route: "/dashboard/investment",
    // },
    // {
    //   name: "Yojna Buddy",
    //   icon: <RiRobot2Line size={30} className="mr-2" />,
    //   route: "/dashboard/yojna-buddy",
    // },
    {
      name: "Profile",
      icon: <FaRegUser size={30} className="mr-2" />,
      route: "/doctor-dashboard/profile",
    },
  ];

  return (
    <div className={`bg-blue-500 shadow-md shadow-black h-full text-white min-h-screen p-4 transition-width duration-300 ${toggle ? "w-64" : "w-16"} md:w-64`}>
      <div className="flex justify-between items-center md:hidden">
        <div className="text-2xl font-bold mb-4 px-1" onClick={() => setToggle(!toggle)}>
          {toggle ? <MdClose size={20} /> : <GiHamburgerMenu size={20} />}
        </div>
      </div>
      <h1 className={`text-2xl font-bold mb-2 mt-5 ${toggle ? 'block' : 'hidden'} md:block text-center`}>Algora</h1>
      <ul className="mt-4 flex-col py-12">
        {data.map((item, index) => (
          <NavLink 
            to={item.route} 
            key={index} 
            className={() => 
              `mb-2 flex items-center py-4 md:px-2 cursor-pointer hover:bg-white hover:text-blue-500 hover:rounded-lg hover:transition-transform hover:duration-800`
            }
          >
            <li className="flex items-center">
              <div>{item.icon}</div>
              <span className={`${toggle ? 'block' : 'hidden'} md:block text-lg`}>{item.name}</span>
            </li>
          </NavLink>
        ))}
      </ul>
      <div className="sign-out top-60 flex justify-center">
        <div className={`${toggle ? 'block' : 'hidden'} md:block text-lg bg-blue-500 px-3 py-2 text-white rounded-lg`}><Logout /></div>
      </div>
    </div>
  );
};

export default Sidebar;

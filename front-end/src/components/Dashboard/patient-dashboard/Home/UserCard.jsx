// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserCard = () => {
//   const [user, setUser] = useState({});
//   const [balance, setBalance] = useState('');
//   const [isCopying, setIsCopying] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(response.data.user);
        
//         // Fetch balance using MetaMask wallet address (dummy endpoint)
//         const balanceResponse = await axios.get(`http://localhost:8080/api/v1/wallet/balance?address=${response.data.user.walletAddress}`);
//         setBalance(balanceResponse.data.balance);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(user.walletAddress)
//       .then(() => {
//         setIsCopying(true);
//         setTimeout(() => setIsCopying(false), 2000);
//       })
//       .catch(err => console.error('Failed to copy:', err));
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6 max-w-4xl mx-auto">
//         <div className="flex-shrink-0">
//           <img
//             src="/path/to/profile/image.png" // Replace with actual user image
//             alt="User"
//             className="w-20 h-20 object-cover rounded-full border border-gray-300"
//           />
//         </div>
//         <div className="flex-1">
//           <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
//           <p className="text-gray-600">Number of Prescriptions: {user.pastPriscriptions?.length || 0}</p>
//           <div className="mt-4 flex items-center space-x-4">
//             <div className="flex-1">
//               <p className="text-gray-600">MetaMask Wallet Address:</p>
//               <div className="flex items-center mt-1">
//                 <p className="text-sm text-gray-800 truncate">{user.walletAddress}</p>
//                 <button
//                   onClick={copyToClipboard}
//                   className="ml-2 text-indigo-600 hover:underline"
//                 >
//                   {isCopying ? 'Copied!' : 'Copy'}
//                 </button>
//               </div>
//             </div>
//             <div className="text-gray-800">
//               <p className="text-gray-600">Balance:</p>
//               <p className="text-xl font-bold">{balance} ETH</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;


import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const UserCard = () => {
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        initializeProvider(response.data.user.walletAddress);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const initializeProvider = async (walletAddress) => {
      try {
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethersProvider);
        const balance = await ethersProvider.getBalance(walletAddress);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error('Error initializing provider or fetching balance:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.walletAddress)
      .then(() => alert('Wallet address copied to clipboard!'))
      .catch(err => console.error('Failed to copy wallet address:', err));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row items-center p-6">
        <div className="lg:w-1/3 w-full flex-shrink-0 mb-6 lg:mb-0 lg:mr-6">
          <img
            src="https://via.placeholder.com/150" // Replace with actual image URL if available
            alt="User Avatar"
            className="w-full h-auto rounded-full border-2 border-gray-300"
          />
        </div>
        <div className="lg:w-2/3 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-4">Number of Prescriptions: {user.pastPriscriptions?.length || 0}</p>
          
          <div className="flex items-center mb-4">
            <p className="text-gray-800 font-semibold mr-2 truncate max-w-xs">Wallet Address:</p>
            <p className="text-gray-600 truncate max-w-xs">{user.walletAddress}</p>
            <button
              onClick={handleCopy}
              className="ml-2 px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Copy
            </button>
          </div>
          
          <p className="text-gray-600">Balance: {balance ? `${balance} ETH` : 'Fetching balance...'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;





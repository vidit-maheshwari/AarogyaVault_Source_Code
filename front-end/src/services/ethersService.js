// src/services/ethersService.js

// import { ethers } from 'ethers';
// import PrescriptionStorageABI from './PrescriptionStorageABI.json'; // Ensure this path is correct

// const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// export const getContract = async () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const contract = new ethers.Contract(CONTRACT_ADDRESS, PrescriptionStorageABI.abi, signer);
//   return contract;
// };

// export const storePrescription = async (imageURI) => {
//   const contract = await getContract();
//   try {
//     const tx = await contract.storePrescription(imageURI);
//     await tx.wait();
//     console.log('Prescription stored successfully!');
//   } catch (error) {
//     console.error('Error storing prescription:', error);
//   }
// };

// export const getPrescriptions = async () => {
//   const contract = await getContract();
//   try {
//     const prescriptions = await contract.getPrescriptions();
//     return prescriptions;
//   } catch (error) {
//     console.error('Error fetching prescriptions:', error);
//     return [];
//   }
// };


// src/services/ethersService.js

import { ethers } from 'ethers';
import PrescriptionStorageABI from './PrescriptionStorageABI.json'; // Ensure this path is correct

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const getContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, PrescriptionStorageABI.abi, signer);
  return contract;
};

export const storePrescription = async (imageURI) => {
  const contract = await getContract();
  try {
    const tx = await contract.storePrescription(imageURI);
    const receipt = await tx.wait();
    return {
      txHash: receipt.transactionHash,
      blockHash: receipt.blockHash,
    };
  } catch (error) {
    console.error('Error storing prescription:', error);
    throw error;
  }
};

export const getPrescriptions = async () => {
  const contract = await getContract();
  try {
    const prescriptions = await contract.getPrescriptions();
    return prescriptions.map((prescription, index) => ({
      ...prescription,
      transactionHash: "", // You'll need to map this data based on your transaction receipts if required
      blockHash: "", // You'll need to map this data based on your transaction receipts if required
    }));
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return [];
  }
};




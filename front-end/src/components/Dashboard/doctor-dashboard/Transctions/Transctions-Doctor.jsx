import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const TransactionsDoctor = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/v1/user/userInfo', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const userWalletAddress = response.data.user.walletAddress;
        setWalletAddress(userWalletAddress);
        if (userWalletAddress) {
          await fetchTransactions(userWalletAddress);
        }
      } catch (error) {
        console.error('Error fetching wallet details:', error);
      }
    };

    const fetchTransactions = async (address) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=2KVZ1YF1R4DVJE7JF344QW75CGAHTB17K9`);
        setTransactions(response.data.result);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletDetails();
  }, []);

  return (
    <div className="mt-4 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Past Transactions</h2>
      {loading ? (
        <p className="text-center">Loading transactions...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Tx Hash</th>
                <th className="py-3 px-4 text-left">Block Number</th>
                <th className="py-3 px-4 text-left">From</th>
                <th className="py-3 px-4 text-left">To</th>
                <th className="py-3 px-4 text-left">Value (ETH)</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.hash} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4 max-w-xs overflow-hidden overflow-ellipsis" title={tx.hash}>{tx.hash}</td>
                  <td className="py-3 px-4">{tx.blockNumber}</td>
                  <td className="py-3 px-4 max-w-xs overflow-hidden overflow-ellipsis" title={tx.from}>{tx.from}</td>
                  <td className="py-3 px-4 max-w-xs overflow-hidden overflow-ellipsis" title={tx.to}>{tx.to}</td>
                  <td className="py-3 px-4">{ethers.utils.formatEther(tx.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsDoctor;

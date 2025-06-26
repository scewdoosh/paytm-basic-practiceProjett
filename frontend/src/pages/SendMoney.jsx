import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heading } from '../components/Heading';
import { Button } from '../components/Button';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";


export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const id = queryParams.get('id');
  const id = searchParams.get("id")
  // const name = queryParams.get('name');
  const name = searchParams.get("name")

  const [amount, setAmount] = useState("");
  const [transferStatus, setTransferStatus] = useState(null); // 'success', 'failure', null

  const handleInitiateTransfer = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      axios.post("http://localhost:3000/api/v1/account/transfer",{
           to: id,
           amount
          },{
            headers:{
              Authorization : "Bearer "+localStorage.getItem("token")
            }
          })
      if (amount > 0 && parseFloat(amount) <= 10000) {
        setTransferStatus('success');
      } else {
        setTransferStatus('failure');
      }
    } catch (error) {
      setTransferStatus('failure');
      console.error("Transfer error:", error);
    }
    setAmount("Enter amount");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-lg w-96">
        <Heading label={"Send Money"} />

        <div className="flex items-center mt-6 mb-4">
          <div className="rounded-full h-12 w-12 bg-green-500 flex justify-center items-center mr-4 text-white text-2xl font-bold">
            {name? name[0].toUpperCase() : 'U'}
          </div>
          <div className="text-xl font-semibold text-gray-800">
            {name || "Friend's Name"}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (in Rs)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <Button onClick={handleInitiateTransfer} label={"Initiate Transfer"} />

        {transferStatus === 'success' && (
          <div className="mt-4 text-center text-green-600 font-medium">
            Transfer successful!
          </div>
        )}
        {transferStatus === 'failure' && (
          <div className="mt-4 text-center text-red-600 font-medium">
            Transfer failed. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

// components/User.jsx
import React from 'react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const User = ({ user }) => {
  const navigate = useNavigate(); // ✅ Correct place to call hook

  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center">
        <div className="rounded-full h-9 w-9 bg-slate-200 flex justify-center items-center mr-3 text-gray-800 font-semibold">
          {user.firstName[0].toUpperCase()}
        </div>
        <div className="flex flex-col justify-center text-gray-800">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {
            navigate(`/sendmoney?id=${user._id}&name=${user.username}`);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
};

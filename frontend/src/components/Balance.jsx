// components/Balance.jsx
import React from 'react';

export const Balance = ({ value }) => {
  return (
    <div className="flex items-end text-lg font-semibold ml-4 mt-4 text-gray-800">
      Your balance
      <div className="font-bold text-xl ml-2">
        Rs {value}
      </div>
    </div>
  );
};

// components/Appbar.jsx
import React from 'react';

export const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between">
      {/* Application title */}
      <div className="flex flex-col justify-center h-full ml-4">
        PayTM App
      </div>
      {/* User section */}
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center">
          <div className="flex flex-col justify-center h-full text-gray-800 font-semibold">
            U
          </div>
        </div>
      </div>
    </div>
  );
};

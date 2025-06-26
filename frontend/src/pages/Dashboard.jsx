// Dashboard.jsx
import React from 'react';
import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';

export const Dashboard = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Appbar />
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
};

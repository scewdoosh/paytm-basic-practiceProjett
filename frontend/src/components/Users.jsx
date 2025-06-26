import React, { useEffect, useState } from 'react';
import { User } from './User';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");

  const token = localStorage.getItem("token");
  let currentUserId = null;
  if (token) {
    const decoded = jwtDecode(token);
    currentUserId = decoded.userId;
  }


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, [filter]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${debouncedFilter}`)
      .then(response => {
        setUsers(response.data.users);
      }).catch(err => {
        console.error("Error fetching users:", err);
      });
  }, [debouncedFilter]);

  const filteredUsers = users
    .filter(user => user._id !== currentUserId);

  return (
    <div className="px-4">
      <div className="font-bold text-lg mt-4 mb-2 text-gray-800">
        Users
      </div>
      <div className="mb-4">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded border-slate-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        {filteredUsers.map(user => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

// components/UserList.tsx
'use client';
import React, { useState } from 'react';
import UserCard from './UserCard';
import { User } from '../types/types';

interface UserListProps {
  users: User[];
  onViewProfile: (userId: number) => void;
  onAddUser: () => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onViewProfile,
  onAddUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 px-2 sm:px-0 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-full text-sm placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter & Add */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 sm:ml-auto w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')
            }
            className="w-full sm:w-auto p-2 bg-gray-50 border border-gray-300 rounded-full text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={onAddUser}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white rounded-full
                       bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="p-8 text-center text-gray-500 text-sm sm:text-base">
          No users found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onViewProfile={onViewProfile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;

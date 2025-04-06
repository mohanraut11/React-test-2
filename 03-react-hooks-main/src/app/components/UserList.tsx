// components/UserList.tsx
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
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');

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
    <div className='list space-y-4 px-2 sm:px-0'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        {/* Search Bar */}
        <div className='relative w-full sm:w-64'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full pl-8 pr-2 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search Icon */}
          <svg
            className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>

        {/* Dropdown and Button Container */}
        <div className='flex items-center gap-3'>
          <select
            className='drop p-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-700'
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')
            }
          >
            <option value='all'>All Users</option>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
          <button
            onClick={onAddUser}
            className='px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm'
          >
            Add User
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className='p-8 text-center text-gray-500 text-sm sm:text-base'>
          No users found matching your criteria.
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onViewProfile={onViewProfile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;

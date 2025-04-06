// components/UserCard.tsx
import React from 'react';
import { User } from '../types/types';
import Image from 'next/image'; // Add this import

interface UserCardProps {
  user: User;
  onViewProfile: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile }) => {
  return (
    <div className='user-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
        <Image
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          width={70}
          height={70}
          className='rounded-full object-cover'
        />
        <div className='flex-1'>
          <h3 className='font-semibold text-lg'>{user.name}</h3>
          <p className='email text-gray-600'>{user.email}</p>
          <p className='text-sm text-gray-500'>
            {user.role} • {user.department}
          </p>
        </div>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            user.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className='mt-4 flex justify-end'>
        <button
          onClick={() => onViewProfile(user.id)}
          className='button px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors'
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default UserCard;

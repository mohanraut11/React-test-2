// components/UserCard.tsx
import React from 'react';
import { User } from '../types/types';
import Image from 'next/image';

interface UserCardProps {
  user: User;
  onViewProfile: (userId: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg transition-shadow hover:shadow-xl">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="relative">
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${
              user.isActive ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
        </div>

        <div className="flex-1">
          <h3 className="font-sans text-xl font-semibold text-gray-900 tracking-tight">
            {user.name}
          </h3>
          <p className="font-sans text-sm text-gray-500">{user.email}</p>
          <p className="mt-1 text-xs uppercase text-gray-400">
            {user.role} • {user.department}
          </p>
        </div>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            user.isActive
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onViewProfile(user.id)}
          className="font-sans text-sm font-medium px-4 py-2 rounded-full 
                     bg-gradient-to-r from-pink-500 to-orange-400 text-white 
                     hover:from-pink-600 hover:to-orange-500 transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default UserCard;

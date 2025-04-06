// components/UserProfile.tsx
import React, { useState } from 'react';
import { User } from '../types/types';
import Image from 'next/image';

interface UserProfileProps {
  user: User;
  onEdit: () => void;
  onBack: () => void;
  onDelete: (userId: number) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onEdit,
  onBack,
  onDelete,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(user.id);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className='max-w-full sm:max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow'>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl max-w-sm w-full'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Confirm Deletion
            </h3>
            <p className='text-gray-600 mb-6'>
              Are you sure you want to delete this user?
            </p>
            <div className='flex justify-end space-x-3'>
              <button
                onClick={cancelDelete}
                className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-between items-start mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>User Profile</h2>
        <div className='flex space-x-2'>
          <button
            onClick={onBack}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-green-500'
          >
            Back to List
          </button>
          <button
            onClick={onEdit}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Edit Profile
          </button>
          <button
            onClick={handleDeleteClick}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex-shrink-0'>
          <Image
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            width={128}
            height={128}
            className='rounded-full object-cover border-4 border-gray-200'
          />
          <div className='mt-4 text-center'>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className='flex-1 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Full Name</h3>
              <p className='text-lg font-medium'>{user.name}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Email</h3>
              <p className='text-lg font-medium'>{user.email}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Role</h3>
              <p className='text-lg font-medium'>{user.role}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Department</h3>
              <p className='text-lg font-medium'>{user.department}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Location</h3>
              <p className='text-lg font-medium'>{user.location}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Join Date</h3>
              <p className='text-lg font-medium'>
                {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

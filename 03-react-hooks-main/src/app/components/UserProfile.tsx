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
    <div className='max-w-full sm:max-w-screen-md mx-auto p-4 sm:p-6 bg-light-blue-100 rounded-lg shadow'>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-blue-50 p-8 rounded-lg shadow-xl max-w-sm w-full'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Confirm Deletion
            </h3>
            <p className='text-gray-700 mb-6'>
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className='flex justify-end space-x-3'>
              <button
                onClick={cancelDelete}
                className='px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all'
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-between items-start mb-6'>
        <button
          onClick={onBack}
          className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-all'
        >
          Back to List
        </button>
      </div>

      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>User Profile</h2>
      </div>

      <div className='flex flex-col sm:flex-row gap-8'>
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

        <div className='flex-1 space-y-4 text-center'>
          <div className='space-y-6'>
            {/* Flex layout for each detail */}
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-gray-500 w-1/3 sm:w-1/4'>
                Full Name
              </h3>
              <p className='text-lg font-medium w-2/3 sm:w-3/4'>
                {user.name}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-gray-500 w-1/3 sm:w-1/4'>
                Email
              </h3>
              <p className='text-lg font-medium w-2/3 sm:w-3/4'>
                {user.email}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-gray-500 w-1/3 sm:w-1/4'>
                Role
              </h3>
              <p className='text-lg font-medium w-2/3 sm:w-3/4'>{user.role}</p>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-gray-500 w-1/3 sm:w-1/4'>
                Department
              </h3>
              <p className='text-lg font-medium w-2/3 sm:w-3/4'>
                {user.department}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-gray-500 w-1/3 sm:w-1/4'>
                Location
              </h3>
              <p className='text-lg font-medium w-2/3 sm:w-3/4'>
                {user.location}
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium text-gray-500 w-1/3 sm:w-1/4'>
                Join Date
              </h3>
              <p className='text-lg font-medium w-2/3 sm:w-3/4'>
                {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row mt-8 gap-4'>
        <button
          onClick={onEdit}
          className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full sm:w-auto'
        >
          Edit Profile
        </button>
        <button
          onClick={handleDeleteClick}
          className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 w-full sm:w-auto'
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
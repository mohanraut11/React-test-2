// components/UserForm.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { UserFormData } from '../types/types';

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (userData: UserFormData) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'Viewer',
    department: '',
    location: '',
    isActive: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.department.trim())
      newErrors.department = 'Department is required';
    if (!formData.location.trim())
      newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg font-sans">
      <h2
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#405DE6] via-[#833AB4] to-[#FD1D1D]
                   bg-clip-text text-transparent tracking-tight"
      >
        {initialData?.id ? 'Edit User' : 'Add New User'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 w-full p-3 rounded-xl border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 w-full p-3 rounded-xl border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 w-full p-3 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          >
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`mt-1 w-full p-3 rounded-xl border ${
              errors.department ? 'border-red-500' : 'border-gray-300'
            } bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
          />
          {errors.department && (
            <p className="mt-1 text-xs text-red-600">{errors.department}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`mt-1 w-full p-3 rounded-xl border ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            } bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition`}
          />
          {errors.location && (
            <p className="mt-1 text-xs text-red-600">{errors.location}</p>
          )}
        </div>

        {/* Active */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-5 w-5 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">Active User</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white rounded-xl
                       bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 transition"
          >
            {initialData?.id ? 'Update' : 'Create'} User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

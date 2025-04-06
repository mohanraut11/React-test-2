// components/UserForm.tsx
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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.department.trim())
      newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className='max-w-full sm:max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow'>
      <h2 className='text-xl font-semibold mb-4'>
        {initialData?.id ? 'Edit User' : 'Add New User'}
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Role
          </label>
          <select
            name='role'
            value={formData.role}
            onChange={handleChange}
            className='mt-1 block w-full p-2 border rounded'
          >
            <option value='Admin'>Admin</option>
            <option value='Editor'>Editor</option>
            <option value='Viewer'>Viewer</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Department
          </label>
          <input
            type='text'
            name='department'
            value={formData.department}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded ${
              errors.department ? 'border-red-500' : ''
            }`}
          />
          {errors.department && (
            <p className='mt-1 text-sm text-red-600'>{errors.department}</p>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Location
          </label>
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border rounded ${
              errors.location ? 'border-red-500' : ''
            }`}
          />
          {errors.location && (
            <p className='mt-1 text-sm text-red-600'>{errors.location}</p>
          )}
        </div>

        <div className='flex items-center'>
          <input
            type='checkbox'
            id='isActive'
            name='isActive'
            checked={formData.isActive}
            onChange={handleChange}
            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
          />
          <label
            htmlFor='isActive'
            className='ml-2 block text-sm text-gray-700'
          >
            Active User
          </label>
        </div>

        <div className='flex justify-end space-x-3 pt-4'>
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            {initialData?.id ? 'Update' : 'Create'} User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

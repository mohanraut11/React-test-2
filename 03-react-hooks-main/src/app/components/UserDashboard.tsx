// components/UserDashboard.tsx
'use client';
import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import UserProfile from './UserProfile';
import { User, UserFormData, ViewMode } from '../types/types';

interface UserDashboardProps {
  initialUsers: User[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingUser, setEditingUser] = useState<UserFormData | null>(null);

  // Load users from localStorage if available
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleViewProfile = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setViewMode('profile');
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setViewMode('form');
  };

  const handleEditUser = () => {
    if (selectedUser) {
      const { id, ...userData } = selectedUser;
      setEditingUser({ ...userData, id });
      setViewMode('form');
    }
  };

  const handleSubmitUser = (userData: UserFormData) => {
    if (userData.id) {
      // Update existing user
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userData.id
            ? {
                ...u,
                ...userData,
                avatar: u.avatar, 
                joinDate: u.joinDate, 
              }
            : u
        )
      );
    } else {
      // Add new user
      const newUser: User = {
        ...userData,
        id: Math.max(0, ...users.map((u) => u.id)) + 1,
        avatar: `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? 'men' : 'women'
        }/${Math.floor(Math.random() * 50)}.jpg`,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
    setViewMode('list');
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      setViewMode('list');
    }
  };

  const handleCancel = () => {
    setViewMode(selectedUser ? 'profile' : 'list');
  };

  return (
    <div className='container mx-auto p-4'>
      {viewMode === 'list' && (
        <UserList
          users={users}
          onViewProfile={handleViewProfile}
          onAddUser={handleAddUser}
        />
      )}

      {viewMode === 'profile' && selectedUser && (
        <UserProfile
          user={selectedUser}
          onEdit={handleEditUser}
          onBack={() => setViewMode('list')}
          onDelete={handleDeleteUser}
        />
      )}

      {viewMode === 'form' && (
        <UserForm
          initialData={editingUser || undefined}
          onSubmit={handleSubmitUser}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default UserDashboard;

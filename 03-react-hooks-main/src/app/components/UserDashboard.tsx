// components/UserDashboard.tsx
'use client';
import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import UserProfile from './UserProfile';
import { User, UserFormData, ViewMode } from '../types/types';
import { useTheme } from '../context/ThemeContext';

interface UserDashboardProps {
  initialUsers: User[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ initialUsers }) => {
  const { theme } = useTheme();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingUser, setEditingUser] = useState<UserFormData | null>(null);

  // Load & save from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('users');
    if (saved) setUsers(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleViewProfile = (id: number) => {
    const u = users.find((u) => u.id === id);
    if (u) {
      setSelectedUser(u);
      setViewMode('profile');
    }
  };
  const handleAddUser = () => {
    setEditingUser(null);
    setViewMode('form');
  };
  const handleEditUser = () => {
    if (!selectedUser) return;
    const { id, ...rest } = selectedUser;
    setEditingUser({ id, ...rest });
    setViewMode('form');
  };
  const handleSubmitUser = (data: UserFormData) => {
    if (data.id) {
      setUsers((prev) =>
        prev.map((u) => (u.id === data.id ? { ...u, ...data } : u))
      );
    } else {
      const newUser: User = {
        ...data,
        id: Math.max(0, ...users.map((u) => u.id)) + 1,
        avatar: `https://randomuser.me/api/portraits/${
          Math.random() > 0.5 ? 'men' : 'women'
        }/${Math.floor(Math.random() * 50)}.jpg`,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setViewMode('list');
  };
  const handleDeleteUser = (id: number) => {
    if (confirm('Delete this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setViewMode('list');
    }
  };
  const handleCancel = () => {
    setViewMode(selectedUser ? 'profile' : 'list');
  };

  return (
    <div
      className={`max-w-4xl mx-auto mt-8 p-6 rounded-2xl shadow-lg transition-colors
        ${
          theme === 'dark'
            ? 'bg-[#1c1c1e] text-gray-200'
            : 'bg-white text-gray-900'
        }`}
    >
      {/* Header */}
      <h2
        className="text-3xl font-semibold text-center tracking-tight text-[#262626]"
        style={{ fontFamily: "'Helvetica', sans-serif" }}
      >
        User Profile Management
      </h2>

      {/* Content */}
      <div className="mt-6 space-y-8 font-sans">
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
    </div>
  );
};

export default UserDashboard;

// components/AppHeader.tsx
'use client';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  FiSun,
  FiMoon,
  FiLogIn,
  FiLogOut,
  FiList,
  FiCheckCircle,
} from 'react-icons/fi';

export default function AppHeader({
  currentPage,
}: {
  currentPage: 'dashboard' | 'todo';
}) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    await logout();
  };

  const navigateTo = (page: 'dashboard' | 'todo') => {
    router.push(page === 'dashboard' ? '/' : '/todo');
  };

  return (
    <header
      className={`flex items-center justify-between p-4 border-b ${
        theme === 'dark'
          ? 'border-gray-700 bg-gray-800'
          : 'border-gray-200 bg-white'
      }`}
    >
      <h1 className='text-xl font-bold'>
        {currentPage === 'dashboard' ? 'User Dashboard' : 'Todo App'}
      </h1>

      <div className='flex items-center space-x-4'>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            theme === 'dark'
              ? 'bg-gray-700 text-yellow-300'
              : 'bg-gray-200 text-gray-700'
          }`}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* Navigation */}
        {currentPage === 'dashboard' ? (
          <button
            onClick={() => navigateTo('todo')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-indigo-700 hover:bg-indigo-600'
                : 'bg-indigo-600 hover:bg-indigo-500'
            } text-white`}
          >
            <FiCheckCircle size={16} />
            <span>Todo App</span>
          </button>
        ) : (
          <button
            onClick={() => navigateTo('dashboard')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <FiList size={16} />
            <span>Dashboard</span>
          </button>
        )}

        {/* Auth Button */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-red-700 hover:bg-red-600'
                : 'bg-red-600 hover:bg-red-500'
            } text-white`}
          >
            <FiLogOut size={16} />
            <span>Logout</span>
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-green-700 hover:bg-green-600'
                : 'bg-green-600 hover:bg-green-500'
            } text-white`}
          >
            <FiLogIn size={16} />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
}

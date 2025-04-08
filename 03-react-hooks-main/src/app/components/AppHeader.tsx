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

  const handleLogin = () => router.push('/login');
  const handleLogout = async () => await logout();
  const navigateTo = (page: 'dashboard' | 'todo') =>
    router.push(page === 'dashboard' ? '/' : '/todo');

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 border-b transition-colors
        ${theme === 'dark' ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}
      `}
    >
      {/* Title + Mode Indicator */}
      <h1
        className={`text-2xl font-semibold flex items-center space-x-3 tracking-tight
          ${theme === 'dark' ? 'text-white' : 'bg-gradient-to-r from-[#405DE6] via-[#833AB4] to-[#FD1D1D] bg-clip-text text-transparent'}
        `}
      >
        <span className="text-3xl">
          {theme === 'dark' ? '🌙' : '🌞'}
        </span>
        <span
          style={{ fontFamily: "'Brush Script MT', cursive" }}
          className="text-3xl"
        >
          {currentPage === 'dashboard'
            ? theme === 'dark'
              ? 'Dashboard - Dark Mode'
              : 'Dashboard - Light Mode'
            : theme === 'dark'
              ? 'Todo - Dark Mode'
              : 'Todo - Light Mode'}
        </span>
      </h1>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? (
            <FiSun size={20} className="text-white" />
          ) : (
            <FiMoon size={20} className="text-black" />
          )}
        </button>

        {/* Navigation */}
        {currentPage === 'dashboard' ? (
          <button
            onClick={() => navigateTo('todo')}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors
                       hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiCheckCircle
              size={18}
              className={theme === 'dark' ? 'text-white' : 'text-black'}
            />
            <span
              className={`font-sans font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Todo App
            </span>
          </button>
        ) : (
          <button
            onClick={() => navigateTo('dashboard')}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors
                       hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiList
              size={18}
              className={theme === 'dark' ? 'text-white' : 'text-black'}
            />
            <span
              className={`font-sans font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              Dashboard
            </span>
          </button>
        )}

        {/* Auth Button */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg
                       bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-medium
                       hover:from-pink-600 hover:to-yellow-500 transition-colors"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg
                       bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-medium
                       hover:from-pink-600 hover:to-yellow-500 transition-colors"
          >
            <FiLogIn size={18} />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
}

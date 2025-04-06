// components/PomodoroTimer.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function PomodoroTimer() {
  const { theme } = useTheme();
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  }, [mode]);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      const newMode = mode === 'work' ? 'break' : 'work';
      setMode(newMode);
      if (mode === 'work') {
        setCycles((prev) => prev + 1);
      }
      new Audio('/notification.mp3').play().catch(console.error);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}
    >
      <h2 className='text-lg font-semibold mb-4'>Pomodoro Timer</h2>
      <div className='text-center mb-4'>
        <div
          className={`text-4xl font-bold mb-2 ${
            mode === 'work' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {formatTime(timeLeft)}
        </div>
        <div className='text-sm'>
          {mode === 'work' ? 'Work Time' : 'Break Time'} • Cycle: {cycles}
        </div>
      </div>
      <div className='flex justify-center space-x-4'>
        <button
          onClick={toggleTimer}
          className={`px-4 py-2 rounded-lg ${
            isActive ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => setMode(mode === 'work' ? 'break' : 'work')}
          className={`px-4 py-2 rounded-lg ${
            theme === 'dark'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Switch Mode
        </button>
      </div>
    </div>
  );
}

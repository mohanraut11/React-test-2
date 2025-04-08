'use client';
import { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');
  const [timer, setTimer] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      alert("Pomodoro session complete!");
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const resetTimer = () => {
    setTimer(1500); // Reset to 25 minutes
    setIsActive(false);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">Todo App</h1>

        {/* Todo Input and List */}
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="w-fit px-4 py-2 bg-[#1877f2] text-white font-medium rounded-xl hover:bg-[#155fc5] transition"
          >
            Add
          </button>
        </div>

        {/* Pomodoro Timer */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Pomodoro Timer</h2>
          <div className="text-3xl font-bold text-center mb-3">
            {formatTime(timer)}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`px-6 py-2 rounded-xl text-white font-medium transition ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="px-6 py-2 bg-gray-400 text-white font-medium rounded-xl hover:bg-gray-500 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Todo List */}
        <ul className="space-y-3">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl"
            >
              <span className="text-gray-800 text-base">{todo}</span>
              <button
                onClick={() => removeTodo(index)}
                className="text-sm text-red-500 hover:text-red-600 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

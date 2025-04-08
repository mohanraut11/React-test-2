'use client';
import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/ThemeContext';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoCalendar from './TodoCalendar';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

export default function TodoApp() {
  const { theme } = useTheme();
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');

  // Add a new Todo
  const addTodo = (
    title: string,
    dueDate?: string,
    priority?: 'low' | 'medium' | 'high'
  ) => {
    if (title.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title,
          completed: false,
          dueDate,
          priority,
        },
      ]);
    }
  };

  // Update an existing Todo
  const updateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  // Delete a Todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      className={`max-w-5xl mx-auto p-6 rounded-2xl shadow-lg transition-all ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Header & Tabs */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4'>
        <h1 className='text-3xl font-bold'>📋 Todo Manager</h1>
        <div className='flex space-x-2'>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'calendar'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Todo Form on Top */}
      <div className='mb-8'>
        <TodoForm onSubmit={addTodo} />
      </div>

      {/* Main Content Below */}
      <div className='min-h-[400px]'>
        {activeTab === 'list' ? (
          <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
        ) : (
          <TodoCalendar todos={todos} />
        )}
      </div>
    </div>
  );
}

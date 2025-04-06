// components/TodoApp.tsx
'use client';
import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/ThemeContext';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import PomodoroTimer from './PomodoroTimer';
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

  const updateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Todo App</h1>
        <div className='flex space-x-2'>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'calendar'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          {activeTab === 'list' ? (
            <TodoList
              todos={todos}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ) : (
            <TodoCalendar todos={todos} />
          )}
        </div>

        <div className='space-y-6'>
          <TodoForm onSubmit={addTodo} />
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
}

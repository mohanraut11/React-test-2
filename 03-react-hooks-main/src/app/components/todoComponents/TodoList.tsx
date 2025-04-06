// components/TodoList.tsx
'use client';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Todo } from './TodoApp';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, updates: Partial<Todo>) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  const { theme } = useTheme();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const saveEdit = (id: number) => {
    onUpdate(id, { title: editValue });
    setEditingId(null);
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}
    >
      <h2 className='text-lg font-semibold mb-4'>Your Tasks</h2>
      {todos.length === 0 ? (
        <p
          className={`text-center py-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          No tasks yet. Add one to get started!
        </p>
      ) : (
        <ul className='space-y-2'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center p-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-white'
              }`}
            >
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() =>
                  onUpdate(todo.id, { completed: !todo.completed })
                }
                className='mr-3 h-5 w-5 rounded'
              />

              {editingId === todo.id ? (
                <div className='flex-1 flex'>
                  <input
                    type='text'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={`flex-1 p-1 border rounded ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-500 text-white'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className='ml-2 px-2 bg-green-600 text-white rounded'
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className='flex-1'>
                  <span
                    className={`${
                      todo.completed ? 'line-through opacity-70' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                  {todo.dueDate && (
                    <span
                      className={`ml-2 text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      (Due: {new Date(todo.dueDate).toLocaleDateString()})
                    </span>
                  )}
                </div>
              )}

              <div className='flex space-x-2'>
                {editingId !== todo.id && (
                  <button
                    onClick={() => startEditing(todo)}
                    className='p-1 text-blue-500 hover:text-blue-700'
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(todo.id)}
                  className='p-1 text-red-500 hover:text-red-700'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

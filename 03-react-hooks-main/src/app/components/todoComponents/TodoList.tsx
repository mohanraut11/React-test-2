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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const saveEdit = (id: number) => {
    onUpdate(id, { title: editValue });
    setEditingId(null);
  };

  const confirmDelete = (id: number) => {
    setTodoToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (todoToDelete !== null) {
      onDelete(todoToDelete);
      setShowDeleteConfirm(false);
      setTodoToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setTodoToDelete(null);
  };

  return (
    <div
      className={`p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <h2 className='text-xl font-semibold mb-4'>Your Tasks</h2>
      {todos.length === 0 ? (
        <p className='text-center py-4'>
          No tasks yet. Add one to get started!
        </p>
      ) : (
        <ul className='space-y-4'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center p-4 rounded-lg shadow-md ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-white'
              }`}
            >
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() =>
                  onUpdate(todo.id, { completed: !todo.completed })
                }
                className='mr-4 h-5 w-5 rounded'
              />

              {editingId === todo.id ? (
                <div className='flex-1 flex'>
                  <input
                    type='text'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={`flex-1 p-2 border rounded-xl ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-500 text-white'
                        : 'bg-white border-gray-300'
                    }`}
                  />
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className='ml-2 px-4 py-2 text-white bg-green-600 rounded-xl'
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className='flex-1'>
                  <span
                    className={`text-lg font-semibold ${
                      todo.completed ? 'line-through opacity-60' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                  {todo.dueDate && (
                    <span
                      className={`ml-2 text-sm text-gray-500 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      (Due: {new Date(todo.dueDate).toLocaleDateString()})
                    </span>
                  )}
                </div>
              )}

              <div className='flex space-x-3'>
                {editingId !== todo.id && (
                  <button
                    onClick={() => startEditing(todo)}
                    className='p-2 text-blue-500 hover:text-blue-700'
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => confirmDelete(todo.id)}
                  className='p-2 text-red-500 hover:text-red-700'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      {editingId !== null && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50'>
          <div
            className={`p-6 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <h3 className='text-xl font-semibold mb-4'>Edit Task</h3>
            <input
              type='text'
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className={`w-full p-3 text-sm rounded-xl outline-none focus:ring-2 transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700 border border-gray-500 text-white'
                  : 'bg-white border-gray-300 focus:ring-pink-500'
              }`}
            />
            <div className='mt-4 flex justify-end space-x-4'>
              <button
                onClick={() => setEditingId(null)}
                className='px-4 py-2 text-gray-500 hover:text-gray-700'
              >
                Cancel
              </button>
              <button
                onClick={() => saveEdit(editingId)}
                className='px-4 py-2 bg-green-600 text-white rounded-xl'
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50'>
          <div
            className={`p-6 rounded-lg ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <h3 className='text-xl font-semibold mb-4'>Confirm Deletion</h3>
            <p>Are you sure you want to delete this task?</p>
            <div className='mt-4 flex justify-end space-x-4'>
              <button
                onClick={cancelDelete}
                className='px-4 py-2 text-gray-500 hover:text-gray-700'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 bg-red-600 text-white rounded-xl'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

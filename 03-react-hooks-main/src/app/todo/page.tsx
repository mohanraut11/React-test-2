// app/todo/page.tsx
'use client';
import TodoApp from '../components/todoComponents/TodoApp';
import AppHeader from '../components/AppHeader';
import ProtectedRoute from '../components/ProtectedRoute';

export default function TodoPage() {
  return (
    <ProtectedRoute>
      <div className='min-h-screen flex flex-col'>
        <AppHeader currentPage='todo' />
        <main className='flex-1 p-4'>
          <TodoApp />
        </main>
      </div>
    </ProtectedRoute>
  );
}

'use client';
import { ThemeProvider } from '../app/context/ThemeContext';
import { AuthProvider } from '../app/context/AuthContext';
import { ReactNode } from 'react';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className='theme-container'>{children}</div>
      </AuthProvider>
    </ThemeProvider>
  );
}

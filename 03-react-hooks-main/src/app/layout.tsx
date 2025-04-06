// app/layout.tsx
import '../app/styles/globals.css';
import type { Metadata } from 'next';
import ClientProviders from './ClientProviders';

export const metadata: Metadata = {
  title: 'User Management & Todo App',
  description: 'A user management dashboard with integrated todo functionality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='min-h-screen'>
        <ClientProviders>
          <div className='theme-light dark:theme-dark min-h-screen'>
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

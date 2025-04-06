// src/context/AuthContext.tsx
'use client';
import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const router = useRouter();

  const login = useCallback(
    async (userData: User) => {
      setUser(userData);
      router.push('/');
    },
    [setUser, router]
  );

  const logout = useCallback(async () => {
    setUser(null);
    router.push('/login');
  }, [setUser, router]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

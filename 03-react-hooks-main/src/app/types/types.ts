// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  joinDate: string;
  isActive: boolean;
}

// types/types.ts
export interface UserFormData {
  id?: number;
  name: string;
  email: string;
  avatar?: string; // Add this line
  role: string;
  department: string;
  location: string;
  isActive: boolean;
}

// types/types.ts
export type ViewMode = 'list' | 'profile' | 'form';

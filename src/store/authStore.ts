import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'organization';
  organizationId?: string;
  organization?: string; // Organization name for easier access
  department?: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
}

// Dummy users for authentication
const dummyUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@demo.com',
    password: 'password',
    role: 'student',
    organizationId: 'org1',
    organization: 'GEC Bilaspur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Dr. Sarah Faculty',
    email: 'faculty@demo.com',
    password: 'password',
    role: 'faculty',
    organizationId: 'org1',
    organization: 'GEC Bilaspur',
    department: 'NSS',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b691?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'GEC Bilaspur',
    email: 'org@demo.com',
    password: 'password',
    role: 'organization',
    organization: 'GEC Bilaspur',
    avatar: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = dummyUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      set({ user: userWithoutPassword, isAuthenticated: true });
      return true;
    }
    return false;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  signup: async (userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = dummyUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      organizationId: userData.organizationId,
      department: userData.department,
      avatar: userData.avatar
    };
    
    set({ user: newUser, isAuthenticated: true });
    return true;
  }
}));
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; user: User }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; user: User }>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('genzed_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('genzed_user');
      }
    }

    // Initialize demo users if none exist
    const existingUsers = localStorage.getItem('genzed_users');
    if (!existingUsers) {
      const demoUsers = [
        {
          id: '1',
          name: 'Dr. Smith',
          email: 'teacher@genzed.com',
          password: 'password123',
          role: 'teacher',
          createdAt: new Date(),
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dr.Smith'
        },
        {
          id: '2',
          name: 'Alice Johnson',
          email: 'student@genzed.com',
          password: 'password123',
          role: 'student',
          createdAt: new Date(),
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
        },
        {
          id: '3',
          name: 'Admin User',
          email: 'admin@genzed.com',
          password: 'password123',
          role: 'admin',
          createdAt: new Date(),
          isActive: true,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
        }
      ];
      localStorage.setItem('genzed_users', JSON.stringify(demoUsers));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists in localStorage (simulated database)
      const users = JSON.parse(localStorage.getItem('genzed_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem('genzed_user', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing users
      const users = JSON.parse(localStorage.getItem('genzed_users') || '[]');

      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date(),
        isActive: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
      };

      // Save to "database"
      users.push(newUser);
      localStorage.setItem('genzed_users', JSON.stringify(users));

      // Set current user (remove password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('genzed_user', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('genzed_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

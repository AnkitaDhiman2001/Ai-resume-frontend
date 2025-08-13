'use client'
import { toasterError, toasterSuccess } from '@/components/core/Toaster';
import API from '@/utils/Api';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: {
    children: React.ReactNode;
  }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const url = "api/users/login"
      const response = await API.post(url, {
        email: email,
        password: password
      })

      if (response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        toasterSuccess('Welcome back! Redirecting to dashboard...');
        router.push('/dashboard');
      }   
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {

      const url = "api/users/create-users"
      const response = await API.post(url, {
          name: name,
          email: email,
          password: password
      })
       if (response.data) {
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
          toasterSuccess('Account created successfully! Redirecting to dashboard...');
          router.push('/dashboard');
       }
    } catch (error) {
      toasterError('Invalid credentials. Please try again.');
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toasterSuccess('You have been logged out successfully.');
    console.log('User logged out');
    router.push('/auth/login');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider };
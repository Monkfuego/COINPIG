import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';

type AuthContextType = {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// For the MVP, we'll use mock authentication
// In a real app, this would connect to Firebase or MongoDB
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setAuthState({
          user: JSON.parse(storedUser),
          isLoading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Invalid stored user data',
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock authentication - in a real app this would call MongoDB or Firebase
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock successful login
      if (email === 'demo@example.com' && password === 'password123') {
        const user: User = {
          id: 'user-123',
          username: 'demouser',
          email: 'demo@example.com',
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          user,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      });
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock signup - in a real app this would call MongoDB or Firebase
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup
      const user: User = {
        id: `user-${Date.now()}`,
        username,
        email,
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed',
      });
    }
  };

  const logout = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Clear local storage
      localStorage.removeItem('user');
      
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
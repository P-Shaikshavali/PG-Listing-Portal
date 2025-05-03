import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  saveProperty: (propertyId: string) => void;
  unsaveProperty: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  savedProperties: ['1', '3'],
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to verify credentials
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation
        if (email.trim() && password.trim()) {
          setUser(mockUser);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
  };

  const saveProperty = (propertyId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      savedProperties: [...user.savedProperties, propertyId]
    });
  };

  const unsaveProperty = (propertyId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      savedProperties: user.savedProperties.filter(id => id !== propertyId)
    });
  };

  const isSaved = (propertyId: string): boolean => {
    return user?.savedProperties.includes(propertyId) || false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      saveProperty,
      unsaveProperty,
      isSaved
    }}>
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
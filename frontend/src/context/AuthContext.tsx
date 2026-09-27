import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

export type UserRole = 'MP' | 'District Authority' | 'State Nodal Authority' | 'Ministry Admin';

export interface User {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  state?: string;
  district?: string;
  constituency?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_USERS: Record<UserRole, User> = {
  'Ministry Admin': {
    id: 1,
    email: 'admin@mplads.gov.in',
    full_name: 'Rajesh Kumar (Ministry Admin)',
    role: 'Ministry Admin',
    state: 'All',
    district: 'All'
  },
  'State Nodal Authority': {
    id: 2,
    email: 'state@mplads.gov.in',
    full_name: 'Priya Sharma (State Nodal Officer)',
    role: 'State Nodal Authority',
    state: 'Maharashtra',
    district: 'All'
  },
  'District Authority': {
    id: 3,
    email: 'district@mplads.gov.in',
    full_name: 'Sanjay Patil (District Collector)',
    role: 'District Authority',
    state: 'Maharashtra',
    district: 'Pune'
  },
  'MP': {
    id: 4,
    email: 'mp@mplads.gov.in',
    full_name: 'Pralhad Venkatesh Joshi (Hon\'ble MP)',
    role: 'MP',
    state: 'Karnataka',
    district: 'DHARWAD',
    constituency: 'DHARWAD'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('mplads_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [role, setRole] = useState<UserRole>(() => (
    (localStorage.getItem('mplads_user_role') as UserRole) || 'Ministry Admin'
  ));

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const authenticatedUser = response.data.user as User;
    setUser(authenticatedUser);
    setRole(authenticatedUser.role);
    localStorage.setItem('mplads_token', response.data.access_token);
    localStorage.setItem('mplads_user', JSON.stringify(authenticatedUser));
    localStorage.setItem('mplads_user_role', authenticatedUser.role);
  };

  const logout = () => {
    setUser(null);
    setRole('Ministry Admin');
    localStorage.removeItem('mplads_token');
    localStorage.removeItem('mplads_user');
    localStorage.removeItem('mplads_user_role');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

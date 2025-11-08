import React, { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { authAPI } from '../utils/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        setUser(response.user);
        setToken(`token_${response.user.id}_${Date.now()}`);
        setLoading(false);
        return { success: true };
      } else {
        setError(response.error || 'Login failed');
        setLoading(false);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An error occurred during login');
      setLoading(false);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.register(userData);
      
      if (response.success) {
        setUser(response.user);
        setToken(`token_${response.user.id}_${Date.now()}`);
        setLoading(false);
        return { success: true };
      } else {
        setError(response.error || 'Registration failed');
        setLoading(false);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('An error occurred during registration');
      setLoading(false);
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  const getUserRole = () => {
    return user?.role || null;
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    getUserRole,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

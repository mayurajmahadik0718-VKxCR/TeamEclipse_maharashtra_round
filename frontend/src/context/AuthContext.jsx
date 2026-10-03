import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial user session
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe) => {
    const res = await authService.login(email, password, rememberMe);
    if (res.user) {
      setUser(res.user);
    }
    return res;
  };

  const signup = async (userData) => {
    const res = await authService.signup(userData);
    if (res.user) {
      setUser(res.user);
    }
    return res;
  };

  const loginWithGoogle = async () => {
    const res = await authService.loginWithGoogle();
    if (res.user) {
      setUser(res.user);
    }
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const resetPassword = async (email) => {
    return authService.resetPassword(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        loginWithGoogle,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

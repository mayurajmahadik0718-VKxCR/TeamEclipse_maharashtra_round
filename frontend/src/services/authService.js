// Authentication Service for CreatorAI
// Fully decoupled: UI calls this service, never handling raw auth logic or tokens directly.

import { MOCK_CREATORS } from './mockData';
import apiClient from './api';

const USE_MOCK_DATA = true;
const AUTH_STORAGE_KEY = 'creatorai_auth_user';

export const authService = {
  // Login with email and password
  login: async (email, password, rememberMe = true) => {
    if (USE_MOCK_DATA) {
      // Simulate realistic network delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      const matchedCreator = MOCK_CREATORS.find(
        (c) => c.email.toLowerCase() === email.toLowerCase()
      ) || MOCK_CREATORS[0];

      const user = {
        id: matchedCreator.id,
        email: matchedCreator.email,
        name: matchedCreator.name,
        primaryNiche: matchedCreator.primaryNiche,
        avatar: matchedCreator.avatar,
        token: 'mock_jwt_token_' + Date.now(),
      };

      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      }

      return { success: true, user };
    }

    // Real backend call
    const res = await apiClient.post('/auth/login', { email, password });
    if (res.data?.user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res.data.user));
    }
    return res.data;
  },

  // Signup new creator
  signup: async (userData) => {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser = {
        id: 'creator_' + Math.floor(100 + Math.random() * 900),
        name: userData.fullName || userData.name || 'New Creator',
        email: userData.email,
        primaryNiche: userData.niche || 'Tech & AI',
        primaryPlatform: userData.primaryPlatform || 'youtube',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        token: 'mock_jwt_token_' + Date.now(),
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      return { success: true, user: newUser };
    }

    const res = await apiClient.post('/auth/signup', userData);
    if (res.data?.user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(res.data.user));
    }
    return res.data;
  },

  // Continue with Google UI integration
  loginWithGoogle: async () => {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const user = {
        id: MOCK_CREATORS[0].id,
        email: MOCK_CREATORS[0].email,
        name: MOCK_CREATORS[0].name,
        primaryNiche: MOCK_CREATORS[0].primaryNiche,
        avatar: MOCK_CREATORS[0].avatar,
        token: 'mock_google_oauth_token',
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return { success: true, user };
    }

    const res = await apiClient.post('/auth/google');
    return res.data;
  },

  // Reset password
  resetPassword: async (email) => {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return {
        success: true,
        message: `Password reset instructions sent to ${email}. Check your inbox!`,
      };
    }

    const res = await apiClient.post('/auth/reset-password', { email });
    return res.data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    return { success: true };
  },

  // Get current session user
  getCurrentUser: () => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    // Default fallback to Aarav for smooth local preview
    return {
      id: MOCK_CREATORS[0].id,
      email: MOCK_CREATORS[0].email,
      name: MOCK_CREATORS[0].name,
      primaryNiche: MOCK_CREATORS[0].primaryNiche,
      avatar: MOCK_CREATORS[0].avatar,
    };
  },
};

export default authService;

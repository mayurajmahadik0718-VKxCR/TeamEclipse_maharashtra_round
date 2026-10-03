import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api = {
  // Health
  checkHealth: async () => {
    const res = await apiClient.get('/health');
    return res.data;
  },

  // Creators
  getCreators: async () => {
    const res = await apiClient.get('/creators');
    return res.data;
  },

  getCreatorById: async (id) => {
    const res = await apiClient.get(`/creators/${id}`);
    return res.data;
  },

  createCreator: async (creatorData) => {
    const res = await apiClient.post('/creators', creatorData);
    return res.data;
  },

  // Digital Twin
  getDigitalTwin: async (creatorId) => {
    const res = await apiClient.get(`/creators/${creatorId}/digital-twin`);
    return res.data;
  },

  // Content Studio
  generateContent: async (payload) => {
    const res = await apiClient.post('/content/generate', payload);
    return res.data;
  },

  getContentById: async (id) => {
    const res = await apiClient.get(`/content/${id}`);
    return res.data;
  },

  // Video Studio
  generateVideo: async (payload) => {
    const res = await apiClient.post('/video/generate', payload);
    return res.data;
  },

  getVideoById: async (id) => {
    const res = await apiClient.get(`/video/${id}`);
    return res.data;
  },

  // Analytics
  getAnalytics: async (creatorId, period = '30d') => {
    const res = await apiClient.get(`/analytics/${creatorId}?period=${period}`);
    return res.data;
  },
};

export default apiClient;

// Analytics Service
// Fetches performance metrics, chart data, and AI insights

import { MOCK_ANALYTICS } from './mockData';
import apiClient from './api';

const USE_MOCK_DATA = true;

export const analyticsService = {
  getCreatorAnalytics: async (creatorId = 'creator_001', period = '30d') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 300));
      return {
        success: true,
        data: {
          ...MOCK_ANALYTICS,
          creatorId,
          period,
        },
      };
    }
    try {
      const res = await apiClient.get(`/analytics/${creatorId}?period=${period}`);
      return res.data;
    } catch {
      return {
        success: true,
        data: {
          ...MOCK_ANALYTICS,
          creatorId,
          period,
        },
      };
    }
  },
};

export default analyticsService;

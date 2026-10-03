// Opportunity Service
// Surfaces "What Should You Create Next?" recommendations and reasoning data

import { MOCK_OPPORTUNITIES } from './mockData';
import apiClient from './api';

const USE_MOCK_DATA = true;

export const opportunityService = {
  // Get all opportunity cards for creator
  getOpportunities: async (creatorId = 'creator_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 250));
      return { success: true, data: MOCK_OPPORTUNITIES };
    }
    try {
      const res = await apiClient.get(`/opportunities?creatorId=${creatorId}`);
      return res.data;
    } catch {
      return { success: true, data: MOCK_OPPORTUNITIES };
    }
  },

  // Get specific opportunity by id with full reasoning data
  getOpportunityById: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 150));
      const opp = MOCK_OPPORTUNITIES.find((o) => o.id === id) || MOCK_OPPORTUNITIES[0];
      return { success: true, data: opp };
    }
    try {
      const res = await apiClient.get(`/opportunities/${id}`);
      return res.data;
    } catch {
      const opp = MOCK_OPPORTUNITIES.find((o) => o.id === id) || MOCK_OPPORTUNITIES[0];
      return { success: true, data: opp };
    }
  },
};

export default opportunityService;

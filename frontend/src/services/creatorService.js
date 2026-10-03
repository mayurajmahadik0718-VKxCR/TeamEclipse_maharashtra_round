// Creator & Digital Twin Service
// Connects to GET /api/creators/:id, GET /api/creators/:id/digital-twin

import { MOCK_CREATORS, MOCK_DIGITAL_TWINS } from './mockData';
import apiClient from './api';
import { aiService } from './aiService';

const USE_MOCK_DATA = true;

export const creatorService = {
  // Get all creators
  getCreators: async () => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 200));
      return { success: true, data: MOCK_CREATORS };
    }
    try {
      const res = await apiClient.get('/creators');
      return res.data;
    } catch {
      return { success: true, data: MOCK_CREATORS };
    }
  },

  // Get specific creator
  getCreator: async (id = 'creator_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 200));
      const creator = MOCK_CREATORS.find((c) => c.id === id) || MOCK_CREATORS[0];
      return { success: true, data: creator };
    }
    try {
      const res = await apiClient.get(`/creators/${id}`);
      return res.data;
    } catch {
      const creator = MOCK_CREATORS.find((c) => c.id === id) || MOCK_CREATORS[0];
      return { success: true, data: creator };
    }
  },

  // Update creator profile
  updateCreator: async (id, data) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 300));
      const existing = MOCK_CREATORS.find((c) => c.id === id) || MOCK_CREATORS[0];
      const updated = { ...existing, ...data };
      return { success: true, data: updated, message: 'Creator profile updated successfully' };
    }
    const res = await apiClient.put(`/creators/${id}`, data);
    return res.data;
  },

  // Get Digital Twin model for creator
  getDigitalTwin: async (creatorId = 'creator_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 250));
      const twin = MOCK_DIGITAL_TWINS[creatorId] || MOCK_DIGITAL_TWINS['creator_001'];
      return { success: true, data: twin };
    }
    try {
      const res = await apiClient.get(`/creators/${creatorId}/digital-twin`);
      return res.data;
    } catch {
      const twin = MOCK_DIGITAL_TWINS[creatorId] || MOCK_DIGITAL_TWINS['creator_001'];
      return { success: true, data: twin };
    }
  },

  // Update Digital Twin
  updateDigitalTwin: async (creatorId, twinData) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 450));
      const existing = MOCK_DIGITAL_TWINS[creatorId] || MOCK_DIGITAL_TWINS['creator_001'];
      const updated = {
        ...existing,
        ...twinData,
        metricsSummary: {
          ...existing.metricsSummary,
          postsAnalyzed: (existing.metricsSummary?.postsAnalyzed || 142) + 3,
          interactionsAnalyzed: (existing.metricsSummary?.interactionsAnalyzed || 58400) + 1200,
          lastUpdated: new Date().toISOString(),
        },
      };
      MOCK_DIGITAL_TWINS[creatorId] = updated;
      return { success: true, data: updated, message: 'Creator Digital Twin successfully calibrated' };
    }
    return aiService.createCreatorTwin({
      creatorId,
      creatorProfile: twinData,
      goals: twinData.goal ? [twinData.goal] : [],
    });
  },
};

export default creatorService;

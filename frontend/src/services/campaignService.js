// Campaign Service
// Allows creators to convert recommendations and opportunities into cross-platform campaigns

import apiClient from './api';

const USE_MOCK_DATA = true;

const MOCK_CAMPAIGNS = [
  {
    id: 'camp_001',
    creatorId: 'creator_001',
    title: 'Local LLM Launch Week',
    platforms: ['youtube', 'instagram', 'linkedin'],
    status: 'active',
    startDate: '2026-10-01',
    targetViews: 250000,
    currentViews: 124000,
  },
];

export const campaignService = {
  createCampaign: async (payload) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 400));
      const newCampaign = {
        id: 'camp_' + Date.now(),
        ...payload,
        createdAt: new Date().toISOString(),
        status: 'draft',
      };
      MOCK_CAMPAIGNS.unshift(newCampaign);
      return { success: true, data: newCampaign, message: 'Campaign created successfully' };
    }
    const res = await apiClient.post('/campaigns', payload);
    return res.data;
  },

  getCampaigns: async (creatorId = 'creator_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 200));
      return { success: true, data: MOCK_CAMPAIGNS };
    }
    try {
      const res = await apiClient.get(`/campaigns?creatorId=${creatorId}`);
      return res.data;
    } catch {
      return { success: true, data: MOCK_CAMPAIGNS };
    }
  },
};

export default campaignService;

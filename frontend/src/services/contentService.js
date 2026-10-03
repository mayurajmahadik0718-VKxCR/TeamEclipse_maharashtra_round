// Content Service for CreatorAI
// Connects to GET /api/content/:id, POST /api/content/generate

import { MOCK_CONTENT_ITEMS, MOCK_STUDIO_GENERATIONS } from './mockData';
import apiClient from './api';

const USE_MOCK_DATA = true;

export const contentService = {
  // Get content list for creator
  getCreatorContent: async (creatorId = 'creator_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 200));
      return { success: true, data: MOCK_CONTENT_ITEMS };
    }
    try {
      const res = await apiClient.get(`/content?creatorId=${creatorId}`);
      return res.data;
    } catch {
      return { success: true, data: MOCK_CONTENT_ITEMS };
    }
  },

  // Get single content item
  getContentById: async (id) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 200));
      const item = MOCK_CONTENT_ITEMS.find((c) => c.contentId === id) || MOCK_CONTENT_ITEMS[0];
      return { success: true, data: item };
    }
    try {
      const res = await apiClient.get(`/content/${id}`);
      return res.data;
    } catch {
      const item = MOCK_CONTENT_ITEMS.find((c) => c.contentId === id) || MOCK_CONTENT_ITEMS[0];
      return { success: true, data: item };
    }
  },

  // Generate multi-platform content adapted via Digital Twin
  generateContent: async (payload) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 600));
      const platform = (payload.platform || 'instagram').toLowerCase();
      let platformGen = MOCK_STUDIO_GENERATIONS[platform] || MOCK_STUDIO_GENERATIONS.instagram;

      return {
        success: true,
        contentId: 'content_' + Date.now(),
        data: {
          contentId: 'content_' + Date.now(),
          creatorId: payload.creatorId || 'creator_001',
          topic: payload.topic || 'AI & Tech Innovation',
          platform: payload.platform || 'instagram',
          contentType: payload.contentType || 'reel',
          tone: payload.tone || 'friendly',
          generated: MOCK_STUDIO_GENERATIONS,
          ...platformGen,
          createdAt: new Date().toISOString(),
        },
      };
    }
    const res = await apiClient.post('/content/generate', payload);
    return res.data;
  },

  // Save or update draft content
  saveContent: async (contentData) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 300));
      return {
        success: true,
        message: 'Content draft saved successfully',
        data: { ...contentData, id: contentData.id || 'content_' + Date.now() },
      };
    }
    const res = await apiClient.post('/content', contentData);
    return res.data;
  },

  // Get recent published & draft content
  getRecentContent: async (creatorId = 'creator_001') => {
    return contentService.getCreatorContent(creatorId);
  },
};

export default contentService;

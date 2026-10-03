// Video & Asset Studio Service
// Manages assets, script-to-video understanding, automated clips, and timeline editing

import { MOCK_VIDEO_DATA } from './mockData';
import apiClient from './api';

const USE_MOCK_DATA = true;

export const videoService = {
  // Generate video storyboard job
  generateVideo: async (payload) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 600));
      return {
        success: true,
        videoId: 'video_' + Date.now(),
        data: {
          ...MOCK_VIDEO_DATA,
          videoId: 'video_' + Date.now(),
          title: payload.title || MOCK_VIDEO_DATA.title,
          aspectRatio: payload.aspectRatio || '9:16',
          createdAt: new Date().toISOString(),
        },
      };
    }
    const res = await apiClient.post('/video/generate', payload);
    return res.data;
  },

  // Get video job details
  getVideoById: async (id = 'video_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 200));
      return { success: true, data: MOCK_VIDEO_DATA };
    }
    try {
      const res = await apiClient.get(`/video/${id}`);
      return res.data;
    } catch {
      return { success: true, data: MOCK_VIDEO_DATA };
    }
  },

  // Get asset management library
  getAssets: async (creatorId = 'creator_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 200));
      return { success: true, data: MOCK_VIDEO_DATA.assets };
    }
    try {
      const res = await apiClient.get(`/assets?creatorId=${creatorId}`);
      return res.data;
    } catch {
      return { success: true, data: MOCK_VIDEO_DATA.assets };
    }
  },

  // Upload new creator asset
  uploadAsset: async (assetData) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 500));
      const newAsset = {
        id: 'asset_' + Date.now(),
        name: assetData.name || 'Untitled_Asset.mp4',
        type: assetData.type || 'video',
        size: assetData.size || '38.4 MB',
        duration: assetData.duration || '01:30',
        uploadedAt: 'Just now',
      };
      MOCK_VIDEO_DATA.assets.unshift(newAsset);
      return { success: true, data: newAsset, message: 'Asset uploaded and indexed' };
    }
    const res = await apiClient.post('/assets/upload', assetData);
    return res.data;
  },

  // Generate automated short clip candidates
  generateClips: async (videoId = 'video_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 500));
      return { success: true, data: MOCK_VIDEO_DATA.clipCandidates };
    }
    try {
      const res = await apiClient.post(`/video/${videoId}/clips`);
      return res.data;
    } catch {
      return { success: true, data: MOCK_VIDEO_DATA.clipCandidates };
    }
  },
};

export default videoService;

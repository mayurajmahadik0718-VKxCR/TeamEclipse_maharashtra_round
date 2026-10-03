// AI Intelligence Service for CreatorAI
// Interfaces directly with Teammate 2's AI endpoints or fallback mock contracts.
// Does NOT embed prompt engineering or raw LLM inference directly in UI components.

import {
  MOCK_DIGITAL_TWINS,
  MOCK_OPPORTUNITIES,
  MOCK_ANALYZER_RESULTS,
  MOCK_CRITIC_RESULTS,
  MOCK_LEARNING_CENTER,
  MOCK_STUDIO_GENERATIONS,
} from './mockData';
import apiClient from './api';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false';

const getImprovedVersion = (improvedContent = '') => {
  const hook = improvedContent
    .replace(/^\[HOOK[^\]]*\]\s*/i, '')
    .split('\n')
    .find((line) => line.trim())
    ?.trim() || improvedContent;
  const ctaMatch = improvedContent.match(/\[CTA[^\]]*\]\s*([\s\S]*)$/i);

  return {
    hook,
    script: improvedContent,
    cta: ctaMatch?.[1]?.trim() || '',
  };
};

const normalizeAnalyzerResult = (data, { platform, contentType }) => ({
  ...data,
  overallScore: data.score,
  clarity: data.clarityScore,
  cta: data.ctaScore,
  originality: data.originalityScore,
  analyzedPlatform: data.analyzedPlatform || platform,
  analyzedType: data.analyzedType || contentType,
});

const normalizeCriticResult = (data) => ({
  ...data,
  hook: data.hookScore,
  clarity: data.clarityScore,
  cta: data.ctaScore,
  improvedVersion: getImprovedVersion(data.improvedContent),
});

const normalizeOpportunities = (opportunities) => opportunities.map((opportunity) => ({
  ...opportunity,
  platform: opportunity.platform || opportunity.recommendedPlatform,
  format: opportunity.format || opportunity.recommendedFormat,
}));

export const aiService = {
  // Create / Calibrate Creator Digital Twin
  createCreatorTwin: async (data) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 600));
      return {
        success: true,
        data: {
          twinId: 'twin_' + Date.now(),
          ...data,
          lastUpdated: new Date().toISOString(),
        },
        message: 'Creator Digital Twin persona successfully trained and synced.',
      };
    }
    const res = await apiClient.post('/ai/digital-twin/train', data);
    return res.data;
  },

  // Analyze content (Hook, Clarity, Audience Fit, CTA, Originality, Strengths, Weaknesses, Suggestions)
  analyzeContent: async ({ content, platform, contentType }) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 700));
      // Calculate dynamic variation based on text length for visual realism
      const lengthBonus = content ? Math.min(Math.floor(content.length / 100), 5) : 0;
      return {
        success: true,
        data: {
          ...MOCK_ANALYZER_RESULTS,
          overallScore: Math.min(96, MOCK_ANALYZER_RESULTS.overallScore + lengthBonus),
          analyzedPlatform: platform || 'instagram',
          analyzedType: contentType || 'reel',
          contentSnippet: content?.slice(0, 120),
        },
      };
    }
    const res = await apiClient.post('/ai/analyze', { content, platform, contentType });
    return {
      ...res.data,
      data: res.data?.success
        ? normalizeAnalyzerResult(res.data.data, { platform, contentType })
        : res.data?.data,
    };
  },

  // Generate opportunity recommendations ("What Should You Create Next?")
  generateOpportunities: async (creatorId = 'creator_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 500));
      return {
        success: true,
        data: MOCK_OPPORTUNITIES,
      };
    }
    const res = await apiClient.post('/ai/opportunities/generate', { creatorId });
    return {
      ...res.data,
      data: res.data?.success ? normalizeOpportunities(res.data.data) : res.data?.data,
    };
  },

  // Generate complete cross-platform campaign
  generateCampaign: async (payload) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 800));
      return {
        success: true,
        data: {
          campaignId: 'camp_' + Date.now(),
          title: payload.title || 'Multi-Platform Campaign',
          platforms: payload.platforms || ['youtube', 'instagram', 'linkedin'],
          content: MOCK_STUDIO_GENERATIONS,
        },
      };
    }
    const res = await apiClient.post('/ai/campaign/generate', payload);
    return res.data;
  },

  // Criticize content draft (Scores, Strengths, Problems, Suggestions, Improved Version)
  criticizeContent: async (contentPayload) => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 650));
      return {
        success: true,
        data: {
          ...MOCK_CRITIC_RESULTS,
          originalContent: contentPayload,
          evaluatedAt: new Date().toISOString(),
        },
      };
    }
    const res = await apiClient.post('/ai/critic', contentPayload);
    return {
      ...res.data,
      data: res.data?.success ? normalizeCriticResult(res.data.data) : res.data?.data,
    };
  },

  // Learn from performance & return learning metrics, detected patterns, workflow loop
  learnFromPerformance: async (creatorId = 'creator_001') => {
    if (USE_MOCK_DATA) {
      await new Promise((r) => setTimeout(r, 400));
      return {
        success: true,
        data: MOCK_LEARNING_CENTER,
      };
    }
    const res = await apiClient.get(`/ai/learning/${creatorId}`);
    return res.data;
  },
};

// Also export standalone functions for direct import convenience
export const createCreatorTwin = aiService.createCreatorTwin;
export const analyzeContent = aiService.analyzeContent;
export const generateOpportunities = aiService.generateOpportunities;
export const generateCampaign = aiService.generateCampaign;
export const criticizeContent = aiService.criticizeContent;
export const learnFromPerformance = aiService.learnFromPerformance;

export default aiService;

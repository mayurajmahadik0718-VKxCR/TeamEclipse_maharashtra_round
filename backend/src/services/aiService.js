import {
  analyzeContent,
  createCreatorTwin,
  criticizeContent,
  generateCampaign,
  generateOpportunities,
  learnFromPerformance,
} from '../../../src/ai/index.js';
import { analyticsService } from './analyticsService.js';
import { contentService } from './contentService.js';
import { creatorService } from './creatorService.js';

const errorResponse = (code, message) => ({
  success: false,
  error: { code, message },
});

const toPerformanceData = (analytics) => {
  if (!analytics) return [];

  return [
    {
      ...analytics.summary,
      topPerformingContent: analytics.topPerformingContent || [],
      period: analytics.period,
    },
  ];
};

async function getCreatorContext(creatorId) {
  if (!creatorId) return {};

  try {
    const [creator, creatorTwin, allContent, analytics] = await Promise.all([
      creatorService.getById(creatorId),
      creatorService.getDigitalTwin(creatorId),
      contentService.getAll(),
      analyticsService.getByCreatorId(creatorId),
    ]);

    if (!creator) {
      return { error: errorResponse('CREATOR_NOT_FOUND', 'Creator profile was not found.') };
    }

    return {
      creator,
      creatorTwin,
      contentHistory: allContent.filter((content) => content.creatorId === creatorId),
      performanceData: toPerformanceData(analytics),
    };
  } catch (error) {
    console.error('Unable to load AI context:', error.message);
    return {
      error: errorResponse(
        'AI_CONTEXT_UNAVAILABLE',
        'Creator data is temporarily unavailable. Please try again shortly.'
      ),
    };
  }
}

async function withCreatorContext(payload = {}) {
  if (!payload.creatorId) return { payload };

  const context = await getCreatorContext(payload.creatorId);
  if (context.error) return context;

  return {
    payload: {
      ...payload,
      creatorTwin: payload.creatorTwin || context.creatorTwin || undefined,
    },
    context,
  };
}

export const aiService = {
  async trainCreatorTwin(payload = {}) {
    const context = await getCreatorContext(payload.creatorId);
    if (context.error) return context.error;

    return createCreatorTwin({
      creatorProfile: payload.creatorProfile || context.creator || payload,
      previousContent: payload.previousContent || context.contentHistory || [],
      performanceData: payload.performanceData || context.performanceData || [],
      goals: payload.goals || payload.objectives || [],
    });
  },

  async analyzeContent(payload = {}) {
    const result = await withCreatorContext(payload);
    if (result.error) return result.error;

    return analyzeContent(result.payload);
  },

  async generateOpportunities(payload = {}) {
    if (!payload.creatorId) {
      return errorResponse('INVALID_INPUT', 'A creatorId is required to generate opportunities.');
    }

    const context = await getCreatorContext(payload.creatorId);
    if (context.error) return context.error;

    return generateOpportunities({
      creatorTwin: context.creatorTwin || {},
      previousContent: context.contentHistory || [],
      performanceData: context.performanceData || [],
      currentGoals: payload.currentGoals || payload.goals || [],
    });
  },

  async generateCampaign(payload = {}) {
    const result = await withCreatorContext(payload);
    if (result.error) return result.error;

    return generateCampaign({
      ...result.payload,
      theme: payload.theme || payload.title || payload.topic,
      goals: payload.goals || payload.objectives || [],
    });
  },

  async criticizeContent(payload = {}) {
    const result = await withCreatorContext(payload);
    if (result.error) return result.error;

    return criticizeContent(result.payload);
  },

  async learnFromPerformance(creatorId) {
    const context = await getCreatorContext(creatorId);
    if (context.error) return context.error;

    return learnFromPerformance({
      creatorTwin: context.creatorTwin || {},
      contentHistory: context.contentHistory || [],
      performanceData: context.performanceData || [],
    });
  },
};

import { aiService } from '../services/aiService.js';

const statusForAiError = (code) => {
  if (code === 'INVALID_INPUT') return 400;
  if (code === 'CREATOR_NOT_FOUND') return 404;
  if (code === 'AI_CONTEXT_UNAVAILABLE') return 503;
  if (code === 'AI_NETWORK_ERROR' || code === 'AI_PROVIDER_ERROR') return 502;
  return 500;
};

const sendAiResult = (res, result) => {
  if (result?.success) {
    return res.status(200).json(result);
  }

  const error = result?.error || {
    code: 'AI_GENERATION_FAILED',
    message: 'Unable to complete the AI request.',
  };

  return res.status(statusForAiError(error.code)).json({
    success: false,
    error: {
      code: error.code || 'AI_GENERATION_FAILED',
      message: error.message || 'Unable to complete the AI request.',
    },
  });
};

const handleAiRequest = (operation) => async (req, res) => {
  try {
    const result = await operation(req);
    return sendAiResult(res, result);
  } catch (error) {
    console.error(`AI request failed for ${req.method} ${req.originalUrl}:`, error.message);
    return sendAiResult(res, {
      success: false,
      error: {
        code: 'AI_REQUEST_FAILED',
        message: 'Unable to complete the AI request. Please try again.',
      },
    });
  }
};

export const aiController = {
  trainCreatorTwin: handleAiRequest((req) => aiService.trainCreatorTwin(req.validatedData || req.body)),
  analyzeContent: handleAiRequest((req) => aiService.analyzeContent(req.body)),
  generateOpportunities: handleAiRequest((req) => aiService.generateOpportunities(req.body)),
  generateCampaign: handleAiRequest((req) => aiService.generateCampaign(req.validatedData || req.body)),
  criticizeContent: handleAiRequest((req) => aiService.criticizeContent(req.body)),
  learnFromPerformance: handleAiRequest((req) => aiService.learnFromPerformance(req.params.creatorId)),
};

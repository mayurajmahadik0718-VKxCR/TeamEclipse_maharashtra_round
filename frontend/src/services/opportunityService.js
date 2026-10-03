// Opportunity Service
// Delegates to the AI service so mock and real modes use the same contract.

import { aiService } from './aiService';

export const opportunityService = {
  // Get all opportunity cards for creator
  getOpportunities: async (creatorId = 'creator_001') => {
    return aiService.generateOpportunities(creatorId);
  },

  // Get specific opportunity by id with full reasoning data
  getOpportunityById: async (id) => {
    const res = await aiService.generateOpportunities();
    const opportunities = res?.data || [];

    return {
      ...res,
      data: opportunities.find((opportunity) => opportunity.id === id) || opportunities[0] || null,
    };
  },
};

export default opportunityService;

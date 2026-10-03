/**
 * @file src/ai/index.js
 * @description Central export gateway for the CreatorAI Intelligence Engine.
 *
 * Exposes all AI pipeline functions to Member 1 (Frontend) and Member 3 (Backend)
 * with standardized input/output contracts, mock mode support, and error boundary isolation.
 */

// 1. AI Client & Configuration
export {
  generateStructuredOutput,
  isMockMode,
  setMockMode,
  getAIConfig,
} from './aiClient.js';

// 2. Creator Digital Twin Persona
export { createCreatorTwin } from './creatorTwin.js';

// 3. Content Analyzer
export { analyzeContent } from './contentAnalyzer.js';

// 4. Script Understanding
export { analyzeScript } from './scriptUnderstanding.js';

// 5. Video & Footage Understanding
export { analyzeFootage } from './videoUnderstanding.js';

// 6. Script ↔ Footage Matcher
export { matchScriptToFootage } from './scriptFootageMatcher.js';

// 7. Automated Clip Generation & Non-Destructive Editing
export {
  generateClipCandidates,
  generateEditSuggestions,
} from './clipGenerator.js';

// 8. Content Generator (Hooks, Scripts, Supporting Content, Campaigns)
export {
  generateHook,
  generateScript,
  generateSupportingContent,
  generateCampaign,
} from './contentGenerator.js';

// 9. Multi-Platform Adaptation
export { adaptContentForPlatform } from './platformAdapter.js';

// 10. Content Opportunities
export { generateOpportunities } from './opportunityEngine.js';

// 11. Content Critic
export { criticizeContent } from './contentCritic.js';

// 12. Continuous Learning Engine
export { learnFromPerformance } from './learningEngine.js';

// Contracts, Response Envelopes & Validators
export {
  createSuccessResponse,
  createErrorResponse,
  safeParseJSON,
  validateCreatorTwin,
  validateContentAnalysis,
  validateScriptAnalysis,
  validateFootageAnalysis,
  validateScriptFootageMatch,
  validateClipCandidates,
  validateEditSuggestions,
  validateOpportunities,
  validateContentCritic,
  validatePlatformContent,
  validateLearningResult,
  DefaultCreatorTwin,
  DefaultContentAnalysis,
  DefaultScriptAnalysis,
  DefaultFootageAnalysis,
  DefaultScriptFootageMatch,
  DefaultClipCandidate,
  DefaultEditSuggestion,
  DefaultOpportunity,
  DefaultPlatformContent,
  DefaultContentCritic,
  DefaultLearningResult,
} from '../contracts/index.js';

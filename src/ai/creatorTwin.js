/**
 * @file src/ai/creatorTwin.js
 * @description Creator Digital Twin Persona Engine for CreatorAI.
 *
 * Models a creator's unique voice, niche, audience demographics, top formats,
 * high-retention hooks, and strategic preferences. Influences all downstream
 * AI pipeline steps (scripting, clipping, adaptation, critique, recommendations).
 */

import { generateStructuredOutput } from './aiClient.js';
import { validateCreatorTwin, DefaultCreatorTwin, createErrorResponse } from '../contracts/index.js';

/**
 * Builds dynamic persona mock data derived intelligently from provided creator profile,
 * past content, and analytics.
 *
 * @param {object} input
 * @returns {object}
 */
function buildMockTwin(input = {}) {
  const profile = input.creatorProfile || {};
  const prevContent = Array.isArray(input.previousContent) ? input.previousContent : [];
  const perfData = Array.isArray(input.performanceData) ? input.performanceData : [];
  const goalsObj = input.goals || {};

  const name = profile.name || 'Creator';
  const niche = profile.primaryNiche || profile.niche || 'Tech & AI Education';
  const bio = profile.bio || '';

  // Extract topics from past content
  const detectedTopics = new Set();
  const successfulHooks = [];
  const successfulFormats = new Set();

  prevContent.forEach((item) => {
    if (item.topic) detectedTopics.add(item.topic);
    if (item.title) detectedTopics.add(item.title);
    if (item.hook) successfulHooks.push(item.hook);
    if (item.format) successfulFormats.add(item.format);
  });

  const bestTopics = detectedTopics.size > 0
    ? Array.from(detectedTopics).slice(0, 4)
    : [`${niche} Tutorials`, 'Productivity Hacks', 'Tool Breakdowns', 'Beginner Guides'];

  const goalsList = Array.isArray(goalsObj.primaryGoals)
    ? goalsObj.primaryGoals
    : (Array.isArray(goalsObj) ? goalsObj : ['Grow short-form audience across platforms', 'Maximize viewer retention in opening 5s']);

  const platforms = Array.isArray(profile.preferredPlatforms) && profile.preferredPlatforms.length
    ? profile.preferredPlatforms
    : ['YouTube Shorts', 'Instagram Reels', 'LinkedIn'];

  const confidenceScore = Math.min(0.98, 0.82 + (prevContent.length * 0.02) + (perfData.length * 0.01));

  return {
    niche,
    audience: profile.targetAudience?.demographic || `Enthusiasts and aspiring practitioners in ${niche}`,
    language: profile.language || 'English',
    tone: typeof profile.tone === 'string' ? profile.tone : 'Actionable, clear, authentic, and hype-free',
    goals: goalsList,
    preferredPlatforms: platforms,
    bestTopics,
    weakTopics: ['Theoretical lectures without visual demos', 'Generic motivational quotes'],
    bestFormats: successfulFormats.size > 0
      ? Array.from(successfulFormats)
      : ['Rapid 45s Tutorial (9:16)', 'Problem-Proof-Solution Framework', 'Tool Comparison Carousel'],
    bestHooks: successfulHooks.length > 0
      ? successfulHooks.slice(0, 3)
      : [
          'Stop doing this manually — here is the 60-second fix.',
          'Most people get this completely backwards...',
          'The exact framework I used to automate my workflow:',
        ],
    audienceInterests: [
      `Hands-on ${niche}`,
      'Step-by-step workflows',
      'Time-saving automation',
      'Actionable templates',
    ],
    successfulPatterns: [
      'Visual demonstration in the first 3 seconds',
      'Clear on-screen kinetic captions with high contrast',
      'Single focused takeaway per video',
    ],
    weakAreas: [
      'Pacing slows down between seconds 15-25',
      'Calls-to-action sometimes ask for multiple unrelated actions',
    ],
    contentPreferences: [
      '9:16 vertical ratio for short-form',
      'Clean modern aesthetic with vibrant accents',
      'Concise captions with actionable takeaways',
    ],
    summary: `${name} creates high-utility content in ${niche}. Persona emphasizes crisp, practical takeaways with zero filler and strong visual pacing.`,
    confidence: Number(confidenceScore.toFixed(2)),
  };
}

/**
 * Creates or calibrates a Creator Digital Twin.
 *
 * @param {object} input
 * @param {object} [input.creatorProfile] - Creator onboarding information
 * @param {Array} [input.previousContent] - Past posts, scripts, or videos
 * @param {Array} [input.performanceData] - Historical analytics (views, retention, engagement)
 * @param {object|Array} [input.goals] - Content and growth goals
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function createCreatorTwin(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object with creatorProfile.');
    }

    const systemPrompt = `You are CreatorAI's Digital Twin Persona Engine.
Synthesize the creator's profile, historical content, analytics, and goals into a rich, structured persona profile.
The persona must capture their authentic tone, audience pain points, top formats, and performance strengths.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "niche": "string",
  "audience": "string",
  "language": "string",
  "tone": "string",
  "goals": ["string"],
  "preferredPlatforms": ["string"],
  "bestTopics": ["string"],
  "weakTopics": ["string"],
  "bestFormats": ["string"],
  "bestHooks": ["string"],
  "audienceInterests": ["string"],
  "successfulPatterns": ["string"],
  "weakAreas": ["string"],
  "contentPreferences": ["string"],
  "summary": "string",
  "confidence": 0.85
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validateCreatorTwin,
      mockDataGenerator: () => buildMockTwin(input),
      fallbackData: DefaultCreatorTwin,
      temperature: 0.4,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to generate Creator Digital Twin.');
  }
}

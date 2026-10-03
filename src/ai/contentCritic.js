/**
 * @file src/ai/contentCritic.js
 * @description Content Critic Engine for CreatorAI.
 *
 * Provides rigorous, objective AI critique for draft scripts, clips, and captions.
 * Uncovers retention drop-off risks, pacing lulls, weak hooks, and diluted CTAs.
 * Produces actionable problem identification and an improved rewrite.
 */

import { generateStructuredOutput } from './aiClient.js';
import { validateContentCritic, DefaultContentCritic, createErrorResponse } from '../contracts/index.js';

/**
 * Builds realistic, constructive critic feedback based on draft content.
 *
 * @param {object} input
 * @returns {object}
 */
function buildMockCritic(input = {}) {
  const contentObj = input.content || {};
  const rawText = typeof contentObj === 'string'
    ? contentObj
    : (contentObj.script || contentObj.text || contentObj.hook || 'Sample creator draft content');
  const platform = input.platform || 'Instagram Reels';
  const twin = input.creatorTwin || {};

  const lines = rawText.split('\n').filter((l) => l.trim().length > 0);
  const firstLine = lines[0] || '';
  const wordCount = rawText.trim().split(/\s+/).length;

  const hookScore = firstLine.length > 10 && (firstLine.includes('?') || /stop|start|never|secret|hack|how/i.test(firstLine)) ? 86 : 74;
  const clarityScore = wordCount < 180 ? 88 : 75;
  const audienceFit = 85;
  const originalityScore = 80;
  const ctaScore = /comment|save|follow|share|subscribe/i.test(rawText) ? 82 : 68;

  const overallScore = Math.round(
    hookScore * 0.25 +
    clarityScore * 0.20 +
    audienceFit * 0.20 +
    originalityScore * 0.15 +
    ctaScore * 0.20
  );

  const problems = [];
  if (hookScore < 80) {
    problems.push('Opening sentence is passive; it takes more than 4 seconds before communicating the actual value to the viewer.');
  }
  if (wordCount > 160 && platform.toLowerCase().includes('reel')) {
    problems.push('Information density is slightly high for a 45-second reel; risk of cognitive overload in middle section.');
  }
  if (ctaScore < 75) {
    problems.push('The call-to-action is vague or missing; viewer is not instructed on the specific next action to take.');
  }
  if (problems.length === 0) {
    problems.push('Transition between the problem framing and solution demo could be tightened by 2 seconds.');
  }

  const suggestions = [
    'Front-load the opening hook with an immediate curiosity contrast or high-stakes number.',
    'Trim filler adjectives and jargon to keep spoken cadence punchy and under 130 words per minute.',
    'Focus on a single, frictionless call-to-action (e.g. asking for a 1-word comment keyword).',
  ];

  const improvedContent = `[HOOK - 00:00 - 00:03]\nStop spending 4 hours editing every single video.\n\n[PROBLEM - 00:03 - 00:12]\nMost creators burn out because 80% of their energy goes into repetitive cuts and manual captioning.\n\n[SOLUTION - 00:12 - 00:32]\nHere is the 3-step automation pipeline:\n1. Record your raw thoughts in one continuous take.\n2. Let CreatorAI auto-detect your highest-retention moments.\n3. Export styled vertical clips with zero manual keyframing.\n\n[CTA - 00:32 - 00:40]\nComment "PIPELINE" below and I’ll send you the exact setup guide for free!`;

  return {
    overallScore,
    hookScore,
    clarityScore,
    audienceFit,
    originalityScore,
    ctaScore,
    strengths: [
      'Core subject matter directly addresses a major creator pain point',
      `Speaking voice feels authentic to the creator's ${twin.tone || 'approachable'} tone`,
      'Solution is broken down into simple, actionable steps',
    ],
    problems,
    suggestions,
    improvedContent,
  };
}

/**
 * Critiques written scripts, clips, or captions, diagnosing retention and clarity bottlenecks.
 *
 * @param {object} input
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {object|string} input.content - Draft script, caption, or post object
 * @param {string} [input.platform] - Target distribution platform
 * @param {string} [input.contentType] - Content classification
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function criticizeContent(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object containing content.');
    }

    if (!input.content) {
      return createErrorResponse('INVALID_INPUT', 'A "content" field must be provided for critique.');
    }

    const systemPrompt = `You are CreatorAI's Chief Content Critic.
Critique the provided creator draft with rigorous, actionable honesty.
Score overall performance, hook strength, clarity, audience fit, originality, and call-to-action.
Identify explicit problems and risks (retention drop-offs, jargon, weak hooks).
Provide high-impact suggestions and deliver a fully rewritten "improvedContent" version implementing all fixes.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "overallScore": 85,
  "hookScore": 86,
  "clarityScore": 88,
  "audienceFit": 85,
  "originalityScore": 80,
  "ctaScore": 82,
  "strengths": ["string"],
  "problems": ["string"],
  "suggestions": ["string"],
  "improvedContent": "string"
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validateContentCritic,
      mockDataGenerator: () => buildMockCritic(input),
      fallbackData: DefaultContentCritic,
      temperature: 0.3,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to criticize content.');
  }
}

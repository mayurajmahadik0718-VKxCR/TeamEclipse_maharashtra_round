/**
 * @file src/ai/contentAnalyzer.js
 * @description Content Analyzer Engine for CreatorAI.
 *
 * Evaluates scripts, captions, and draft content against creator tone,
 * platform conventions, hook potency, clarity, audience fit, and CTA strength.
 */

import { generateStructuredOutput } from './aiClient.js';
import { validateContentAnalysis, DefaultContentAnalysis, createErrorResponse } from '../contracts/index.js';

/**
 * Generates context-aware realistic mock analysis based on input content and creator persona.
 *
 * @param {object} input
 * @returns {object}
 */
function buildMockAnalysis(input = {}) {
  const content = typeof input.content === 'string' ? input.content : '';
  const platform = input.platform || 'General';
  const twin = input.creatorTwin || {};

  const lines = content.split('\n').filter((l) => l.trim().length > 0);
  const firstLine = lines[0] || '';
  const hasQuestion = firstLine.includes('?') || content.includes('?');
  const hasActionVerb = /\b(stop|start|build|use|discover|never|secret|hack|guide|watch)\b/i.test(firstLine);
  const hasCTA = /\b(comment|follow|share|subscribe|link|save|drop)\b/i.test(content);

  let hookScore = 72;
  if (hasQuestion) hookScore += 8;
  if (hasActionVerb) hookScore += 9;
  hookScore = Math.min(95, hookScore);

  let clarityScore = 80;
  if (content.length > 50 && content.length < 800) clarityScore += 6;
  if (content.length > 1500) clarityScore -= 10;

  const audienceFit = twin.niche ? 86 : 80;
  const ctaScore = hasCTA ? 85 : 68;
  const originalityScore = 78;

  const score = Math.round(
    hookScore * 0.25 +
    clarityScore * 0.20 +
    audienceFit * 0.25 +
    ctaScore * 0.15 +
    originalityScore * 0.15
  );

  const strengths = [];
  if (hookScore >= 80) strengths.push('Immediate curiosity hook grabs viewer attention within 3 seconds');
  strengths.push(`Tone closely aligns with ${twin.tone || 'the creator’s approachable persona'}`);
  if (hasCTA) strengths.push('Clear, focused call-to-action that encourages audience engagement');
  else strengths.push('Logical progression of information from problem to solution');

  const weaknesses = [];
  if (!hasCTA) weaknesses.push('Lacks an explicit call-to-action to convert viewers into followers or comments');
  if (content.length > 1000 && platform.toLowerCase().includes('reel')) {
    weaknesses.push('Content length is slightly heavy for a short-form vertical reel');
  }
  if (!hasQuestion && hookScore < 80) {
    weaknesses.push('The opening statement could benefit from higher emotional or curiosity stakes');
  }
  if (weaknesses.length === 0) {
    weaknesses.push('Pacing in the transition segment could be tightened by 2 seconds');
  }

  const suggestions = [
    hasCTA
      ? 'Pin a top comment asking a specific conversation-starting question to drive algorithmic comments'
      : 'Add a single, direct CTA (e.g. "Save this for your next video shoot")',
    `Optimize visual pacing for ${platform} by introducing on-screen keyword highlights`,
  ];

  return {
    score,
    hookScore,
    clarityScore,
    audienceFit,
    ctaScore,
    originalityScore,
    strengths,
    weaknesses,
    suggestions,
  };
}

/**
 * Analyzes written content, draft script, or caption for performance potential.
 *
 * @param {object} input
 * @param {object} [input.creatorTwin] - The Creator Digital Twin profile
 * @param {string} input.content - The script, draft, or caption text
 * @param {string} [input.platform] - Target distribution platform (e.g. 'Instagram Reel', 'LinkedIn')
 * @param {string} [input.contentType] - Type of content (e.g. 'short_video_script', 'caption', 'thread')
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function analyzeContent(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object containing content.');
    }

    if (!input.content || typeof input.content !== 'string' || !input.content.trim()) {
      return createErrorResponse('INVALID_INPUT', 'The "content" field must be a non-empty string.');
    }

    const systemPrompt = `You are CreatorAI's Content Analyzer Engine.
Analyze the provided content against the creator's persona, target audience, and platform best practices.
Evaluate hook strength, clarity, audience fit, call-to-action effectiveness, and originality.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "score": 85,
  "hookScore": 88,
  "clarityScore": 82,
  "audienceFit": 89,
  "ctaScore": 80,
  "originalityScore": 79,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "suggestions": ["string"]
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validateContentAnalysis,
      mockDataGenerator: () => buildMockAnalysis(input),
      fallbackData: DefaultContentAnalysis,
      temperature: 0.3,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to analyze content.');
  }
}

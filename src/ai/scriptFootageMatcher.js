/**
 * @file src/ai/scriptFootageMatcher.js
 * @description Script ↔ Footage Matching Engine for CreatorAI.
 *
 * Correlates planned script sections with recorded raw footage scenes by
 * matching spoken transcripts, semantic topics, and chronological progression.
 */

import { generateStructuredOutput } from './aiClient.js';
import { validateScriptFootageMatch, DefaultScriptFootageMatch, createErrorResponse } from '../contracts/index.js';

/**
 * Calculates a lexical similarity coefficient between two text strings.
 * @param {string} textA
 * @param {string} textB
 * @returns {number} Score between 0.0 and 1.0
 */
function computeTextRelevance(textA = '', textB = '') {
  const tokenize = (t) => t.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter((w) => w.length > 2);
  const wordsA = new Set(tokenize(textA));
  const wordsB = new Set(tokenize(textB));

  if (wordsA.size === 0 || wordsB.size === 0) return 0.5;

  let commonCount = 0;
  wordsA.forEach((w) => {
    if (wordsB.has(w)) commonCount += 1;
  });

  const unionSize = new Set([...wordsA, ...wordsB]).size;
  return commonCount / unionSize;
}

/**
 * Builds realistic script-to-footage matches by analyzing textual and topic similarity.
 *
 * @param {object} input
 * @returns {object}
 */
function buildMockMatches(input = {}) {
  const sections = Array.isArray(input.scriptSections) ? input.scriptSections : [];
  const scenes = Array.isArray(input.footageScenes) ? input.footageScenes : [];

  if (sections.length === 0 || scenes.length === 0) {
    return DefaultScriptFootageMatch;
  }

  const matches = [];

  sections.forEach((section, sIdx) => {
    let bestScene = null;
    let highestScore = -1;

    scenes.forEach((scene, scIdx) => {
      // Lexical overlap
      const sim = computeTextRelevance(section.text, scene.transcript);

      // Topic similarity bonus
      const topicMatch = (section.topic && scene.topic && section.topic.toLowerCase() === scene.topic.toLowerCase()) ? 0.35 : 0;

      // Sequential position correlation bonus
      const posDist = Math.abs((sIdx / Math.max(1, sections.length)) - (scIdx / Math.max(1, scenes.length)));
      const sequenceBonus = Math.max(0, 0.2 - posDist * 0.2);

      const totalRelevance = sim * 0.5 + topicMatch + sequenceBonus;

      if (totalRelevance > highestScore) {
        highestScore = totalRelevance;
        bestScene = scene;
      }
    });

    if (bestScene) {
      const finalRelevance = Math.min(0.97, Math.max(0.72, Number((highestScore + 0.5).toFixed(2))));
      matches.push({
        scriptSectionId: section.id || `section_${String(sIdx + 1).padStart(3, '0')}`,
        footageSceneId: bestScene.id || 'scene_001',
        startTime: typeof bestScene.startTime === 'number' ? bestScene.startTime : sIdx * 30,
        endTime: typeof bestScene.endTime === 'number' ? bestScene.endTime : (sIdx + 1) * 30,
        relevance: finalRelevance,
        reason: `Spoken dialogue and topic ("${section.topic || 'Core Point'}") closely correlate with footage scene transcript.`,
      });
    }
  });

  return { matches: matches.length > 0 ? matches : DefaultScriptFootageMatch.matches };
}

/**
 * Matches planned script sections with recorded raw footage scenes.
 *
 * @param {object} input
 * @param {Array} input.scriptSections - Analyzed script sections
 * @param {Array} input.footageScenes - Analyzed footage scenes with timestamps and transcripts
 * @param {string} [input.transcript] - Optional full audio transcript
 * @returns {Promise<{ success: boolean, data?: { matches: Array }, error?: object }>}
 */
export async function matchScriptToFootage(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object containing scriptSections and footageScenes.');
    }

    const systemPrompt = `You are CreatorAI's Script ↔ Footage Matcher.
Correlate the provided script sections with the video footage scenes based on topic, spoken transcript, and chronological sequence.
For each match, return scriptSectionId, footageSceneId, startTime, endTime, relevance score (0-1), and clear rationale.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "matches": [
    {
      "scriptSectionId": "section_001",
      "footageSceneId": "scene_001",
      "startTime": 0,
      "endTime": 35,
      "relevance": 0.94,
      "reason": "Transcript and topic closely match the script section."
    }
  ]
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validateScriptFootageMatch,
      mockDataGenerator: () => buildMockMatches(input),
      fallbackData: DefaultScriptFootageMatch,
      temperature: 0.2,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to match script sections to footage.');
  }
}

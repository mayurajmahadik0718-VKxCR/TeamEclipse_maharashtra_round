/**
 * @file src/ai/clipGenerator.js
 * @description Automated Short-Form Clip Generator & AI-Assisted Editing Engine for CreatorAI.
 *
 * Extracts high-retention short-form clip candidates from long-form footage and matched
 * script sections. Also generates non-destructive, fully editable timeline editing
 * suggestions (trimming, silence removal, caption styles, b-roll, transitions).
 *
 * CRITICAL ARCHITECTURAL BOUNDARY:
 * This module NEVER touches, alters, or encodes physical video files.
 * It produces purely structured metadata and editing instructions consumed by
 * the backend video renderer or frontend preview timeline.
 */

import { generateStructuredOutput } from './aiClient.js';
import {
  validateClipCandidates,
  validateEditSuggestions,
  DefaultClipCandidate,
  DefaultEditSuggestion,
  createErrorResponse,
} from '../contracts/index.js';

/**
 * Builds realistic short-form clip candidates derived from matched footage and creator persona.
 *
 * @param {object} input
 * @returns {Array<object>}
 */
function buildMockClipCandidates(input = {}) {
  const twin = input.creatorTwin || {};
  const matches = Array.isArray(input.matches) ? input.matches : [];
  const scenes = Array.isArray(input.footageScenes) ? input.footageScenes : [];
  const platform = input.platform || 'Instagram Reels';

  const niche = twin.niche || 'Tech';
  const targetDuration = platform.toLowerCase().includes('short') ? 45 : 35;

  const candidates = [];

  // If matches exist, derive candidates from the top matching scenes
  if (matches.length > 0) {
    matches.slice(0, 3).forEach((match, idx) => {
      const dur = Math.max(20, Math.min(60, match.endTime - match.startTime || targetDuration));
      const score = Math.round(match.relevance * 95);

      candidates.push({
        id: `clip_${String(idx + 1).padStart(3, '0')}`,
        title: `${niche} Breakthrough: Insight #${idx + 1}`,
        startTime: match.startTime,
        endTime: match.startTime + dur,
        duration: dur,
        sourceReason: match.reason || 'High semantic relevance with core script point.',
        hook: idx === 0
          ? `Stop doing this manually — here is how to automate ${niche.toLowerCase()} in 60s.`
          : `The single biggest mistake most creators make with ${niche.toLowerCase()}:`,
        clipScore: score,
        audienceFit: Math.min(96, score + 2),
        suggestedCaption: `Want to streamline your ${niche.toLowerCase()} workflow? Here is the exact breakdown. 🚀 #CreatorTips #${niche.replace(/\s+/g, '')}`,
        suggestedCTA: 'Drop a comment with "WORKFLOW" to get the free starter cheat sheet!',
      });
    });
  } else if (scenes.length > 0) {
    scenes.slice(0, 3).forEach((scene, idx) => {
      const dur = Math.max(20, Math.min(50, scene.endTime - scene.startTime || targetDuration));
      candidates.push({
        id: `clip_${String(idx + 1).padStart(3, '0')}`,
        title: `${scene.topic || 'Key Takeaway'} Highlight`,
        startTime: scene.startTime,
        endTime: scene.startTime + dur,
        duration: dur,
        sourceReason: 'High clip potential detected from spoken dialogue density.',
        hook: `Watch what happens when you apply this ${niche.toLowerCase()} technique:`,
        clipScore: 88 - idx * 3,
        audienceFit: 90 - idx * 2,
        suggestedCaption: `Quick masterclass on ${scene.topic || niche}. Save this post for reference! 📌`,
        suggestedCTA: 'Follow for daily breakdowns and real-world case studies.',
      });
    });
  } else {
    candidates.push(DefaultClipCandidate);
  }

  return candidates;
}

/**
 * Builds realistic, non-destructive editing suggestions for a selected clip.
 *
 * @param {object} input
 * @returns {object}
 */
function buildMockEditSuggestions(input = {}) {
  const clip = input.clip || {};
  const twin = input.creatorTwin || {};
  const platform = (input.platform || 'Instagram Reels').toLowerCase();

  const startTime = typeof clip.startTime === 'number' ? clip.startTime : 0;
  const endTime = typeof clip.endTime === 'number' ? clip.endTime : 35;

  const aspectRatio = platform.includes('linkedin') ? '1:1' : '9:16';
  const musicMood = twin.tone && twin.tone.toLowerCase().includes('energetic')
    ? 'High-energy electronic beats (124 BPM, clean drop)'
    : 'Modern lo-fi tech groove (115 BPM, subtle synth pad)';

  return {
    cuts: [
      {
        startTime: startTime,
        endTime: startTime + 1.2,
        reason: 'Trim opening breath/silence before speech begins',
      },
      {
        startTime: startTime + Math.round((endTime - startTime) * 0.4),
        endTime: startTime + Math.round((endTime - startTime) * 0.4) + 1.5,
        reason: 'Remove mid-sentence pause to maintain viewer momentum',
      },
    ],
    suggestedStartTime: startTime + 1.2,
    suggestedEndTime: endTime - 0.5,
    removeSilence: true,
    captionStyle: 'Bold kinetic word-by-word pop captions, yellow-cyan text highlight',
    hookOverlay: '⚡️ 60-Second Masterclass',
    bRollSuggestions: [
      { timestamp: 3.5, description: 'Screen recording zoom on tool dashboard', duration: 3.0 },
      { timestamp: 14.0, description: 'Split screen showing before vs after comparison', duration: 4.0 },
    ],
    transitionSuggestions: [
      { timestamp: 8.0, type: 'Whip Pan Right', duration: 0.3 },
      { timestamp: 20.0, type: 'Fast Zoom In', duration: 0.2 },
    ],
    musicSuggestion: musicMood,
    aspectRatio,
    notes: [
      'Opening hook is strong; keep title overlay visible for the first 3.5 seconds.',
      'Ensure all captions are centered within vertical safe margins (avoid bottom UI overlays).',
      'The creator retains full control to enable, disable, or adjust all cut timestamps.',
    ],
  };
}

/**
 * Generates ranked short-form clip candidates from long-form footage,
 * script sections, and matches.
 *
 * @param {object} input
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {Array} [input.scriptSections] - Planned script sections
 * @param {Array} [input.footageScenes] - Video footage scenes with timestamps
 * @param {Array} [input.matches] - Correlated script ↔ footage matches
 * @param {string} [input.platform] - Target platform (e.g. 'YouTube Shorts', 'Instagram Reels')
 * @returns {Promise<{ success: boolean, data?: Array<object>, error?: object }>}
 */
export async function generateClipCandidates(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object.');
    }

    const systemPrompt = `You are CreatorAI's Automated Clip Generator.
Identify 3 to 5 high-potential short-form video clip candidates from the provided footage and script matches.
Prioritize strong hooks, emotional/surprising statements, self-contained standalone ideas, and audience interest.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `[
  {
    "id": "clip_001",
    "title": "string",
    "startTime": 0,
    "endTime": 35,
    "duration": 35,
    "sourceReason": "string",
    "hook": "string",
    "clipScore": 92,
    "audienceFit": 90,
    "suggestedCaption": "string",
    "suggestedCTA": "string"
  }
]`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validateClipCandidates,
      mockDataGenerator: () => buildMockClipCandidates(input),
      fallbackData: [DefaultClipCandidate],
      temperature: 0.4,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to generate clip candidates.');
  }
}

/**
 * Generates non-destructive, fully editable timeline editing suggestions for a clip.
 *
 * @param {object} input
 * @param {object} input.clip - The selected clip candidate
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {string} [input.platform] - Target distribution platform
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function generateEditSuggestions(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object containing a clip.');
    }

    const systemPrompt = `You are CreatorAI's AI-Assisted Video Editor.
Generate non-destructive timeline editing suggestions for the selected clip.
Suggest precise cuts for pauses/silence, kinetic caption styling, hook overlays, B-roll placements, transitions, and audio moods.
CRITICAL: The instructions must keep the creator in full control and not alter media permanently.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "cuts": [
    { "startTime": 0, "endTime": 1.2, "reason": "string" }
  ],
  "suggestedStartTime": 1.2,
  "suggestedEndTime": 34.0,
  "removeSilence": true,
  "captionStyle": "string",
  "hookOverlay": "string",
  "bRollSuggestions": ["string"],
  "transitionSuggestions": ["string"],
  "musicSuggestion": "string",
  "aspectRatio": "9:16",
  "notes": ["string"]
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validateEditSuggestions,
      mockDataGenerator: () => buildMockEditSuggestions(input),
      fallbackData: DefaultEditSuggestion,
      temperature: 0.3,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to generate edit suggestions.');
  }
}

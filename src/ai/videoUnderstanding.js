/**
 * @file src/ai/videoUnderstanding.js
 * @description Video & Footage Understanding Engine for CreatorAI.
 *
 * Identifies high-value moments, scene boundaries, and standalone clip opportunities
 * from raw footage transcripts, timestamps, and scene metadata.
 *
 * NOTE: When only transcript and metadata are provided, this engine explicitly operates
 * on audio-transcript and structural timing signals without fabricating visual analysis claims.
 */

import { generateStructuredOutput } from './aiClient.js';
import { validateFootageAnalysis, DefaultFootageAnalysis, createErrorResponse } from '../contracts/index.js';

/**
 * Parses timestamp markers like [00:15] or 01:23 if present in transcript,
 * or partitions text evenly over the video duration.
 *
 * @param {string} transcript
 * @param {number} totalDuration
 * @returns {Array<{ id: string, startTime: number, endTime: number, transcript: string }>}
 */
function partitionTranscriptToScenes(transcript, totalDuration = 180) {
  const clean = (transcript || '').trim();
  if (!clean) {
    return [
      {
        id: 'scene_001',
        startTime: 0,
        endTime: Math.min(30, totalDuration),
        transcript: 'Opening footage introduction.',
      },
    ];
  }

  // Look for timestamp patterns like [00:15] or (01:20)
  const timestampRegex = /(?:\[|\()(\d{1,2}):(\d{2})(?:\]|\))/g;
  const matches = [...clean.matchAll(timestampRegex)];

  if (matches.length >= 2) {
    const scenes = [];
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const startSec = parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
      const nextMatch = matches[i + 1];
      const endSec = nextMatch
        ? parseInt(nextMatch[1], 10) * 60 + parseInt(nextMatch[2], 10)
        : totalDuration;

      const startIndex = match.index + match[0].length;
      const endIndex = nextMatch ? nextMatch.index : clean.length;
      const text = clean.substring(startIndex, endIndex).trim();

      scenes.push({
        id: `scene_${String(i + 1).padStart(3, '0')}`,
        startTime: startSec,
        endTime: endSec,
        transcript: text,
      });
    }
    return scenes;
  }

  // Otherwise divide transcript by sentences and project over duration
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [clean];
  const targetSceneCount = Math.max(2, Math.min(6, Math.round(totalDuration / 35)));
  const sentencesPerScene = Math.max(1, Math.ceil(sentences.length / targetSceneCount));
  const scenes = [];

  for (let i = 0; i < sentences.length; i += sentencesPerScene) {
    const sceneIndex = scenes.length;
    const textGroup = sentences.slice(i, i + sentencesPerScene).join(' ').trim();
    const startTime = Math.round((sceneIndex / targetSceneCount) * totalDuration);
    const endTime = Math.min(totalDuration, Math.round(((sceneIndex + 1) / targetSceneCount) * totalDuration));

    scenes.push({
      id: `scene_${String(sceneIndex + 1).padStart(3, '0')}`,
      startTime,
      endTime,
      transcript: textGroup,
    });
  }

  return scenes;
}

/**
 * Builds realistic footage understanding output from input transcript and scenes.
 *
 * @param {object} input
 * @returns {object}
 */
function buildMockFootageAnalysis(input = {}) {
  const duration = typeof input.duration === 'number' && input.duration > 0
    ? input.duration
    : 180;
  const transcript = input.transcript || '';
  const providedScenes = Array.isArray(input.scenes) && input.scenes.length > 0 ? input.scenes : null;

  const rawScenes = providedScenes || partitionTranscriptToScenes(transcript, duration);

  const scenes = rawScenes.map((sc, idx) => {
    const text = sc.transcript || '';
    const textLower = text.toLowerCase();
    const isFirst = idx === 0;

    let topic = 'Demonstration / Discussion';
    let importance = 0.72;
    let clipPotential = 0.65;

    if (isFirst || textLower.includes('welcome') || textLower.includes('today') || textLower.includes('secret')) {
      topic = 'Opening Premise & Hook';
      importance = 0.91;
      clipPotential = 0.89;
    } else if (textLower.includes('how to') || textLower.includes('step') || textLower.includes('framework') || textLower.includes('result')) {
      topic = 'Core Value & Demonstration';
      importance = 0.94;
      clipPotential = 0.93;
    } else if (idx === rawScenes.length - 1 || textLower.includes('subscribe') || textLower.includes('comment')) {
      topic = 'Summary & Next Steps';
      importance = 0.65;
      clipPotential = 0.45;
    }

    return {
      id: sc.id || `scene_${String(idx + 1).padStart(3, '0')}`,
      startTime: typeof sc.startTime === 'number' ? sc.startTime : idx * 30,
      endTime: typeof sc.endTime === 'number' ? sc.endTime : (idx + 1) * 30,
      transcript: text,
      topic,
      importance: Number(importance.toFixed(2)),
      clipPotential: Number(clipPotential.toFixed(2)),
    };
  });

  // Identify high-value moments
  const keyMoments = scenes
    .filter((s) => s.importance >= 0.85)
    .map((s) => ({
      timestamp: s.startTime + 3,
      topic: s.topic,
      description: `High impact statement: "${s.transcript.slice(0, 75)}..."`,
      importance: s.importance,
    }));

  // Identify suggested standalone clips
  const suggestedMoments = scenes
    .filter((s) => s.clipPotential >= 0.8)
    .map((s) => ({
      startTime: s.startTime,
      endTime: s.endTime,
      duration: s.endTime - s.startTime,
      reason: `Self-contained ${s.topic.toLowerCase()} with high retention probability.`,
      clipSuitability: s.clipPotential,
    }));

  return {
    duration,
    scenes,
    keyMoments: keyMoments.length ? keyMoments : [
      {
        timestamp: 10,
        topic: 'Opening Hook',
        description: 'Vocal hook introduction',
        importance: 0.88,
      },
    ],
    suggestedMoments: suggestedMoments.length ? suggestedMoments : [
      {
        startTime: 0,
        endTime: Math.min(45, duration),
        duration: Math.min(45, duration),
        reason: 'Opening 45-second segment forms a cohesive introductory short clip.',
        clipSuitability: 0.85,
      },
    ],
    analysisSource: input.metadata?.hasVisualTracking ? 'multimodal_visual_and_transcript' : 'transcript_and_timing_metadata',
  };
}

/**
 * Analyzes video footage transcript and scene metadata to detect scene boundaries,
 * key moments, and short-form clip opportunities.
 *
 * @param {object} input
 * @param {string} [input.videoId] - Identifier of the video footage
 * @param {string} [input.transcript] - Full transcript of the recording
 * @param {number} [input.duration] - Duration of the footage in seconds
 * @param {Array} [input.scenes] - Pre-segmented scenes or audio diarization if available
 * @param {object} [input.metadata] - Audio/video technical metadata
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function analyzeFootage(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object with transcript or scenes.');
    }

    const systemPrompt = `You are CreatorAI's Footage Understanding Engine.
Analyze the video transcript and scene metadata.
Identify scene boundaries, duration, topics, importance scores, and standalone short-form clip potential.
CRITICAL CONSTRAINT: Do not claim visual analysis if only transcript and timing metadata are provided.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "duration": 180,
  "scenes": [
    {
      "id": "scene_001",
      "startTime": 0,
      "endTime": 30,
      "transcript": "string",
      "topic": "string",
      "importance": 0.85,
      "clipPotential": 0.88
    }
  ],
  "keyMoments": [
    {
      "timestamp": 12,
      "topic": "string",
      "description": "string",
      "importance": 0.90
    }
  ],
  "suggestedMoments": [
    {
      "startTime": 0,
      "endTime": 35,
      "duration": 35,
      "reason": "string",
      "clipSuitability": 0.90
    }
  ]
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validateFootageAnalysis,
      mockDataGenerator: () => buildMockFootageAnalysis(input),
      fallbackData: DefaultFootageAnalysis,
      temperature: 0.3,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to analyze video footage.');
  }
}

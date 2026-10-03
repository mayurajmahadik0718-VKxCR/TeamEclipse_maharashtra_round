/**
 * @file src/ai/scriptUnderstanding.js
 * @description Script Understanding Engine for CreatorAI.
 *
 * Breaks down textual scripts or long-form video transcripts into semantic sections,
 * extracting key topics, hooks, high-value clip moments, educational highlights,
 * and calls-to-action.
 */

import { generateStructuredOutput } from './aiClient.js';
import { validateScriptAnalysis, DefaultScriptAnalysis, createErrorResponse } from '../contracts/index.js';

/**
 * Splits raw script into semantic sections based on paragraph breaks, timing cues, or sentences.
 *
 * @param {string} text
 * @returns {Array<{ text: string, startPosition: number, endPosition: number }>}
 */
function partitionScript(text) {
  const clean = text.trim();
  if (!clean) return [];

  // Try splitting by double newlines or paragraph blocks
  const rawBlocks = clean.split(/\n\s*\n/).filter((b) => b.trim().length > 0);

  if (rawBlocks.length >= 2) {
    let currentPos = 0;
    return rawBlocks.map((block) => {
      const start = text.indexOf(block, currentPos);
      const startPos = start !== -1 ? start : currentPos;
      const endPos = startPos + block.length;
      currentPos = endPos;
      return { text: block.trim(), startPosition: startPos, endPosition: endPos };
    });
  }

  // If single block, split into roughly 200-300 character semantic chunks
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [clean];
  const chunks = [];
  let currentChunk = '';
  let startOffset = 0;

  sentences.forEach((s) => {
    if ((currentChunk + s).length > 250 && currentChunk.length > 50) {
      chunks.push({
        text: currentChunk.trim(),
        startPosition: startOffset,
        endPosition: startOffset + currentChunk.length,
      });
      startOffset += currentChunk.length;
      currentChunk = s;
    } else {
      currentChunk += s;
    }
  });

  if (currentChunk.trim().length > 0) {
    chunks.push({
      text: currentChunk.trim(),
      startPosition: startOffset,
      endPosition: startOffset + currentChunk.length,
    });
  }

  return chunks;
}

/**
 * Builds realistic script understanding data from the script text.
 *
 * @param {object} input
 * @returns {object}
 */
function buildMockScriptAnalysis(input = {}) {
  const scriptText = input.script || '';
  const twin = input.creatorTwin || {};
  const chunks = partitionScript(scriptText);

  if (chunks.length === 0) {
    return DefaultScriptAnalysis;
  }

  const sections = chunks.map((chunk, index) => {
    const isFirst = index === 0;
    const isLast = index === chunks.length - 1;
    const textLower = chunk.text.toLowerCase();

    let topic = 'Concept Breakdown';
    let importance = 0.75;
    let hookPotential = 0.55;
    let clipPotential = 0.65;

    if (isFirst || textLower.includes('how to') || textLower.includes('stop') || textLower.includes('did you know')) {
      topic = 'Opening Hook & Problem Framing';
      importance = 0.92;
      hookPotential = 0.95;
      clipPotential = 0.88;
    } else if (isLast || textLower.includes('comment') || textLower.includes('follow') || textLower.includes('subscribe')) {
      topic = 'Call to Action & Next Step';
      importance = 0.70;
      hookPotential = 0.40;
      clipPotential = 0.50;
    } else if (textLower.includes('example') || textLower.includes('step') || textLower.includes('secret') || textLower.includes('trick')) {
      topic = 'Core Educational Insight';
      importance = 0.90;
      hookPotential = 0.78;
      clipPotential = 0.94;
    }

    return {
      id: `section_${String(index + 1).padStart(3, '0')}`,
      startPosition: chunk.startPosition,
      endPosition: chunk.endPosition,
      text: chunk.text,
      topic,
      importance: Number(importance.toFixed(2)),
      hookPotential: Number(hookPotential.toFixed(2)),
      clipPotential: Number(clipPotential.toFixed(2)),
    };
  });

  // Extract key topics
  const topics = Array.from(new Set(sections.map((s) => s.topic)));

  // Identify potential hooks
  const hooks = sections
    .filter((s) => s.hookPotential >= 0.75)
    .map((s) => s.text.split(/[.!?]/)[0] + '.')
    .slice(0, 3);

  // Identify CTAs
  const ctaSections = sections
    .filter((s) => s.topic.includes('Call to Action') || s.text.toLowerCase().includes('follow') || s.text.toLowerCase().includes('comment'))
    .map((s) => s.text);

  return {
    sections,
    keyTopics: topics.length ? topics : ['Problem Framing', 'Educational Insight', 'Call to Action'],
    hooks: hooks.length ? hooks : [sections[0]?.text || 'Stop editing everything manually.'],
    ctaSections: ctaSections.length ? ctaSections : ['Follow for more actionable workflows.'],
  };
}

/**
 * Analyzes a textual script or transcript to identify semantic sections,
 * high-impact hooks, educational moments, and short-form clip opportunities.
 *
 * @param {object} input
 * @param {string} input.script - Script or raw transcript text
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {string} [input.contentType] - Type of script (e.g. 'long_form_youtube', 'reel_script')
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function analyzeScript(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object containing a script string.');
    }

    if (!input.script || typeof input.script !== 'string' || !input.script.trim()) {
      return createErrorResponse('INVALID_INPUT', 'The "script" field must be a non-empty string.');
    }

    const systemPrompt = `You are CreatorAI's Script Understanding Engine.
Analyze the provided video script or transcript. Break it down into sequential semantic sections with start/end character offsets.
Evaluate each section for topic, importance (0-1), hook potential (0-1), and standalone clip potential (0-1).
Identify key topics, high-performing hooks, and call-to-action sections.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "sections": [
    {
      "id": "section_001",
      "startPosition": 0,
      "endPosition": 120,
      "text": "string",
      "topic": "string",
      "importance": 0.85,
      "hookPotential": 0.90,
      "clipPotential": 0.88
    }
  ],
  "keyTopics": ["string"],
  "hooks": ["string"],
  "ctaSections": ["string"]
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validateScriptAnalysis,
      mockDataGenerator: () => buildMockScriptAnalysis(input),
      fallbackData: DefaultScriptAnalysis,
      temperature: 0.3,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to analyze script.');
  }
}

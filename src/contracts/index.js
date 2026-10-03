/**
 * @file src/contracts/index.js
 * @description Central contract definitions, schema defaults, validation utilities,
 * and standard response wrappers for the CreatorAI AI / Intelligence Layer.
 *
 * All AI modules adhere strictly to these contract structures.
 */

// ============================================================
// STANDARD RESPONSE ENVELOPES
// ============================================================

/**
 * Creates a standardized success response envelope.
 * @param {any} data - The payload data
 * @returns {{ success: true, data: any }}
 */
export function createSuccessResponse(data) {
  return {
    success: true,
    data,
  };
}

/**
 * Creates a standardized error response envelope.
 * @param {string} code - Machine-readable error code (e.g. 'AI_GENERATION_FAILED', 'INVALID_INPUT')
 * @param {string} message - Human-readable explanation
 * @param {any} [details=null] - Optional non-sensitive debugging details
 * @returns {{ success: false, error: { code: string, message: string, details?: any } }}
 */
export function createErrorResponse(code, message, details = null) {
  const errorObj = {
    code: code || 'AI_GENERATION_FAILED',
    message: message || 'Unable to generate the requested result.',
  };
  if (details !== null && details !== undefined) {
    errorObj.details = details;
  }
  return {
    success: false,
    error: errorObj,
  };
}

// ============================================================
// CONTRACT DEFAULTS & SCHEMAS
// ============================================================

export const DefaultCreatorTwin = {
  niche: 'Content Creation & Technology',
  audience: 'Digital creators and knowledge workers seeking actionable strategies',
  language: 'English',
  tone: 'Informative, approachable, and encouraging',
  goals: ['Expand reach across short-form platforms', 'Increase audience retention'],
  preferredPlatforms: ['YouTube Shorts', 'Instagram Reels', 'LinkedIn'],
  bestTopics: ['Practical Tutorials', 'Productivity Workflows'],
  weakTopics: ['Generic Advice', 'Overly Theoretical Concepts'],
  bestFormats: ['Fast Hook Breakdown (under 60s)', 'Step-by-step Framework'],
  bestHooks: ['Question with immediate visual hook', 'Surprising metric or contrast'],
  audienceInterests: ['AI tools', 'Workflow automation', 'Creative efficiency'],
  successfulPatterns: ['Clear 3-second hook followed by immediate actionable value'],
  weakAreas: ['Long introductory pauses', 'Vague calls-to-action'],
  contentPreferences: ['Crisp 9:16 vertical video', 'Clear captions', 'Bold visual overlays'],
  summary: 'A proactive tech educator dedicated to actionable, high-efficiency workflows.',
  confidence: 0.85,
};

export const DefaultContentAnalysis = {
  score: 75,
  hookScore: 78,
  clarityScore: 82,
  audienceFit: 80,
  ctaScore: 70,
  originalityScore: 74,
  strengths: ['Clear delivery of core premise', 'Solid relatable subject matter'],
  weaknesses: ['Opening sentence could create stronger curiosity', 'Call to action is slightly generic'],
  suggestions: ['Lead with a high-stakes question in first 3 seconds', 'Specify exact next action for audience'],
};

export const DefaultScriptAnalysis = {
  sections: [
    {
      id: 'section_001',
      startPosition: 0,
      endPosition: 120,
      text: 'Introduction and opening hook.',
      topic: 'Hook & Problem',
      importance: 0.88,
      hookPotential: 0.92,
      clipPotential: 0.85,
    },
  ],
  keyTopics: ['Core Problem', 'Main Insight', 'Call to Action'],
  hooks: ['Did you know 80% of creators struggle with repurposing?'],
  ctaSections: ['Follow for more practical AI workflows.'],
};

export const DefaultFootageAnalysis = {
  duration: 180,
  scenes: [
    {
      id: 'scene_001',
      startTime: 0,
      endTime: 24,
      transcript: 'Welcome back. Today we are looking at how to automate your creative pipeline.',
      topic: 'Introduction & Hook',
      importance: 0.85,
      clipPotential: 0.88,
    },
  ],
  keyMoments: [
    {
      timestamp: 12,
      description: 'High energy hook stating main benefit',
      importance: 0.92,
    },
  ],
  suggestedMoments: [
    {
      startTime: 0,
      endTime: 38,
      reason: 'Self-contained hook and initial demonstration',
      clipSuitability: 0.9,
    },
  ],
};

export const DefaultScriptFootageMatch = {
  matches: [
    {
      scriptSectionId: 'section_001',
      footageSceneId: 'scene_001',
      startTime: 0,
      endTime: 24,
      relevance: 0.94,
      reason: 'Transcript and topic closely match the script section.',
    },
  ],
};

export const DefaultClipCandidate = {
  id: 'clip_001',
  title: 'The #1 Automation Hack for Modern Creators',
  startTime: 10,
  endTime: 45,
  duration: 35,
  sourceReason: 'Contains an immediate curiosity hook and complete standalone solution.',
  hook: 'Stop editing every video manually — here is how to automate the boring stuff.',
  clipScore: 92,
  audienceFit: 89,
  suggestedCaption: 'How much time do you spend editing every week? Try this workflow instead. ⚡️ #CreatorTips #Automation',
  suggestedCTA: 'Comment WORKFLOW for the full template.',
};

export const DefaultEditSuggestion = {
  cuts: [
    { startTime: 0, endTime: 1.2, reason: 'Remove silent pause before speech start' },
    { startTime: 22.4, endTime: 24.1, reason: 'Trim filler repetition' },
  ],
  suggestedStartTime: 1.2,
  suggestedEndTime: 34.5,
  removeSilence: true,
  captionStyle: 'Bold kinetic pop captions, yellow-cyan emphasis',
  hookOverlay: '⚡️ Save 10 Hours / Week',
  bRollSuggestions: ['B-roll of editing timeline zoom at 00:08', 'Split-screen tool comparison at 00:20'],
  transitionSuggestions: ['Quick whip pan transition into the main feature breakdown'],
  musicSuggestion: 'Upbeat Lo-Fi tech instrumental (118 BPM, subtle bassline)',
  aspectRatio: '9:16',
  notes: [
    'Opening 3 seconds has high vocal clarity.',
    'Keep overlays in the safe zone away from platform UI icons.',
  ],
};

export const DefaultOpportunity = {
  id: 'opp_001',
  title: 'Practical AI Video Automation Workflow',
  description: 'Break down the exact multi-platform publishing stack your audience frequently asks about.',
  audienceFit: 94,
  contentFit: 91,
  relevance: 95,
  reason: 'Historical analytics show practical workflow posts generate 2.8x higher saves than theoretical posts.',
  supportingInsights: [
    'Tutorial format had highest comment rate last month',
    'Audience search volume for creator workflows grew by 42%',
  ],
  recommendedPlatform: 'YouTube Shorts',
  recommendedFormat: '60-Second Rapid Breakdown',
};

export const DefaultPlatformContent = {
  platform: 'Instagram Reel',
  title: 'Automate Your Creator Workflow in 60s',
  hook: 'If you are spending more than 2 hours editing short videos, you are doing it wrong.',
  script: 'Here is the step-by-step pipeline used by top creators to repurpose long videos into 10 clips...',
  caption: 'Stop wasting hours on repetitive edits. Save this post for your next shoot! 🚀\n\nDrop a comment if you want the breakdown.',
  hashtags: ['#CreatorEconomy', '#VideoEditing', '#ProductivityHacks', '#ContentCreation', '#AItools'],
  cta: 'Save this post and share with a creator friend!',
  formatting: {
    aspectRatio: '9:16',
    durationTarget: '30-45s',
    pacing: 'Fast cuts every 2.5 seconds',
  },
};

export const DefaultContentCritic = {
  overallScore: 82,
  hookScore: 85,
  clarityScore: 88,
  audienceFit: 84,
  originalityScore: 78,
  ctaScore: 76,
  strengths: [
    'Fast-paced opening gets to the point quickly',
    'High relevance to current creator pain points',
  ],
  problems: [
    'The middle section slows down slightly with excessive jargon',
    'The call-to-action asks for two different things at once',
  ],
  suggestions: [
    'Simplify technical terms to keep broader audience engaged',
    'Focus on a single, compelling CTA rather than multiple asks',
  ],
  improvedContent:
    'Hook: Stop spending 4 hours editing every video.\n\nProblem: Most creators burn out doing manual cuts.\n\nSolution: Use this automated 3-step pipeline to extract top moments instantly.\n\nAction: Comment "PIPELINE" and I will send you the exact template.',
};

export const DefaultLearningResult = {
  detectedPatterns: [
    'Posts with question-based hooks retain 22% more viewers past the 5-second mark',
    'Tutorial-based content drove 3x more bookmarks than opinion pieces',
  ],
  successfulPatterns: [
    'Fast visual pacing in opening 3 seconds',
    'Concrete numeric proof in hook statements',
  ],
  weakPatterns: [
    'Introductory self-introductions before value delivery',
    'Multiple calls to action in a single post',
  ],
  newInsights: [
    'Audience responds strongest to time-saving productivity workflows over abstract philosophy.',
  ],
  recommendedUpdates: [
    'Increase weight of practical tutorial topics in future recommendations',
    'Prioritize 9:16 vertical short format for tech productivity topics',
  ],
  updatedCreatorTwin: {},
};

// ============================================================
// PARSING & VALIDATION HELPERS
// ============================================================

/**
 * Safely parses JSON strings, repairing common AI formatting artifacts
 * such as markdown code fences (```json), trailing commas, or surrounding commentary.
 *
 * @param {string|any} raw - Raw AI string response or object
 * @param {any} [fallback=null] - Fallback object if parsing fails
 * @returns {any} Parsed object or fallback
 */
export function safeParseJSON(raw, fallback = null) {
  if (raw === null || raw === undefined) return fallback;
  if (typeof raw === 'object') return raw;

  if (typeof raw !== 'string') return fallback;

  let text = raw.trim();

  // Strip markdown code fences if present (e.g. ```json ... ``` or ``` ...)
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  }

  // Attempt direct JSON parse
  try {
    return JSON.parse(text);
  } catch (err) {
    // Attempt recovery heuristic: extract innermost or outermost JSON object/array
    try {
      const firstCurly = text.indexOf('{');
      const lastCurly = text.lastIndexOf('}');
      if (firstCurly !== -1 && lastCurly > firstCurly) {
        const potentialObj = text.slice(firstCurly, lastCurly + 1);
        return JSON.parse(potentialObj);
      }

      const firstSquare = text.indexOf('[');
      const lastSquare = text.lastIndexOf(']');
      if (firstSquare !== -1 && lastSquare > firstSquare) {
        const potentialArr = text.slice(firstSquare, lastSquare + 1);
        return JSON.parse(potentialArr);
      }
    } catch (innerErr) {
      // Recovery failed, return fallback
      return fallback;
    }
  }

  return fallback;
}

/**
 * Validates and sanitizes a CreatorTwin object against the contract.
 * @param {object} input
 * @returns {object} Validated CreatorTwin
 */
export function validateCreatorTwin(input) {
  const src = input && typeof input === 'object' ? input : {};
  return {
    niche: typeof src.niche === 'string' && src.niche ? src.niche : DefaultCreatorTwin.niche,
    audience: typeof src.audience === 'string' && src.audience ? src.audience : DefaultCreatorTwin.audience,
    language: typeof src.language === 'string' && src.language ? src.language : DefaultCreatorTwin.language,
    tone: typeof src.tone === 'string' && src.tone ? src.tone : (typeof src.tone === 'object' && src.tone.primary ? src.tone.primary : DefaultCreatorTwin.tone),
    goals: Array.isArray(src.goals) && src.goals.length ? src.goals : DefaultCreatorTwin.goals,
    preferredPlatforms: Array.isArray(src.preferredPlatforms) && src.preferredPlatforms.length ? src.preferredPlatforms : DefaultCreatorTwin.preferredPlatforms,
    bestTopics: Array.isArray(src.bestTopics) && src.bestTopics.length ? src.bestTopics : DefaultCreatorTwin.bestTopics,
    weakTopics: Array.isArray(src.weakTopics) ? src.weakTopics : DefaultCreatorTwin.weakTopics,
    bestFormats: Array.isArray(src.bestFormats) && src.bestFormats.length ? src.bestFormats : DefaultCreatorTwin.bestFormats,
    bestHooks: Array.isArray(src.bestHooks) && src.bestHooks.length ? src.bestHooks : DefaultCreatorTwin.bestHooks,
    audienceInterests: Array.isArray(src.audienceInterests) && src.audienceInterests.length ? src.audienceInterests : DefaultCreatorTwin.audienceInterests,
    successfulPatterns: Array.isArray(src.successfulPatterns) ? src.successfulPatterns : DefaultCreatorTwin.successfulPatterns,
    weakAreas: Array.isArray(src.weakAreas) ? src.weakAreas : DefaultCreatorTwin.weakAreas,
    contentPreferences: Array.isArray(src.contentPreferences) ? src.contentPreferences : DefaultCreatorTwin.contentPreferences,
    summary: typeof src.summary === 'string' && src.summary ? src.summary : DefaultCreatorTwin.summary,
    confidence: typeof src.confidence === 'number' && !isNaN(src.confidence) ? Number(src.confidence.toFixed(2)) : DefaultCreatorTwin.confidence,
  };
}

/**
 * Validates and sanitizes a ContentAnalysis object against the contract.
 * @param {object} input
 * @returns {object}
 */
export function validateContentAnalysis(input) {
  const src = input && typeof input === 'object' ? input : {};
  return {
    score: typeof src.score === 'number' ? src.score : DefaultContentAnalysis.score,
    hookScore: typeof src.hookScore === 'number' ? src.hookScore : DefaultContentAnalysis.hookScore,
    clarityScore: typeof src.clarityScore === 'number' ? src.clarityScore : DefaultContentAnalysis.clarityScore,
    audienceFit: typeof src.audienceFit === 'number' ? src.audienceFit : DefaultContentAnalysis.audienceFit,
    ctaScore: typeof src.ctaScore === 'number' ? src.ctaScore : DefaultContentAnalysis.ctaScore,
    originalityScore: typeof src.originalityScore === 'number' ? src.originalityScore : DefaultContentAnalysis.originalityScore,
    strengths: Array.isArray(src.strengths) ? src.strengths : DefaultContentAnalysis.strengths,
    weaknesses: Array.isArray(src.weaknesses) ? src.weaknesses : DefaultContentAnalysis.weaknesses,
    suggestions: Array.isArray(src.suggestions) ? src.suggestions : DefaultContentAnalysis.suggestions,
  };
}

/**
 * Validates and sanitizes a ScriptAnalysis object.
 * @param {object} input
 * @returns {object}
 */
export function validateScriptAnalysis(input) {
  const src = input && typeof input === 'object' ? input : {};
  const sections = Array.isArray(src.sections) && src.sections.length
    ? src.sections.map((s, idx) => ({
        id: s.id || `section_${String(idx + 1).padStart(3, '0')}`,
        startPosition: typeof s.startPosition === 'number' ? s.startPosition : 0,
        endPosition: typeof s.endPosition === 'number' ? s.endPosition : 100,
        text: s.text || '',
        topic: s.topic || 'General Topic',
        importance: typeof s.importance === 'number' ? s.importance : 0.7,
        hookPotential: typeof s.hookPotential === 'number' ? s.hookPotential : 0.6,
        clipPotential: typeof s.clipPotential === 'number' ? s.clipPotential : 0.6,
      }))
    : DefaultScriptAnalysis.sections;

  return {
    sections,
    keyTopics: Array.isArray(src.keyTopics) ? src.keyTopics : DefaultScriptAnalysis.keyTopics,
    hooks: Array.isArray(src.hooks) ? src.hooks : DefaultScriptAnalysis.hooks,
    ctaSections: Array.isArray(src.ctaSections) ? src.ctaSections : DefaultScriptAnalysis.ctaSections,
  };
}

/**
 * Validates and sanitizes a FootageAnalysis object.
 * @param {object} input
 * @returns {object}
 */
export function validateFootageAnalysis(input) {
  const src = input && typeof input === 'object' ? input : {};
  const scenes = Array.isArray(src.scenes) && src.scenes.length
    ? src.scenes.map((sc, idx) => ({
        id: sc.id || `scene_${String(idx + 1).padStart(3, '0')}`,
        startTime: typeof sc.startTime === 'number' ? sc.startTime : 0,
        endTime: typeof sc.endTime === 'number' ? sc.endTime : 30,
        transcript: sc.transcript || '',
        topic: sc.topic || 'General Scene',
        importance: typeof sc.importance === 'number' ? sc.importance : 0.7,
        clipPotential: typeof sc.clipPotential === 'number' ? sc.clipPotential : 0.6,
      }))
    : DefaultFootageAnalysis.scenes;

  return {
    duration: typeof src.duration === 'number' ? src.duration : DefaultFootageAnalysis.duration,
    scenes,
    keyMoments: Array.isArray(src.keyMoments) ? src.keyMoments : DefaultFootageAnalysis.keyMoments,
    suggestedMoments: Array.isArray(src.suggestedMoments) ? src.suggestedMoments : DefaultFootageAnalysis.suggestedMoments,
  };
}

/**
 * Validates and sanitizes a ScriptFootageMatch object.
 * @param {object} input
 * @returns {object}
 */
export function validateScriptFootageMatch(input) {
  const src = input && typeof input === 'object' ? input : {};
  const matches = Array.isArray(src.matches) && src.matches.length
    ? src.matches.map((m, idx) => ({
        scriptSectionId: m.scriptSectionId || `section_${String(idx + 1).padStart(3, '0')}`,
        footageSceneId: m.footageSceneId || `scene_${String(idx + 1).padStart(3, '0')}`,
        startTime: typeof m.startTime === 'number' ? m.startTime : 0,
        endTime: typeof m.endTime === 'number' ? m.endTime : 30,
        relevance: typeof m.relevance === 'number' ? m.relevance : 0.85,
        reason: m.reason || 'Transcript and topic closely match the script section.',
      }))
    : DefaultScriptFootageMatch.matches;

  return { matches };
}

/**
 * Validates an array of clip candidates.
 * @param {Array|object} input
 * @returns {Array}
 */
export function validateClipCandidates(input) {
  const list = Array.isArray(input) ? input : (input && Array.isArray(input.clips) ? input.clips : [DefaultClipCandidate]);
  if (!list.length) return [DefaultClipCandidate];

  return list.map((c, idx) => ({
    id: c.id || `clip_${String(idx + 1).padStart(3, '0')}`,
    title: c.title || `Highlight Clip #${idx + 1}`,
    startTime: typeof c.startTime === 'number' ? c.startTime : 0,
    endTime: typeof c.endTime === 'number' ? c.endTime : 30,
    duration: typeof c.duration === 'number' ? c.duration : Math.max(0, (c.endTime || 30) - (c.startTime || 0)),
    sourceReason: c.sourceReason || 'Identified as high-retention segment.',
    hook: c.hook || 'Watch this before your next shoot.',
    clipScore: typeof c.clipScore === 'number' ? c.clipScore : 85,
    audienceFit: typeof c.audienceFit === 'number' ? c.audienceFit : 85,
    suggestedCaption: c.suggestedCaption || 'Check out this key tip! #CreatorAI',
    suggestedCTA: c.suggestedCTA || 'Follow for more updates.',
  }));
}

/**
 * Validates and sanitizes Edit Suggestions.
 * @param {object} input
 * @returns {object}
 */
export function validateEditSuggestions(input) {
  const src = input && typeof input === 'object' ? input : {};
  return {
    cuts: Array.isArray(src.cuts) ? src.cuts : DefaultEditSuggestion.cuts,
    suggestedStartTime: typeof src.suggestedStartTime === 'number' ? src.suggestedStartTime : DefaultEditSuggestion.suggestedStartTime,
    suggestedEndTime: typeof src.suggestedEndTime === 'number' ? src.suggestedEndTime : DefaultEditSuggestion.suggestedEndTime,
    removeSilence: typeof src.removeSilence === 'boolean' ? src.removeSilence : DefaultEditSuggestion.removeSilence,
    captionStyle: src.captionStyle || DefaultEditSuggestion.captionStyle,
    hookOverlay: src.hookOverlay || DefaultEditSuggestion.hookOverlay,
    bRollSuggestions: Array.isArray(src.bRollSuggestions) ? src.bRollSuggestions : DefaultEditSuggestion.bRollSuggestions,
    transitionSuggestions: Array.isArray(src.transitionSuggestions) ? src.transitionSuggestions : DefaultEditSuggestion.transitionSuggestions,
    musicSuggestion: src.musicSuggestion || DefaultEditSuggestion.musicSuggestion,
    aspectRatio: src.aspectRatio || DefaultEditSuggestion.aspectRatio,
    notes: Array.isArray(src.notes) ? src.notes : DefaultEditSuggestion.notes,
  };
}

/**
 * Validates an array of Opportunities.
 * @param {Array|object} input
 * @returns {Array}
 */
export function validateOpportunities(input) {
  const list = Array.isArray(input) ? input : (input && Array.isArray(input.opportunities) ? input.opportunities : [DefaultOpportunity]);
  if (!list.length) return [DefaultOpportunity];

  return list.map((opp, idx) => ({
    id: opp.id || `opp_${String(idx + 1).padStart(3, '0')}`,
    title: opp.title || 'High-Engagement Content Opportunity',
    description: opp.description || 'Explore this emerging topic tailored to your audience.',
    audienceFit: typeof opp.audienceFit === 'number' ? opp.audienceFit : 90,
    contentFit: typeof opp.contentFit === 'number' ? opp.contentFit : 88,
    relevance: typeof opp.relevance === 'number' ? opp.relevance : 92,
    reason: opp.reason || 'Pattern matches high-performing past content themes.',
    supportingInsights: Array.isArray(opp.supportingInsights) ? opp.supportingInsights : ['High audience retention on similar themes'],
    recommendedPlatform: opp.recommendedPlatform || 'YouTube Shorts',
    recommendedFormat: opp.recommendedFormat || 'Short-form breakdown',
  }));
}

/**
 * Validates Content Critic output.
 * @param {object} input
 * @returns {object}
 */
export function validateContentCritic(input) {
  const src = input && typeof input === 'object' ? input : {};
  return {
    overallScore: typeof src.overallScore === 'number' ? src.overallScore : DefaultContentCritic.overallScore,
    hookScore: typeof src.hookScore === 'number' ? src.hookScore : DefaultContentCritic.hookScore,
    clarityScore: typeof src.clarityScore === 'number' ? src.clarityScore : DefaultContentCritic.clarityScore,
    audienceFit: typeof src.audienceFit === 'number' ? src.audienceFit : DefaultContentCritic.audienceFit,
    originalityScore: typeof src.originalityScore === 'number' ? src.originalityScore : DefaultContentCritic.originalityScore,
    ctaScore: typeof src.ctaScore === 'number' ? src.ctaScore : DefaultContentCritic.ctaScore,
    strengths: Array.isArray(src.strengths) ? src.strengths : DefaultContentCritic.strengths,
    problems: Array.isArray(src.problems) ? src.problems : DefaultContentCritic.problems,
    suggestions: Array.isArray(src.suggestions) ? src.suggestions : DefaultContentCritic.suggestions,
    improvedContent: typeof src.improvedContent === 'string' && src.improvedContent ? src.improvedContent : DefaultContentCritic.improvedContent,
  };
}

/**
 * Validates Platform Content output.
 * @param {object} input
 * @returns {object}
 */
export function validatePlatformContent(input) {
  const src = input && typeof input === 'object' ? input : {};
  return {
    platform: src.platform || DefaultPlatformContent.platform,
    title: src.title || DefaultPlatformContent.title,
    hook: src.hook || DefaultPlatformContent.hook,
    script: src.script || DefaultPlatformContent.script,
    caption: src.caption || DefaultPlatformContent.caption,
    hashtags: Array.isArray(src.hashtags) ? src.hashtags : DefaultPlatformContent.hashtags,
    cta: src.cta || DefaultPlatformContent.cta,
    formatting: src.formatting && typeof src.formatting === 'object' ? src.formatting : DefaultPlatformContent.formatting,
  };
}

/**
 * Validates Learning Engine output.
 * @param {object} input
 * @returns {object}
 */
export function validateLearningResult(input) {
  const src = input && typeof input === 'object' ? input : {};
  return {
    detectedPatterns: Array.isArray(src.detectedPatterns) ? src.detectedPatterns : DefaultLearningResult.detectedPatterns,
    successfulPatterns: Array.isArray(src.successfulPatterns) ? src.successfulPatterns : DefaultLearningResult.successfulPatterns,
    weakPatterns: Array.isArray(src.weakPatterns) ? src.weakPatterns : DefaultLearningResult.weakPatterns,
    newInsights: Array.isArray(src.newInsights) ? src.newInsights : DefaultLearningResult.newInsights,
    recommendedUpdates: Array.isArray(src.recommendedUpdates) ? src.recommendedUpdates : DefaultLearningResult.recommendedUpdates,
    updatedCreatorTwin: src.updatedCreatorTwin && typeof src.updatedCreatorTwin === 'object'
      ? validateCreatorTwin(src.updatedCreatorTwin)
      : DefaultCreatorTwin,
  };
}

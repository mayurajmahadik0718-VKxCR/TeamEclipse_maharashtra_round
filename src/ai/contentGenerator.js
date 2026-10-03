/**
 * @file src/ai/contentGenerator.js
 * @description Hook, Script, Supporting Content & Multi-Piece Campaign Generator for CreatorAI.
 *
 * Utilizes the Creator Digital Twin persona to generate authentic, high-converting hooks,
 * structured timed scripts, platform captions, pinned comments, and campaign plans.
 */

import { generateStructuredOutput } from './aiClient.js';
import { createSuccessResponse, createErrorResponse } from '../contracts/index.js';

// ============================================================
// 1. GENERATE HOOK
// ============================================================

function buildMockHooks(input = {}) {
  const topic = input.topic || 'AI Productivity Workflows';
  const twin = input.creatorTwin || {};
  const niche = twin.niche || 'Tech';
  const tone = twin.tone || 'Actionable and clear';

  return {
    primaryHook: `Stop doing this manually — here is how to automate ${topic.toLowerCase()} in 60 seconds.`,
    alternatives: [
      {
        style: 'Contrarian / Myth-Buster',
        hook: `Most creators get ${topic.toLowerCase()} completely backwards. Here is the real secret:`,
        visualAction: 'Shake head while pointing to a striking on-screen stat chart.',
      },
      {
        style: 'Curiosity Gap',
        hook: `I tested 10 different ways to handle ${topic.toLowerCase()} — only one actually worked.`,
        visualAction: 'Quick 1-second montage showing failed attempts vs clean final output.',
      },
      {
        style: 'High-Stakes Metric',
        hook: `This single tweak to your ${niche.toLowerCase()} setup will save you 8 hours this week.`,
        visualAction: 'Timer overlay rapidly ticking down from 8:00:00 to 0:00:00.',
      },
    ],
    visualHookDirection: 'Start immediately in media res with screen recording active; zero introductory pause.',
    retentionTip: 'Keep on-screen text highlight synced with the spoken word "automate".',
  };
}

/**
 * Generates tailored, high-retention video hooks based on creator persona and topic.
 *
 * @param {object} input
 * @param {string} input.topic - Topic or premise
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {string} [input.platform] - Target platform
 * @param {string} [input.hookStyle] - Optional style preference
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function generateHook(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object containing topic.');
    }

    const systemPrompt = `You are CreatorAI's Hook Generation Specialist.
Generate high-retention video hooks tailored to the creator's authentic voice, niche, and target audience.
Provide a primary hook, 3 psychological angle alternatives (Contrarian, Curiosity Gap, High Stakes),
along with visual hook direction and retention tips.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "primaryHook": "string",
  "alternatives": [
    { "style": "string", "hook": "string", "visualAction": "string" }
  ],
  "visualHookDirection": "string",
  "retentionTip": "string"
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: (data) => data,
      mockDataGenerator: () => buildMockHooks(input),
      fallbackData: buildMockHooks(input),
      temperature: 0.6,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to generate hook.');
  }
}

// ============================================================
// 2. GENERATE SCRIPT
// ============================================================

function buildMockScript(input = {}) {
  const topic = input.topic || 'Automate Your Creator Workflow';
  const twin = input.creatorTwin || {};
  const platform = input.platform || 'Instagram Reels';
  const duration = input.targetDuration || 45;

  const hook = `If you spend more than 2 hours editing short videos, you are doing it wrong.`;
  const problem = `Most creators spend 80% of their energy on tedious cuts, captioning, and format adjustments instead of actually creating.`;
  const solution = `Here is the 3-step pipeline: First, record in one continuous flow. Second, feed your transcript into CreatorAI to detect winning moments automatically. Third, export styled clips with zero manual keyframing.`;
  const cta = `Comment "PIPELINE" below and I will send you the complete step-by-step setup!`;

  return {
    title: `How to 10x Your ${topic} Output`,
    targetDuration: `${duration}s`,
    platform,
    hook,
    body: `${problem}\n\n${solution}`,
    cta,
    fullScriptText: `${hook}\n\n${problem}\n\n${solution}\n\n${cta}`,
    sceneBreakdown: [
      {
        sceneNumber: 1,
        timecode: '00:00 - 00:04',
        section: 'Hook',
        spokenDialogue: hook,
        visualPrompt: 'Close-up on creator looking directly at lens, vibrant neon text overlay appears.',
        soundFX: 'Whoosh transition sound',
      },
      {
        sceneNumber: 2,
        timecode: '00:04 - 00:15',
        section: 'Problem',
        spokenDialogue: problem,
        visualPrompt: 'Fast B-roll montage of cluttered editing timelines and frustrated creator expressions.',
        soundFX: 'Low tension riser',
      },
      {
        sceneNumber: 3,
        timecode: '00:15 - 00:35',
        section: 'Solution Breakdown',
        spokenDialogue: solution,
        visualPrompt: 'Clean screen recording demonstration highlighting the 3 automated steps.',
        soundFX: 'Subtle uplifting lo-fi beat drops',
      },
      {
        sceneNumber: 4,
        timecode: '00:35 - 00:45',
        section: 'Call To Action',
        spokenDialogue: cta,
        visualPrompt: 'Return to creator on camera with animated comment bubble overlay.',
        soundFX: 'Pop notification sound',
      },
    ],
  };
}

/**
 * Generates a full structured production script with visual cues and scene breakdowns.
 *
 * @param {object} input
 * @param {string} input.topic - Script subject matter
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {string} [input.platform] - Target platform
 * @param {number} [input.targetDuration] - Target video duration in seconds
 * @param {Array} [input.keyPoints] - Specific points to cover
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function generateScript(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object containing topic.');
    }

    const systemPrompt = `You are CreatorAI's Script Writing Director.
Write a full, high-converting video script tailored to the creator's voice, pacing, and target platform.
Include timed scene breakdowns with visual prompts, spoken dialogue, camera angles, and sound FX cues.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "title": "string",
  "targetDuration": "45s",
  "platform": "string",
  "hook": "string",
  "body": "string",
  "cta": "string",
  "fullScriptText": "string",
  "sceneBreakdown": [
    {
      "sceneNumber": 1,
      "timecode": "00:00 - 00:05",
      "section": "Hook",
      "spokenDialogue": "string",
      "visualPrompt": "string",
      "soundFX": "string"
    }
  ]
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: (data) => data,
      mockDataGenerator: () => buildMockScript(input),
      fallbackData: buildMockScript(input),
      temperature: 0.5,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to generate script.');
  }
}

// ============================================================
// 3. GENERATE SUPPORTING CONTENT
// ============================================================

function buildMockSupportingContent(input = {}) {
  const twin = input.creatorTwin || {};
  const niche = twin.niche || 'Tech';
  const platform = input.platform || 'Instagram';

  return {
    titles: [
      `How to Automate ${niche} Content Without Burning Out`,
      `The Exact 3-Step System I Use to Repurpose Long Videos`,
      `Stop Editing Videos Manually (Do This Instead)`,
    ],
    caption: `Most creators burn out because they spend 80% of their time on manual edits instead of making great content. 🛑\n\nHere is the 3-step pipeline I use to turn 1 long video into 10 high-performing short clips in minutes.\n\nSave this post so you have it ready for your next shoot! ⚡️`,
    hashtags: [
      `#${niche.replace(/\s+/g, '')}`,
      '#CreatorEconomy',
      '#VideoEditing',
      '#ContentStrategy',
      '#ProductivityTips',
      '#AIWorkflow',
    ],
    pinnedComment: `Which step of your editing workflow takes you the longest right now? Let me know below and I’ll share how to automate it! 👇`,
    newsletterBlurb: `Subject: The 60-Second Video Automation Hack\n\nHey creators — if editing is eating up your weekends, this week we broke down the exact framework to automate moment extraction and captions. Read the full guide here.`,
  };
}

/**
 * Generates supporting metadata: viral titles, platform-optimized captions, hashtags,
 * pinned conversation-starting comments, and newsletter summaries.
 *
 * @param {object} input
 * @param {object|string} [input.scriptOrClip] - Source script or clip metadata
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {string} [input.platform] - Target platform
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function generateSupportingContent(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object.');
    }

    const systemPrompt = `You are CreatorAI's Supporting Content Generator.
Generate 3 viral click-worthy titles, an engaging caption formatted with line breaks and emojis,
strategic hashtags, a conversation-sparking pinned comment, and a newsletter blurb.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "titles": ["string"],
  "caption": "string",
  "hashtags": ["string"],
  "pinnedComment": "string",
  "newsletterBlurb": "string"
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: (data) => data,
      mockDataGenerator: () => buildMockSupportingContent(input),
      fallbackData: buildMockSupportingContent(input),
      temperature: 0.5,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to generate supporting content.');
  }
}

// ============================================================
// 4. GENERATE CAMPAIGN
// ============================================================

function buildMockCampaign(input = {}) {
  const theme = input.theme || 'Creator Automation Launch';
  const twin = input.creatorTwin || {};
  const niche = twin.niche || 'Digital Productivity';

  return {
    campaignTitle: `${theme} Master Series`,
    theme,
    targetAudience: twin.audience || `Ambitious creators and practitioners in ${niche}`,
    coreMessage: `Work smarter, not harder: how modern AI systems unlock authentic creator velocity.`,
    pillars: [
      'Pillar 1: Common Mistakes & Burnout Traps',
      'Pillar 2: Step-by-Step Hands-on Demonstration',
      'Pillar 3: Proof, Case Studies & Real Results',
    ],
    contentPlan: [
      {
        platform: 'YouTube',
        format: 'Long-form deep dive (10-12 mins)',
        hook: `I automated my entire video production pipeline for 30 days. Here is what happened.`,
        angle: 'Comprehensive technical walkthrough',
        suggestedTiming: 'Day 1 (Anchor Video)',
      },
      {
        platform: 'YouTube Shorts',
        format: 'Vertical Short (50s)',
        hook: `Stop editing every single cut by hand.`,
        angle: 'Fast tool spotlight clip extracted from anchor video',
        suggestedTiming: 'Day 2',
      },
      {
        platform: 'Instagram Reels',
        format: 'Visual Reel (35s)',
        hook: `The 3-step pipeline top creators use in secret:`,
        angle: 'Aesthetic split-screen before/after demo',
        suggestedTiming: 'Day 3',
      },
      {
        platform: 'LinkedIn',
        format: 'Insight Article + Carousel',
        hook: `Why the most successful creators in 2026 operate like agile engineering teams.`,
        angle: 'Professional thought leadership & workflow economics',
        suggestedTiming: 'Day 5',
      },
    ],
    expectedOutcomes: [
      'Establish creator as the premier authority in automated workflows',
      'Drive high cross-platform traffic back to primary channel',
      'Generate sustained audience saves and comment discussions',
    ],
  };
}

/**
 * Generates an end-to-end multi-platform content campaign roadmap.
 *
 * @param {object} input
 * @param {string} input.theme - Main campaign concept or launch topic
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {Array} [input.goals] - Campaign objectives
 * @param {string} [input.timeframe] - Desired schedule (e.g. '1-week sprint', '30-day series')
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function generateCampaign(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object.');
    }

    const systemPrompt = `You are CreatorAI's Strategic Campaign Architect.
Design a cohesive multi-platform content campaign roadmap around the theme.
Detail pillars, cross-platform schedules (YouTube, Shorts, Reels, LinkedIn), angles, and expected outcomes.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "campaignTitle": "string",
  "theme": "string",
  "targetAudience": "string",
  "coreMessage": "string",
  "pillars": ["string"],
  "contentPlan": [
    {
      "platform": "string",
      "format": "string",
      "hook": "string",
      "angle": "string",
      "suggestedTiming": "string"
    }
  ],
  "expectedOutcomes": ["string"]
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: (data) => data,
      mockDataGenerator: () => buildMockCampaign(input),
      fallbackData: buildMockCampaign(input),
      temperature: 0.5,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to generate campaign.');
  }
}

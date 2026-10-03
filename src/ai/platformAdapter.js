/**
 * @file src/ai/platformAdapter.js
 * @description Multi-Platform Content Adaptation Engine for CreatorAI.
 *
 * Repurposes core creator content authentically across platforms:
 * - YouTube (long-form chapters, SEO descriptions, subscribe CTAs)
 * - YouTube Shorts (rapid pacing, visual cues, #Shorts)
 * - Instagram (feed/carousel storytelling, visual cues)
 * - Instagram Reels (kinetic 9:16, audio prompts, comment triggers)
 * - LinkedIn (professional thought leadership, white-space formatting, business impact)
 *
 * CRITICAL RULE: Never copies verbatim. Transforms length, tone, structure, CTA,
 * formatting, and hashtags to match native platform algorithms.
 */

import { generateStructuredOutput } from './aiClient.js';
import { validatePlatformContent, DefaultPlatformContent, createErrorResponse } from '../contracts/index.js';

/**
 * Normalizes input platform string to a supported platform name.
 * @param {string} rawPlatform
 * @returns {string}
 */
function normalizePlatform(rawPlatform = '') {
  const p = rawPlatform.toLowerCase().trim();
  if (p.includes('shorts')) return 'YouTube Shorts';
  if (p.includes('youtube')) return 'YouTube';
  if (p.includes('reel')) return 'Instagram Reels';
  if (p.includes('instagram')) return 'Instagram';
  if (p.includes('linkedin')) return 'LinkedIn';
  return 'Instagram Reels';
}

/**
 * Builds realistic platform-specific adapted content.
 *
 * @param {object} input
 * @returns {object}
 */
function buildMockAdaptedContent(input = {}) {
  const source = input.sourceContent || {};
  const rawText = typeof source === 'string' ? source : (source.script || source.text || source.title || 'Creator automation strategies');
  const twin = input.creatorTwin || {};
  const targetPlatform = normalizePlatform(input.platform);
  const niche = twin.niche || 'Tech';

  switch (targetPlatform) {
    case 'YouTube':
      return {
        platform: 'YouTube',
        title: `The Complete Guide to Automating ${niche} (Full Masterclass)`,
        hook: `In this deep dive, you will learn the exact step-by-step framework to automate your entire content pipeline from scratch.`,
        script: `[00:00] Introduction & Why Most Systems Fail\n[02:15] Step 1: Automated Ideation & Persona Mapping\n[05:30] Step 2: Frictionless Recording & Transcript Extraction\n[08:45] Step 3: Multi-Platform Repurposing With AI\n[11:20] Final Results & Resources`,
        caption: `Stop burning out on repetitive edits. In this video, we break down the exact operational blueprint modern creators use to publish consistently across 4 platforms without working 60 hours a week.\n\nTimestamps:\n0:00 - Why Manual Workflows Fail\n2:15 - Persona Alignment\n5:30 - Recording Automation\n8:45 - Multi-Platform Distribution\n11:20 - Free Resource Checklist\n\n📌 Download the complete workflow template in the description below!`,
        hashtags: ['#CreatorEconomy', '#WorkflowAutomation', `#${niche.replace(/\s+/g, '')}`, '#ContentCreation'],
        cta: 'Subscribe for weekly creator engineering breakdowns, and download the starter blueprint in the pinned comment below!',
        formatting: {
          aspectRatio: '16:9',
          suggestedDuration: '10-15 minutes',
          structure: 'Structured Chapters with visual title cards and screen shares',
        },
      };

    case 'YouTube Shorts':
      return {
        platform: 'YouTube Shorts',
        title: `Stop Editing Videos by Hand 🛑 #Shorts`,
        hook: `You are wasting 80% of your time editing if you still do this manually.`,
        script: `Here is the 3-step automation hack:\n1. Shoot one continuous video.\n2. Let CreatorAI auto-detect your top retention hooks.\n3. Export styled vertical clips in 60 seconds.\nTry this on your next upload!`,
        caption: `How many hours do you spend editing every week? Try this workflow instead! ⚡️ #Shorts #${niche.replace(/\s+/g, '')} #CreatorTips`,
        hashtags: ['#Shorts', '#CreatorTips', '#AutomationHacks', `#${niche.replace(/\s+/g, '')}`],
        cta: 'Hit Subscribe for 60-second creator tips every single day!',
        formatting: {
          aspectRatio: '9:16',
          suggestedDuration: '30-45 seconds',
          structure: 'Fast cuts every 2 seconds with high-contrast centered text overlays',
        },
      };

    case 'Instagram':
      return {
        platform: 'Instagram',
        title: `5 Steps to Build Your ${niche} Digital Twin`,
        hook: `Swipe through to see the exact 5-step framework that saved me 15 hours last week ➡️`,
        script: `Slide 1: The Creator Burnout Trap\nSlide 2: What is a Creator Digital Twin?\nSlide 3: Calibrating your tone & audience rules\nSlide 4: Automated clip candidate selection\nSlide 5: Save this framework for your next planning session`,
        caption: `The most successful creators aren’t working harder — they have a smarter operating system. 🧠\n\nSwipe left to see the step-by-step breakdown of how a Creator Digital Twin works and how you can implement it today.\n\nDouble tap if this resonated! 💬`,
        hashtags: ['#CreatorTips', '#ContentStrategy', '#CarouselPost', '#ProductivityHacks', `#${niche.replace(/\s+/g, '')}`],
        cta: 'Save this post and share it to your story to help another creator!',
        formatting: {
          aspectRatio: '4:5',
          suggestedDuration: 'Carousel (5-7 visual slides)',
          structure: 'Swipeable informative cards with minimal text and bold graphic accents',
        },
      };

    case 'LinkedIn':
      return {
        platform: 'LinkedIn',
        title: `Why the Creator Economy is Undergoing an Operations Revolution`,
        hook: `Most content creators fail not because of poor ideas, but because of broken operations.`,
        script: `Over the past year, I analyzed how top modern media teams produce cross-platform content without expanding headcount.\n\nThe takeaway?\n\nThey treat content creation like software engineering:\n\n1. Single Source of Truth: Record one high-signal master asset.\n2. Modular Component Design: Extract self-contained insight units.\n3. Automated Distribution: Adapt formatting natively for each channel.\n\nThe result? A 4x increase in output velocity while keeping creative burnout at zero.\n\nHow is your team approaching content operations in 2026?`,
        caption: `Most creators fail not because of poor ideas, but because of broken operations.\n\nHere is how treating content like software engineering transforms creative velocity:\n\n1. Single Source of Truth\n2. Modular Insights\n3. Automated Repurposing\n\nThoughts? Let's discuss in the comments below.`,
        hashtags: ['#ContentOperations', '#CreatorEconomy', '#MediaStrategy', '#Leadership', '#Productivity'],
        cta: 'How does your organization handle cross-platform repurposing? Drop your perspective below.',
        formatting: {
          aspectRatio: 'Document Carousel / Text Post',
          suggestedDuration: '3-minute read',
          structure: 'Clean white-space line breaks, structured bullet points, professional dialogue',
        },
      };

    case 'Instagram Reels':
    default:
      return {
        platform: 'Instagram Reels',
        title: `The 60s ${niche} Automation Blueprint`,
        hook: `If you are spending more than 2 hours editing short videos, you need to watch this.`,
        script: `Here is the exact pipeline: Stop cutting everything by hand. Use a digital twin to extract your highest-impact moments, apply kinetic captions, and export ready-to-post vertical reels.`,
        caption: `Stop letting editing drain your creative energy. 🚀\n\nDrop a comment with "BLUEPRINT" and I will DM you the full setup guide!\n\nSave this for your next video shoot 📌`,
        hashtags: ['#InstagramReels', '#CreatorTips', '#VideoEditingHacks', `#${niche.replace(/\s+/g, '')}`, '#AITools'],
        cta: 'Comment "BLUEPRINT" and I will DM you the step-by-step template!',
        formatting: {
          aspectRatio: '9:16',
          suggestedDuration: '25-35 seconds',
          structure: 'Rapid visual demonstration with animated kinetic captions and trending audio',
        },
      };
  }
}

/**
 * Adapts source content for a specific target platform, altering length, tone,
 * hooks, formatting, structure, caption, and call-to-action.
 *
 * Supported platforms:
 * - 'YouTube'
 * - 'YouTube Shorts'
 * - 'Instagram'
 * - 'Instagram Reels'
 * - 'LinkedIn'
 *
 * @param {object} input
 * @param {object|string} input.sourceContent - Original script, clip, or idea
 * @param {object} [input.creatorTwin] - Creator Digital Twin persona
 * @param {string} input.platform - Target platform
 * @returns {Promise<{ success: boolean, data?: object, error?: object }>}
 */
export async function adaptContentForPlatform(input = {}) {
  try {
    if (!input || typeof input !== 'object') {
      return createErrorResponse('INVALID_INPUT', 'Input must be an object containing sourceContent and platform.');
    }

    if (!input.platform) {
      return createErrorResponse('INVALID_INPUT', 'A target "platform" string must be specified.');
    }

    const targetPlatform = normalizePlatform(input.platform);

    const systemPrompt = `You are CreatorAI's Multi-Platform Adaptation Engine.
Adapt the source content for ${targetPlatform}.
CRITICAL: Do NOT copy the content verbatim.
Modify length, tone, hook, structure, call-to-action, formatting, hashtags, and captions to natively align with ${targetPlatform}'s culture and algorithmic expectations.
Return strictly valid JSON adhering to the specified schema.`;

    const schemaDescription = `{
  "platform": "${targetPlatform}",
  "title": "string",
  "hook": "string",
  "script": "string",
  "caption": "string",
  "hashtags": ["string"],
  "cta": "string",
  "formatting": {
    "aspectRatio": "9:16",
    "suggestedDuration": "string",
    "structure": "string"
  }
}`;

    return await generateStructuredOutput(input, {
      systemPrompt,
      schemaDescription,
      validator: validatePlatformContent,
      mockDataGenerator: () => buildMockAdaptedContent(input),
      fallbackData: DefaultPlatformContent,
      temperature: 0.5,
    });
  } catch (err) {
    return createErrorResponse('AI_GENERATION_FAILED', 'Failed to adapt content for platform.');
  }
}

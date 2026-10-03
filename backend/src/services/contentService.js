import { loadMockData } from '../utils/dataLoader.js';
import { creatorService } from './creatorService.js';

let contents = loadMockData('content.json');

export const contentService = {
  getById: (id) => {
    return contents.find((c) => c.contentId === id);
  },

  getAll: () => {
    return contents;
  },

  generate: ({ creatorId, topic, platform, contentType, tone }) => {
    const twin = creatorService.getDigitalTwin(creatorId);
    const effectiveTone = tone || twin?.tone?.primary || 'friendly';
    const creatorName = twin?.creatorName || 'Creator';

    const newContentId = `content_${String(contents.length + 1).padStart(3, '0')}`;

    // Realistic generation tailored to inputs
    const newContent = {
      contentId: newContentId,
      creatorId,
      topic,
      platform,
      contentType,
      tone: effectiveTone,
      hook: `Stop making this common mistake with ${topic}! Here is what actually works in 2026.`,
      script: `[0:00 - 0:03] Quick visual hook highlighting ${topic}.\n[0:03 - 0:20] The #1 reason most creators and pros struggle with this.\n[0:20 - 0:45] The 3-step action plan to master ${topic} starting today.\n[0:45 - 0:60] Summary & call to action tailored for ${platform}.`,
      caption: `Master ${topic} with this breakdown by ${creatorName} 🚀 Drop your questions below and save this for reference!`,
      hashtags: [
        `#${topic.replace(/\s+/g, '')}`,
        `#${platform.charAt(0).toUpperCase() + platform.slice(1)}Creator`,
        `#CreatorAI`,
        `#GrowthHacks`,
        `#Mastery`
      ],
      status: 'ready_for_production',
      createdAt: new Date().toISOString(),
    };

    contents.push(newContent);
    return newContent;
  },
};

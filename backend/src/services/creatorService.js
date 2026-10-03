import { loadMockData } from '../utils/dataLoader.js';

let creators = loadMockData('creators.json');
let digitalTwins = loadMockData('digitalTwins.json');

export const creatorService = {
  getAll: () => {
    return creators;
  },

  getById: (id) => {
    return creators.find((c) => c.id === id);
  },

  create: (data) => {
    const newCreator = {
      id: `creator_${String(creators.length + 1).padStart(3, '0')}`,
      name: data.name,
      email: data.email,
      bio: data.bio || '',
      primaryNiche: data.primaryNiche,
      socialHandles: data.socialHandles || {},
      createdAt: new Date().toISOString(),
    };
    creators.push(newCreator);

    // Initialize an initial digital twin for this creator
    const newTwin = {
      twinId: `twin_${String(digitalTwins.length + 1).padStart(3, '0')}`,
      creatorId: newCreator.id,
      creatorName: newCreator.name,
      niche: newCreator.primaryNiche,
      targetAudience: {
        demographic: "General audience interested in " + newCreator.primaryNiche,
        painPoints: ["Looking for actionable advice", "Needs clear examples"],
        skillLevel: "Beginner"
      },
      tone: {
        primary: "friendly",
        attributes: ["approachable", "informative", "encouraging"]
      },
      preferredPlatforms: ["instagram", "youtube", "linkedin"],
      contentStyle: {
        hookStyle: "Direct question or intriguing insight",
        pacing: "Fast and clear",
        visualAesthetics: "Clean modern design",
        signaturePhrases: ["Let's dive in!"]
      },
      interests: [newCreator.primaryNiche],
      preferences: {
        emojiDensity: "moderate",
        defaultVideoFormat: "9:16 vertical reel",
        callToAction: "Follow for more insights",
        hashtagStrategy: "5 niche tags"
      },
      pastContentReference: [],
      lastUpdated: new Date().toISOString(),
    };
    digitalTwins.push(newTwin);

    return newCreator;
  },

  getDigitalTwin: (creatorId) => {
    return digitalTwins.find((twin) => twin.creatorId === creatorId);
  },
};

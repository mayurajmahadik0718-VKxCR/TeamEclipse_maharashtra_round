import { loadMockData } from '../utils/dataLoader.js';

let videos = loadMockData('videos.json');

export const videoService = {
  getById: (id) => {
    return videos.find((v) => v.videoId === id);
  },

  getAll: () => {
    return videos;
  },

  generate: ({ creatorId, contentId, title, script, aspectRatio = '9:16', visualStyle = 'minimal_tech', voiceProfile }) => {
    const newVideoId = `video_${String(videos.length + 1).padStart(3, '0')}`;

    const newVideo = {
      videoId: newVideoId,
      creatorId,
      contentId: contentId || null,
      title,
      status: 'processing',
      progressPercentage: 35,
      aspectRatio,
      estimatedDurationSeconds: 50,
      visualStyle,
      voiceProfile: voiceProfile || 'conversational_neutral',
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '0:00 - 0:05',
          narration: script.slice(0, 80) + '...',
          visualPrompt: `High definition opening shot, visual style ${visualStyle}, captivating focus on topic ${title}`,
          bRollKeywords: ['intro', 'technology', 'cinematic']
        },
        {
          sceneNumber: 2,
          timestamp: '0:05 - 0:25',
          narration: 'Deep dive breakdown and step-by-step walk through.',
          visualPrompt: `Dynamic visual infographic with smooth animations and neon accents`,
          bRollKeywords: ['infographic', 'breakdown', 'workflow']
        },
        {
          sceneNumber: 3,
          timestamp: '0:25 - 0:50',
          narration: 'Concluding takeaway and call-to-action.',
          visualPrompt: `Direct-to-camera closing shot with floating follow button badge`,
          bRollKeywords: ['conclusion', 'call-to-action']
        }
      ],
      audioUrl: `https://storage.mockcreatorai.com/audio/${newVideoId}_preview.mp3`,
      videoUrl: null,
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      createdAt: new Date().toISOString(),
    };

    videos.push(newVideo);
    return newVideo;
  },
};

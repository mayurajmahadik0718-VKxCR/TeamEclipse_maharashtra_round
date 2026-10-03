import { videoService } from '../services/videoService.js';

export const videoController = {
  generateVideo: async (req, res, next) => {
    try {
      const {
        creatorId,
        contentId,
        title,
        script,
        aspectRatio,
        visualStyle,
        voiceProfile,
      } = req.body;

      if (!creatorId || !title || !script) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: ['creatorId, title, and script are required'],
        });
      }

      const video = await videoService.generate({
        creatorId,
        contentId,
        title,
        script,
        aspectRatio,
        visualStyle,
        voiceProfile,
      });

      return res.status(202).json({
        success: true,
        videoId: video.videoId,
        message: 'Video generation storyboard initiated',
        data: video,
      });
    } catch (error) {
      next(error);
    }
  },

  getVideoById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const video = await videoService.getById(id);

      if (!video) {
        return res.status(404).json({
          success: false,
          error: `Video job not found with id ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        data: video,
      });
    } catch (error) {
      next(error);
    }
  },
};

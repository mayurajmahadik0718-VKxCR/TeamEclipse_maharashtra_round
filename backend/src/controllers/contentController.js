import { contentService } from '../services/contentService.js';

export const contentController = {
  generateContent: (req, res, next) => {
    try {
      const { creatorId, topic, platform, contentType, tone } = req.body;

      if (!creatorId || !topic || !platform || !contentType) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: ['creatorId, topic, platform, and contentType are required'],
        });
      }

      const generated = contentService.generate({ creatorId, topic, platform, contentType, tone });

      return res.status(201).json({
        success: true,
        contentId: generated.contentId,
        hook: generated.hook,
        script: generated.script,
        caption: generated.caption,
        hashtags: generated.hashtags,
        data: generated,
      });
    } catch (error) {
      next(error);
    }
  },

  getContentById: (req, res, next) => {
    try {
      const { id } = req.params;
      const content = contentService.getById(id);

      if (!content) {
        return res.status(404).json({
          success: false,
          error: `Content not found with id ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        data: content,
      });
    } catch (error) {
      next(error);
    }
  },
};

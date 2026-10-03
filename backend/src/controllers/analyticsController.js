import { analyticsService } from '../services/analyticsService.js';

export const analyticsController = {
  getAnalyticsByCreatorId: async (req, res, next) => {
    try {
      const { creatorId } = req.params;
      const { period = '30d' } = req.query;

      if (!creatorId) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: ['creatorId is required'],
        });
      }

      const analytics = await analyticsService.getByCreatorId(
        creatorId,
        period
      );

      return res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  },
};

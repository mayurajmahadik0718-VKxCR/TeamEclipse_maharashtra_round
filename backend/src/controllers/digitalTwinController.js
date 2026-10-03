import { creatorService } from '../services/creatorService.js';

export const digitalTwinController = {
  getDigitalTwin: async (req, res, next) => {
    try {
      const { id } = req.params;
      const twin = await creatorService.getDigitalTwin(id);

      if (!twin) {
        return res.status(404).json({
          success: false,
          error: `Digital twin not found for creator ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        data: twin,
      });
    } catch (error) {
      next(error);
    }
  },
};

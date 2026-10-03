import { creatorService } from '../services/creatorService.js';

export const creatorController = {
  createCreator: async (req, res, next) => {
    try {
      const { name, email, bio, primaryNiche, socialHandles } = req.body;

      if (!name || !email || !primaryNiche) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: ['name, email, and primaryNiche are required fields'],
        });
      }

      const creator = await creatorService.create({
        name,
        email,
        bio,
        primaryNiche,
        socialHandles,
      });

      return res.status(201).json({
        success: true,
        message: 'Creator profile created successfully',
        data: creator,
      });
    } catch (error) {
      next(error);
    }
  },

  getCreatorById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const creator = await creatorService.getById(id);

      if (!creator) {
        return res.status(404).json({
          success: false,
          error: `Creator not found with id ${id}`,
        });
      }

      return res.status(200).json({
        success: true,
        data: creator,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllCreators: async (req, res, next) => {
    try {
      const creators = await creatorService.getAll();

      return res.status(200).json({
        success: true,
        count: creators.length,
        data: creators,
      });
    } catch (error) {
      next(error);
    }
  },
};

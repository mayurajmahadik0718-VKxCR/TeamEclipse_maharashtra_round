import { z } from 'zod';

export const validateAiRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_INPUT',
        message: 'The AI request is missing required information or contains invalid fields.',
      },
    });
  }

  req.validatedData = result.data;
  next();
};

const optionalString = z.string().trim().min(1).optional();

export const trainCreatorTwinSchema = z.object({
  creatorId: optionalString,
  creatorProfile: z.object({
    name: optionalString,
    primaryNiche: optionalString,
    niche: optionalString,
    bio: z.string().optional(),
    tone: z.union([z.string(), z.object({}).passthrough()]).optional(),
    preferredPlatforms: z.array(z.string()).optional(),
    targetAudience: z.object({}).passthrough().optional(),
  }).passthrough().optional(),
  previousContent: z.array(z.unknown()).optional(),
  performanceData: z.array(z.unknown()).optional(),
  goals: z.union([z.array(z.string()), z.object({}).passthrough()]).optional(),
  objectives: z.array(z.string()).optional(),
}).passthrough().refine(
  (payload) => Boolean(payload.creatorId || payload.creatorProfile),
  { message: 'Provide a creatorId or creatorProfile to train a digital twin.' }
);

export const generateCampaignSchema = z.object({
  creatorId: optionalString,
  theme: optionalString,
  title: optionalString,
  topic: optionalString,
  goals: z.array(z.string()).optional(),
  objectives: z.array(z.string()).optional(),
  timeframe: optionalString,
  creatorTwin: z.object({}).passthrough().optional(),
}).passthrough().refine(
  (payload) => Boolean(payload.theme || payload.title || payload.topic),
  { message: 'Provide a theme, title, or topic to generate a campaign.' }
);

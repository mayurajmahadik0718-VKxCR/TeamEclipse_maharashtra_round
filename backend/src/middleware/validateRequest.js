import { ZodError } from 'zod';

export const validateRequest = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.validatedData = parsed;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: issues,
      });
    }
    next(error);
  }
};

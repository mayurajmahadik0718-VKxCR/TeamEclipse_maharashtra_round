export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (req.originalUrl.startsWith('/api/ai')) {
    return res.status(statusCode).json({
      success: false,
      error: {
        code: statusCode === 400 ? 'INVALID_INPUT' : 'AI_REQUEST_FAILED',
        message: statusCode === 400 ? 'The AI request body is invalid.' : 'Unable to complete the AI request. Please try again.',
      },
    });
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    details: err.details || null,
  });
};

export const notFoundHandler = (req, res) => {
  if (req.originalUrl.startsWith('/api/ai')) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'AI_ROUTE_NOT_FOUND',
        message: 'AI endpoint not found.',
      },
    });
  }

  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

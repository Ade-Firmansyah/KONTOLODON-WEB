export function errorMiddleware(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  console.error('[error]', {
    message: error.message,
    stack: error.stack,
    statusCode,
  });

  res.status(statusCode).json({
    status: false,
    message: error.message || 'Internal server error',
  });
}

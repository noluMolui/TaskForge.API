const errorHandler = (err, req, res, next) => {
  // Log the stack trace internally for debugging, but never send it to the client
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message
  });
};

export default errorHandler;
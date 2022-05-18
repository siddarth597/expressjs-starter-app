const globalErrorHandler = (err, req, res, next) => {
  const error = err;
  const status = err.status || 500;
  const errorResponse = {
    error: {
      message: error.message,
    },
  };
  // log the error
  console.error(errorResponse); // this can be replaced with a custom logger

  // respond to client
  res.status(status).json(errorResponse);
};

module.exports = globalErrorHandler;

// Invalid routes handler
const invalidRouteHandler = (req, res, next) => {
  const err = new Error("Invalid Route");
  err.status = 404;
  next(err);
};

module.exports = invalidRouteHandler;

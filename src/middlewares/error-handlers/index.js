const globalErrorHandler = require("./global-error-handler.middleware");
const invalidRouteHandler = require("./invalid-route-handler.middleware");

module.exports = { globalErrorHandler, invalidRouteHandler };

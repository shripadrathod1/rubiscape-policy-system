'use strict';

const { error } = require('../utils/responseHelper');

/**
 * 404 handler — must be registered AFTER all routes,
 * but BEFORE the global error handler.
 */
function notFound(req, res) {
  return error(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

module.exports = notFound;

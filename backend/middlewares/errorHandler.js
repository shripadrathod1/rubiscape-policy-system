'use strict';

const { error } = require('../utils/responseHelper');

/**
 * Global error-handling middleware.
 * Must be registered LAST in the Express middleware chain.
 *
 * Handles:
 *  - Mongoose CastError   → 400 Bad Request
 *  - Mongoose ValidationError → 422 Unprocessable Entity
 *  - Mongoose duplicate key (11000) → 409 Conflict
 *  - Everything else → 500 Internal Server Error
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _next) {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    console.error('[ERROR]', err);
  }

  // Mongoose CastError (invalid ObjectId, etc.)
  if (err.name === 'CastError') {
    return error(res, `Invalid value for field: ${err.path}`, 400);
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field:   e.path,
      message: e.message,
    }));
    return error(res, 'Validation failed', 422, errors);
  }

  // MongoDB duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return error(res, `Duplicate value for ${field}`, 409);
  }

  // Default — 500
  return error(
    res,
    isDev ? err.message : 'Internal server error',
    err.statusCode || 500
  );
}

module.exports = errorHandler;

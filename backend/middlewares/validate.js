'use strict';

const { validationResult } = require('express-validator');
const { error } = require('../utils/responseHelper');

/**
 * Middleware: reads express-validator results.
 * If there are validation errors, responds with 422 and the error list.
 * Otherwise, calls next().
 */
function validate(req, res, next) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((e) => ({
      field:   e.path ?? e.param,
      message: e.msg,
    }));
    return error(res, 'Validation failed', 422, errors);
  }

  next();
}

module.exports = validate;

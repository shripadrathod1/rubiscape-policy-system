'use strict';

/**
 * Sends a standardised success response.
 * @param {import('express').Response} res
 * @param {*} data
 * @param {string} message
 * @param {number} statusCode
 */
const success = (res, data, message = 'Success', statusCode = 200) =>
  res.status(statusCode).json({ success: true, message, data });

/**
 * Sends a standardised error response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} statusCode
 * @param {*} errors
 */
const error = (res, message = 'An error occurred', statusCode = 500, errors = null) =>
  res.status(statusCode).json({ success: false, message, errors });

module.exports = { success, error };

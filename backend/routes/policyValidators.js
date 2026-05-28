'use strict';

const { body, param, query } = require('express-validator');

// ─── Shared condition validators ──────────────────────────────────────────────
const conditionValidators = [
  body('rule.conditions')
    .isArray({ min: 1 })
    .withMessage('rule.conditions must be a non-empty array'),

  body('rule.conditions.*.field')
    .notEmpty()
    .withMessage('Each condition must have a non-empty field')
    .isString()
    .trim(),

  body('rule.conditions.*.operator')
    .notEmpty()
    .withMessage('Each condition must have an operator')
    .isIn(['=', '!=', '>', '<', '>=', '<=', 'contains'])
    .withMessage('Operator must be one of: =, !=, >, <, >=, <=, contains'),

  body('rule.conditions.*.value')
    .notEmpty()
    .withMessage('Each condition must have a non-empty value')
    .isString()
    .trim(),
];

// ─── CREATE validators ────────────────────────────────────────────────────────
const createPolicyValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Policy name is required')
    .isString().withMessage('Policy name must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Policy name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be at most 500 characters'),

  body('type')
    .notEmpty().withMessage('Policy type is required')
    .isIn(['access_control', 'data_quality', 'compliance'])
    .withMessage('Type must be one of: access_control, data_quality, compliance'),

  body('rule')
    .notEmpty().withMessage('rule is required')
    .isObject().withMessage('rule must be an object'),

  body('rule.logic')
    .notEmpty().withMessage('rule.logic is required')
    .isIn(['AND', 'OR']).withMessage('rule.logic must be AND or OR'),

  ...conditionValidators,

  body('action')
    .notEmpty().withMessage('action is required')
    .isIn(['allow', 'deny', 'alert'])
    .withMessage('action must be one of: allow, deny, alert'),

  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('status must be active or inactive'),
];

// ─── UPDATE validators ────────────────────────────────────────────────────────
const updatePolicyValidators = [
  param('id').isMongoId().withMessage('Invalid policy ID'),

  body('name')
    .optional()
    .trim()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Policy name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be at most 500 characters'),

  body('type')
    .optional()
    .isIn(['access_control', 'data_quality', 'compliance'])
    .withMessage('Type must be one of: access_control, data_quality, compliance'),

  body('rule')
    .optional()
    .isObject().withMessage('rule must be an object'),

  body('rule.logic')
    .optional()
    .isIn(['AND', 'OR']).withMessage('rule.logic must be AND or OR'),

  body('rule.conditions')
    .optional()
    .isArray({ min: 1 })
    .withMessage('rule.conditions must be a non-empty array'),

  body('rule.conditions.*.field')
    .optional()
    .notEmpty()
    .isString()
    .trim(),

  body('rule.conditions.*.operator')
    .optional()
    .isIn(['=', '!=', '>', '<', '>=', '<=', 'contains'])
    .withMessage('Operator must be one of: =, !=, >, <, >=, <=, contains'),

  body('rule.conditions.*.value')
    .optional()
    .notEmpty()
    .isString()
    .trim(),

  body('action')
    .optional()
    .isIn(['allow', 'deny', 'alert'])
    .withMessage('action must be one of: allow, deny, alert'),

  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('status must be active or inactive'),
];

// ─── MongoId param validator ──────────────────────────────────────────────────
const mongoIdValidator = [
  param('id').isMongoId().withMessage('Invalid policy ID'),
];

// ─── List query validators ────────────────────────────────────────────────────
const listQueryValidators = [
  query('type')
    .optional()
    .isIn(['access_control', 'data_quality', 'compliance'])
    .withMessage('type filter must be one of: access_control, data_quality, compliance'),

  query('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('status filter must be active or inactive'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a positive integer')
    .toInt(),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be between 1 and 100')
    .toInt(),
];

module.exports = {
  createPolicyValidators,
  updatePolicyValidators,
  mongoIdValidator,
  listQueryValidators,
};

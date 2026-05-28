'use strict';

const VALID_OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'contains'];
const VALID_LOGIC = ['AND', 'OR'];

/**
 * Validates the shape and content of a rule object.
 * Returns { valid: true } on success or { valid: false, errors: string[] } on failure.
 *
 * @param {*} rule
 * @returns {{ valid: boolean, errors?: string[] }}
 */
function validateRule(rule) {
  const errors = [];

  if (!rule || typeof rule !== 'object' || Array.isArray(rule)) {
    return { valid: false, errors: ['rule must be a non-null object'] };
  }

  // Validate logic
  if (!rule.logic) {
    errors.push('rule.logic is required');
  } else if (!VALID_LOGIC.includes(rule.logic)) {
    errors.push(`rule.logic must be one of: ${VALID_LOGIC.join(', ')}`);
  }

  // Validate conditions array
  if (!Array.isArray(rule.conditions)) {
    errors.push('rule.conditions must be an array');
  } else if (rule.conditions.length === 0) {
    errors.push('rule.conditions must contain at least one condition');
  } else {
    rule.conditions.forEach((condition, index) => {
      const prefix = `rule.conditions[${index}]`;

      if (!condition || typeof condition !== 'object') {
        errors.push(`${prefix} must be an object`);
        return;
      }

      if (!condition.field || typeof condition.field !== 'string' || !condition.field.trim()) {
        errors.push(`${prefix}.field is required and must be a non-empty string`);
      }

      if (!condition.operator) {
        errors.push(`${prefix}.operator is required`);
      } else if (!VALID_OPERATORS.includes(condition.operator)) {
        errors.push(
          `${prefix}.operator "${condition.operator}" is invalid. Must be one of: ${VALID_OPERATORS.join(', ')}`
        );
      }

      if (condition.value === undefined || condition.value === null) {
        errors.push(`${prefix}.value is required`);
      } else if (typeof condition.value !== 'string' || !condition.value.trim()) {
        errors.push(`${prefix}.value must be a non-empty string`);
      }
    });
  }

  return errors.length > 0 ? { valid: false, errors } : { valid: true };
}

module.exports = { validateRule };

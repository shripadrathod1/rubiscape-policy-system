/**
 * Validates policy form data.
 * Returns an object of field-level errors.
 * Empty object means valid.
 */
export function validatePolicy(data) {
  const errors = {};

  // Name
  if (!data.name || !data.name.trim()) {
    errors.name = 'Policy name is required';
  } else if (data.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer';
  }

  // Type
  if (!data.type) {
    errors.type = 'Policy type is required';
  }

  // Action
  if (!data.action) {
    errors.action = 'Action is required';
  }

  // Rule
  if (!data.rule || !Array.isArray(data.rule.conditions) || data.rule.conditions.length === 0) {
    errors.rule = 'At least one rule condition is required';
  } else {
    const conditionErrors = data.rule.conditions.map((c) => {
      const err = {};
      if (!c.field?.trim())    err.field    = 'Required';
      if (!c.operator)         err.operator = 'Required';
      if (!c.value?.trim())    err.value    = 'Required';
      return Object.keys(err).length > 0 ? err : null;
    });

    if (conditionErrors.some(Boolean)) {
      errors.conditions = conditionErrors;
    }
  }

  return errors;
}

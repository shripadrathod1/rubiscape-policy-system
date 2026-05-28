'use strict';

const policyService = require('../services/policyService');
const { success, error }  = require('../utils/responseHelper');
const { validateRule }    = require('../utils/ruleValidator');

// ─── GET /api/policies ────────────────────────────────────────────────────────
async function getAllPolicies(req, res, next) {
  try {
    const { type, status, page, limit } = req.query;
    const result = await policyService.listPolicies({ type, status, page, limit });
    return success(res, result, 'Policies retrieved successfully');
  } catch (err) {
    next(err);
  }
}

// ─── GET /api/policies/:id ────────────────────────────────────────────────────
async function getPolicyById(req, res, next) {
  try {
    const policy = await policyService.getPolicyById(req.params.id);
    if (!policy) {
      return error(res, 'Policy not found', 404);
    }
    return success(res, { policy }, 'Policy retrieved successfully');
  } catch (err) {
    next(err);
  }
}

// ─── POST /api/policies ───────────────────────────────────────────────────────
async function createPolicy(req, res, next) {
  try {
    const { name, description, type, rule, action, status } = req.body;

    // Deep rule structure validation
    const ruleCheck = validateRule(rule);
    if (!ruleCheck.valid) {
      return error(res, 'Invalid rule structure', 422, ruleCheck.errors);
    }

    const policy = await policyService.createPolicy({
      name, description, type, rule, action, status,
    });

    return success(res, { policy }, 'Policy created successfully', 201);
  } catch (err) {
    // MongoDB duplicate key
    if (err.code === 11000) {
      return error(res, 'A policy with this name already exists', 409);
    }
    next(err);
  }
}

// ─── PUT /api/policies/:id ────────────────────────────────────────────────────
async function updatePolicy(req, res, next) {
  try {
    const { name, description, type, rule, action, status } = req.body;

    if (rule !== undefined) {
      const ruleCheck = validateRule(rule);
      if (!ruleCheck.valid) {
        return error(res, 'Invalid rule structure', 422, ruleCheck.errors);
      }
    }

    const policy = await policyService.updatePolicy(req.params.id, {
      name, description, type, rule, action, status,
    });

    if (!policy) {
      return error(res, 'Policy not found', 404);
    }

    return success(res, { policy }, 'Policy updated successfully');
  } catch (err) {
    if (err.code === 11000) {
      return error(res, 'A policy with this name already exists', 409);
    }
    next(err);
  }
}

// ─── DELETE /api/policies/:id ─────────────────────────────────────────────────
async function deletePolicy(req, res, next) {
  try {
    const policy = await policyService.deletePolicy(req.params.id);
    if (!policy) {
      return error(res, 'Policy not found', 404);
    }
    return success(res, null, 'Policy deleted successfully');
  } catch (err) {
    next(err);
  }
}

// ─── PATCH /api/policies/:id/toggle ──────────────────────────────────────────
async function togglePolicyStatus(req, res, next) {
  try {
    const policy = await policyService.togglePolicyStatus(req.params.id);
    if (!policy) {
      return error(res, 'Policy not found', 404);
    }
    return success(res, { policy }, `Policy status set to ${policy.status}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
  togglePolicyStatus,
};

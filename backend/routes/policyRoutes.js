'use strict';

const express  = require('express');
const router   = express.Router();

const controller = require('../controllers/policyController');
const validate   = require('../middlewares/validate');
const {
  createPolicyValidators,
  updatePolicyValidators,
  mongoIdValidator,
  listQueryValidators,
} = require('./policyValidators');

// GET    /api/policies
router.get('/',    listQueryValidators,  validate, controller.getAllPolicies);

// GET    /api/policies/:id
router.get('/:id', mongoIdValidator,     validate, controller.getPolicyById);

// POST   /api/policies
router.post('/',   createPolicyValidators, validate, controller.createPolicy);

// PUT    /api/policies/:id
router.put('/:id', updatePolicyValidators, validate, controller.updatePolicy);

// DELETE /api/policies/:id
router.delete('/:id', mongoIdValidator,  validate, controller.deletePolicy);

// PATCH  /api/policies/:id/toggle
router.patch('/:id/toggle', mongoIdValidator, validate, controller.togglePolicyStatus);

module.exports = router;

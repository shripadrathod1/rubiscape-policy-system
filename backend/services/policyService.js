'use strict';

const Policy = require('../models/Policy');

// ─── List Policies (with pagination + filters) ────────────────────────────────
async function listPolicies({ type, status, page = 1, limit = 10 }) {
  const filter = {};
  if (type)   filter.type   = type;
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);

  const [policies, total] = await Promise.all([
    Policy.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Policy.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / Number(limit));

  return { policies, total, page: Number(page), totalPages };
}

// ─── Get Single Policy ────────────────────────────────────────────────────────
async function getPolicyById(id) {
  const policy = await Policy.findById(id).lean();
  return policy; // null if not found
}

// ─── Create Policy ────────────────────────────────────────────────────────────
async function createPolicy(data) {
  const policy = await Policy.create(data);
  return policy.toObject();
}

// ─── Update Policy ────────────────────────────────────────────────────────────
async function updatePolicy(id, data) {
  const policy = await Policy.findByIdAndUpdate(
    id,
    { ...data, $inc: { version: 1 } },
    { new: true, runValidators: true }
  ).lean();
  return policy; // null if not found
}

// ─── Delete Policy ────────────────────────────────────────────────────────────
async function deletePolicy(id) {
  const policy = await Policy.findByIdAndDelete(id).lean();
  return policy; // null if not found
}

// ─── Toggle Policy Status ─────────────────────────────────────────────────────
async function togglePolicyStatus(id) {
  const existing = await Policy.findById(id);
  if (!existing) return null;

  existing.status = existing.status === 'active' ? 'inactive' : 'active';
  await existing.save();
  return existing.toObject();
}

module.exports = {
  listPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
  togglePolicyStatus,
};

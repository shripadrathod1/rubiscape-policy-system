'use strict';

const mongoose = require('mongoose');

// ─── Condition Sub-Schema ────────────────────────────────────────────────────
const ConditionSchema = new mongoose.Schema(
  {
    field: {
      type: String,
      required: [true, 'Condition field is required'],
      trim: true,
    },
    operator: {
      type: String,
      enum: {
        values: ['=', '!=', '>', '<', '>=', '<=', 'contains'],
        message: 'Operator "{VALUE}" is not supported',
      },
      required: [true, 'Condition operator is required'],
    },
    value: {
      type: String,
      required: [true, 'Condition value is required'],
      trim: true,
    },
  },
  { _id: false }
);

// ─── Rule Group Sub-Schema ───────────────────────────────────────────────────
const RuleGroupSchema = new mongoose.Schema(
  {
    logic: {
      type: String,
      enum: {
        values: ['AND', 'OR'],
        message: 'Logic must be AND or OR',
      },
      default: 'AND',
    },
    conditions: {
      type: [ConditionSchema],
      required: [true, 'At least one condition is required'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Rule must have at least one condition',
      },
    },
  },
  { _id: false }
);

// ─── Policy Schema ────────────────────────────────────────────────────────────
const PolicySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Policy name is required'],
      trim: true,
      unique: true,
      maxlength: [100, 'Name must be 100 characters or fewer'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must be 500 characters or fewer'],
      default: '',
    },
    type: {
      type: String,
      enum: {
        values: ['access_control', 'data_quality', 'compliance'],
        message: 'Type "{VALUE}" is not valid',
      },
      required: [true, 'Policy type is required'],
    },
    rule: {
      type: RuleGroupSchema,
      required: [true, 'Policy rule is required'],
    },
    action: {
      type: String,
      enum: {
        values: ['allow', 'deny', 'alert'],
        message: 'Action "{VALUE}" is not valid',
      },
      required: [true, 'Policy action is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: 'Status must be active or inactive',
      },
      default: 'inactive',
    },
    version: {
      type: Number,
      default: 1,
      min: [1, 'Version must be at least 1'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
PolicySchema.index({ type: 1, status: 1 });
PolicySchema.index({ createdAt: -1 });

const Policy = mongoose.model('Policy', PolicySchema);

module.exports = Policy;

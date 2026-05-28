'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const Policy   = require('./models/Policy');

// ─── Seed Data ────────────────────────────────────────────────────────────────
const policies = [
  // ── Access Control ──────────────────────────────────────────────────────────
  {
    name:        'Block Non-Admin Access to Sensitive Data',
    description: 'Deny access to highly sensitive datasets for any user who is not an admin.',
    type:        'access_control',
    rule: {
      logic: 'AND',
      conditions: [
        { field: 'user_role',        operator: '!=', value: 'admin' },
        { field: 'data_sensitivity', operator: '=',  value: 'high'  },
      ],
    },
    action: 'deny',
    status: 'active',
  },
  {
    name:        'Allow Finance Department Read Access',
    description: 'Grant read access to financial records for users in the Finance department.',
    type:        'access_control',
    rule: {
      logic: 'AND',
      conditions: [
        { field: 'department',       operator: '=',  value: 'finance'   },
        { field: 'data_sensitivity', operator: '!=', value: 'top_secret' },
      ],
    },
    action: 'allow',
    status: 'active',
  },
  {
    name:        'Restrict Cross-Region Data Access',
    description: 'Alert when a user from outside the EU region attempts to access EU-tagged data.',
    type:        'access_control',
    rule: {
      logic: 'AND',
      conditions: [
        { field: 'region',     operator: '!=', value: 'EU'   },
        { field: 'data_type',  operator: '=',  value: 'eu_personal_data' },
      ],
    },
    action: 'alert',
    status: 'active',
  },

  // ── Data Quality ─────────────────────────────────────────────────────────────
  {
    name:        'Flag Incomplete Customer Records',
    description: 'Alert when a customer record is missing a required email field.',
    type:        'data_quality',
    rule: {
      logic: 'AND',
      conditions: [
        { field: 'data_type',     operator: '=',         value: 'customer_record' },
        { field: 'email_present', operator: '=',         value: 'false'           },
      ],
    },
    action: 'alert',
    status: 'active',
  },
  {
    name:        'Reject Null Financial Transactions',
    description: 'Deny ingestion of financial transactions where the amount field is null or empty.',
    type:        'data_quality',
    rule: {
      logic: 'AND',
      conditions: [
        { field: 'data_type',      operator: '=', value: 'transaction' },
        { field: 'amount_present', operator: '=', value: 'false'       },
      ],
    },
    action: 'deny',
    status: 'active',
  },
  {
    name:        'Validate PII Data Format',
    description: 'Ensure all PII records conform to the approved schema before storage.',
    type:        'data_quality',
    rule: {
      logic: 'OR',
      conditions: [
        { field: 'data_type', operator: 'contains', value: 'pii'        },
        { field: 'data_type', operator: '=',        value: 'health_data' },
      ],
    },
    action: 'alert',
    status: 'inactive',
  },

  // ── Compliance ────────────────────────────────────────────────────────────────
  {
    name:        'GDPR — EU Personal Data Export Block',
    description: 'Deny export of any personal data belonging to EU citizens to non-EU regions.',
    type:        'compliance',
    rule: {
      logic: 'AND',
      conditions: [
        { field: 'data_type',        operator: '=',  value: 'eu_personal_data' },
        { field: 'destination_region', operator: '!=', value: 'EU'              },
      ],
    },
    action: 'deny',
    status: 'active',
  },
  {
    name:        'HIPAA — Healthcare Data Access Audit',
    description: 'Alert whenever a non-healthcare role accesses datasets classified as health data.',
    type:        'compliance',
    rule: {
      logic: 'AND',
      conditions: [
        { field: 'data_type', operator: '=',  value: 'health_data'  },
        { field: 'user_role', operator: '!=', value: 'healthcare_professional' },
      ],
    },
    action: 'alert',
    status: 'inactive',
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('[SEED ERROR] MONGO_URI is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[SEED] Connected to MongoDB');

    // Clear existing policies
    const deleted = await Policy.deleteMany({});
    console.log(`[SEED] Cleared ${deleted.deletedCount} existing policy records`);

    // Insert seed data
    const inserted = await Policy.insertMany(policies, { ordered: true });
    console.log(`[SEED] Inserted ${inserted.length} policies successfully:`);
    inserted.forEach((p, i) => {
      console.log(`       ${i + 1}. [${p.type}] "${p.name}" — ${p.status}`);
    });

    console.log('\n[SEED] Done. Database is ready.');
  } catch (err) {
    console.error('[SEED ERROR]', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('[SEED] MongoDB connection closed.');
    process.exit(0);
  }
}

seed();

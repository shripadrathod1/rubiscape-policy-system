'use strict';

const requiredVars = ['PORT', 'MONGO_URI'];

function validateEnv() {
  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `[ENV ERROR] Missing required environment variables: ${missing.join(', ')}`
    );
    process.exit(1);
  }

  console.log('[ENV] All required environment variables are present.');
}

module.exports = { validateEnv };

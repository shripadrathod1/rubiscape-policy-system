'use strict';

const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[DB] MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('[DB ERROR] Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('[DB] MongoDB disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('[DB] MongoDB connection error:', err.message);
});

module.exports = { connectDB };

'use strict';

require('dotenv').config();

const { validateEnv } = require('./config/env');
validateEnv();                         // Fail fast if env vars are missing

const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');

const { connectDB }  = require('./config/db');
const policyRoutes   = require('./routes/policyRoutes');
const notFound       = require('./middlewares/notFound');
const errorHandler   = require('./middlewares/errorHandler');

// ─── App Setup ────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 5000;

// ─── Security & Logging Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Rubiscape API is running' });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/policies', policyRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use(notFound);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[SERVER] Rubiscape API listening on http://localhost:${PORT}`);
    console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();

module.exports = app; // for testing

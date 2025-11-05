const multer = require('multer');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const connectDB = require('./config/database');
const professionalRoutes = require('./routes/professional');
const contactsRoutes = require('./routes/contacts');

require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/professional', professionalRoutes);
app.use('/api/contacts', contactsRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'Contacts API is running!',
    version: '1.0.0',
    endpoints: {
      professional: 'GET /professional',
      contacts: 'GET /api/contacts',
      health: 'GET /health'
    }
  });
});

// Route santé
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: port,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Middleware de gestion d'erreurs global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(` Contacts API running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const connectDB = require('./config/database');
const userRoutes = require('./routes/user');
const contactsRoutes = require('./routes/contacts');
const mongodb =require('./data/database')
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');



require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

// Connection with database
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// Routes
app.use('/user', userRoutes);
app.use('/api/contacts', contactsRoutes);

//   base route
app.get('/', (req, res) => {
  res.json({
    message: 'Contacts API is running!',
    version: '1.0.0',
    endpoints: {
      professional: 'GET /user',
      contacts: 'GET /api/contacts',
      health: 'GET /health'
    }
  });
});

// Route health
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: port,
    environment: process.env.NODE_ENV || 'development'
  });
});

// manage errors 404
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

// started server
app.listen(port, () => {
  console.log(` Contacts API running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const connectDB = require('./config/database');

// ROUTES
const userRoutes = require('./routes/user');
const contactsRoutes = require('./routes/contacts');

// SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();

// --------------------
// DATABASE CONNECTION
// --------------------
connectDB();

// --------------------
// MIDDLEWARE
// --------------------
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());

// --------------------
// SWAGGER DOCS
// --------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// --------------------
// CORS HEADERS (GLOBAL)
// --------------------
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  next();
});

// --------------------
// API ROUTES
// --------------------
app.use('/user', userRoutes);
app.use('/api/contacts', contactsRoutes);

// --------------------
// BASE ROUTE
// --------------------
app.get('/', (req, res) => {
  res.json({
    message: 'Contacts API is running!',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      users: '/user',
      contacts: '/api/contacts',
      health: '/health'
    }
  });
});

// --------------------
// HEALTH ROUTE
// --------------------
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    port: port,
    environment: process.env.NODE_ENV || 'development'
  });
});

// --------------------
// 404 HANDLER
// --------------------
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// --------------------
// GLOBAL ERROR HANDLER
// --------------------
app.use((err, req, res, next) => {
  console.error(' SERVER ERROR:', err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// --------------------
// START SERVER
// --------------------
app.listen(port, () => {
  console.log(` Contacts API running on http://localhost:${port}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
});

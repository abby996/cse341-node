const express = require('express');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Optional Swagger — only mount if package + JSON are present
try {
  const swaggerUi = require('swagger-ui-express');
  const possible = [
    path.join(__dirname, 'swagger-output.json'),
    path.join(__dirname, 'swagger', 'swagger-output.json')
  ];
  const found = possible.find(p => fs.existsSync(p));
  if (found) {
    const swaggerDocument = require(found);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } else {
    console.warn('Swagger JSON not found; /api-docs disabled');
  }
} catch (err) {
  console.warn('swagger-ui-express not installed or failed to load; /api-docs disabled');
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cors')());

// Mount routes (wrap in try/catch if optional)
try { app.use('/api/items', require('./routes/items')); } catch (e) { console.warn('items routes missing'); }
try { app.use('/api/users', require('./routes/users')); } catch (e) { console.warn('users routes missing'); }

// Basic routes, 404 and error handlers...
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API is working', timestamp: new Date().toISOString() });
});

app.use((req, res) => res.status(404).json({ success:false, message: `Route not found: ${req.method} ${req.originalUrl}` }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success:false, message: 'Internal Server Error', error: process.env.NODE_ENV === 'production' ? {} : err.message });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
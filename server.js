const express = require('express');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger UI (requires swagger-ui-express and ./swagger/swagger-output.json)
try {
    const swaggerUi = require('swagger-ui-express');
    const swaggerDoc = require('./swagger/swagger-output.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    console.log('Swagger mounted at /api-docs');
} catch (err) {
    console.warn('/api-docs not available:', err.message);
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
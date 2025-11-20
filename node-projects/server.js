const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const connectDB = require('./data/database'); // ensure this file exists and exports a connect function
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes if present (fail-safe)
try {
    const itemsRouter = require('./routes/items');
    app.use('/api/items', itemsRouter);
} catch (err) {
    console.warn('Warning: /routes/items not found — items routes disabled');
}

try {
    const usersRouter = require('./routes/users');
    app.use('/api/users', usersRouter);
} catch (err) {
    console.warn('Warning: /routes/users not found — users routes disabled');
}

// Optional Swagger UI (won't crash if package or JSON missing)
let swaggerEnabled = false;
try {
    const swaggerUi = require('swagger-ui-express');
    const possible = ['./swagger-output.json', './swagger/swagger-output.json'];
    const found = possible.find(p => fs.existsSync(p));
    if (found) {
        const swaggerDoc = require(found);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        swaggerEnabled = true;
    } else {
        console.warn('Swagger JSON not found, /api-docs disabled');
    }
} catch (err) {
    console.warn('swagger-ui-express not installed or failed to load, /api-docs disabled');
}

// Basic route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 API is working!',
        timestamp: new Date().toISOString(),
        endpoints: {
            documentation: swaggerEnabled ? '/api-docs' : 'disabled',
            health: '/health',
            items: '/api/items',
            users: '/api/users'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: '✅ Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// 404 handler (catch-all)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `❌ Route not found: ${req.method} ${req.originalUrl}`,
        availableEndpoints: [
            'GET /',
            'GET /health',
            'GET /api-docs',
            'GET /api/items',
            'POST /api/items',
            'GET /api/items/:id',
            'PUT /api/items/:id',
            'DELETE /api/items/:id',
            'GET /api/users',
            'POST /api/users',
            'GET /api/users/:id',
            'PUT /api/users/:id',
            'DELETE /api/users/:id'
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err.message
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/health`);
    console.log(`🛍️ Items API: http://localhost:${PORT}/api/items`);
    console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
    if (swaggerEnabled) console.log(`📚 Documentation: http://localhost:${PORT}/api-docs`);
});

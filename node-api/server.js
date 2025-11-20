const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./data/database'); // ⬅️ GADE - data/database

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/items', require('./routes/items'));
app.use('/api/users', require('./routes/users'));

// Basic route
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: '🚀 API is working!',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/health',
            items: '/api/items',
            users: '/api/users'
        }
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: '✅ Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Handle undefined routes (404)
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `❌ Route not found: ${req.method} ${req.originalUrl}`,
        availableEndpoints: [
            'GET /',
            'GET /health',
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
app.use((error, req, res, next) => {
    console.error('❌ Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(` Base URL: http://localhost:${PORT}`);
    console.log(` Health Check: http://localhost:${PORT}/health`);
    console.log(` Items API: http://localhost:${PORT}/api/items`);
    console.log(` Users API: http://localhost:${PORT}/api/users`);
});
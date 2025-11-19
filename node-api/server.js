const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./data/database');
const fs = require('fs');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Optional Swagger (safe if package or file missing)
let swaggerUi;
let swaggerFile;
let swaggerEnabled = false;
try {
    swaggerUi = require('swagger-ui-express');
    const possiblePaths = ['./swagger-output.json', './swagger/swagger-output.json'];
    const foundPath = possiblePaths.find(p => fs.existsSync(p));
    if (foundPath) {
        swaggerFile = require(foundPath);
        swaggerEnabled = true;
    } else {
        console.warn('Swagger JSON not found, skipping /api-docs');
    }
} catch (err) {
    console.warn('swagger-ui-express not installed or failed to load, skipping /api-docs');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/items', require('./routes/items'));

// Swagger documentation (only mount if available)
if (swaggerEnabled && swaggerUi && swaggerFile) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

// Basic route
app.get('/', (req, res) => {
    res.json({ 
        message: 'API is working!',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : error.stack
    });
});

// Handle undefined routes (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    if (swaggerEnabled) {
        console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    }
    console.log(`Health Check: http://localhost:${PORT}/health`);
});
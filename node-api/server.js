const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./data/database');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger-output.json");



// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/items', require('./routes/items'));

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

// Handle undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
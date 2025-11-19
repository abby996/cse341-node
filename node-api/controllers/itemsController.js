const Item = require('../models/item');

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
const getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid item ID'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Public
const createItem = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json({
            success: true,
            data: item
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Public
const updateItem = async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        // Validate input data before update
        const { name, description, price, category, inStock } = req.body;
        
        // Update only provided fields
        if (name !== undefined) item.name = name;
        if (description !== undefined) item.description = description;
        if (price !== undefined) item.price = price;
        if (category !== undefined) item.category = category;
        if (inStock !== undefined) item.inStock = inStock;

        // Save and run validators
        await item.save();

        res.json({
            success: true,
            message: 'Item updated successfully',
            data: item
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid item ID'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Public
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        await Item.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Item deleted successfully',
            data: {}
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid item ID'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};
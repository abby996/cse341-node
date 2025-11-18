const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['electronics', 'clothing', 'books', 'home', 'other']
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Create index for better performance
itemSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Item', itemSchema);
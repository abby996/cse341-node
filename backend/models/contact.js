const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  favoriteColor: {
    type: String,
    trim: true
  },
  birthday: {
    type: Date,
    validate: {
      validator: function(date) {
        return date <= new Date();
      },
      message: 'Birthday cannot be in the future'
    }
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  jobTitle: {
    type: String,
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['friend', 'family', 'work', 'other'],
    default: 'other'
  }
}, {
  timestamps: true // add createdAt and updatedAt automatically
});

// Index pour la recherche
contactSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

// Méthode pour obtenir le nom complet
contactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Assurer que les virtuals sont inclus dans les JSON
contactSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Contact', contactSchema);
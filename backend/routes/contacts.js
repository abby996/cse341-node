const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET /api/contacts - Récupérer tous les contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching contacts",
      message: error.message
    });
  }
});

// GET /api/contacts/:id - Récupérer un contact par ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found"
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: "Contact not found"
      });
    }
    
    res.status(500).json({
      success: false,
      error: "Error fetching contact",
      message: error.message
    });
  }
});

module.exports = router;
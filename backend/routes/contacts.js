const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

//  Simple test route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Contacts API' });
});


//  GET /api/contacts — Get all contacts
router.get('/all', async (req, res) => {
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

//  GET /api/contacts/:id — Get contact by ID
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

// POST /api/contacts — Create new contact
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    const saved = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error creating contact",
      message: error.message
    });
  }
});

//  PUT /api/contacts/:id — Update existing contact
router.put('/:id', async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }

    res.json({
      success: true,
      message: "Contact updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error updating contact",
      message: error.message
    });
  }
});

//  DELETE /api/contacts/:id — Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }
    res.status(204).send(); // 204: success, no content
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error deleting contact",
      message: error.message
    });
  }
});

module.exports = router;

const Contact = require('../models/contact');

// GET /contacts - Recuparate all contacts
const getAllContacts = async (req, res) => {
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
      error: 'Error fetching contacts',
      message: error.message
    });
  }
};

// GET /contacts/:id - Recuparate contact by ID
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
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
        error: 'Contact not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Error fetching contact',
      message: error.message
    });
  }
};

// POST /contacts - create a new contact
const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    
    res.status(201).json({
      success: true,
      data: savedContact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Error creating contact',
      message: error.message
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact
};
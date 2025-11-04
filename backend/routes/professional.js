const express = require('express');
const router = express.Router();
const { getData } = require('../controllers/professional');

// GET /professional
router.get('/', getData);

module.exports = router;
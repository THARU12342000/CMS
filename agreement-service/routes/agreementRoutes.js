const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrUpdateConsent, getConsentByUser } = require('../controllers/agreementController');

// Create or update consent
router.post('/', protect, createOrUpdateConsent);

// Get all consents for current user (optionally filter by type)
router.get('/', protect, getConsentByUser);

module.exports = router;

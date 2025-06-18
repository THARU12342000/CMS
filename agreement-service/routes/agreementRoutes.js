const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrUpdateConsent, getConsentByUser, getMarketingConsent } = require('../controllers/agreementController');

// Create or update consent (requires auth)
router.post('/', protect, createOrUpdateConsent);

// Get marketing consent (public)
router.get('/marketing', getMarketingConsent);

// Get all consents for current user (requires auth)
router.get('/', protect, getConsentByUser);

module.exports = router;

const Consent = require('../models/Consent');

// POST /api/agreements
const createOrUpdateConsent = async (req, res) => {
  const { consentType, status, validUntil, details } = req.body;
  const userId = req.user.id;

  try {
    let consent = await Consent.findOne({ userId, consentType });
    if (consent) {
      consent.status = status;
      consent.validUntil = validUntil;
      consent.details = details;
      consent.timestamp = new Date();
      await consent.save();
    } else {
      consent = await Consent.create({
        userId,
        consentType,
        status,
        validUntil,
        details
      });
    }
    res.status(200).json(consent);
  } catch (error) {
    console.error('Error creating/updating consent:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/agreements/marketing
const getMarketingConsent = async (req, res) => {
  try {
    const consents = await Consent.find({ 
      consentType: 'marketing',
      status: 'granted',
      validUntil: { $gt: new Date() }
    });
    res.json(consents);
  } catch (error) {
    console.error('Error fetching marketing consent:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/agreements?consentType=marketing
const getConsentByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const consentType = req.query.consentType;
    let filter = { userId };
    if (consentType) filter.consentType = consentType;

    const consents = await Consent.find(filter);
    res.json(consents);
  } catch (error) {
    console.error('Error fetching user consents:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrUpdateConsent, getConsentByUser, getMarketingConsent };

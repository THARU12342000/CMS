const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Link to Customer _id
  consentType: { type: String, required: true }, // e.g., "marketing"
  status: { type: String, enum: ['granted', 'withdrawn'], required: true },
  timestamp: { type: Date, default: Date.now },
  validUntil: { type: Date },
  details: { type: Object } // Optional: for storing extra info
}, { timestamps: true });

module.exports = mongoose.model('Consent', consentSchema);

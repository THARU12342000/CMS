const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true }, // e.g., "consentCapture", "login", etc.
  timestamp: { type: Date, default: Date.now },
  details: { type: Object }, // Flexible for storing extra info (e.g., consentId, channel, etc.)
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);

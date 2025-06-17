const AuditLog = require('../models/AuditLog');

// Create a new audit log entry
const createAuditLog = async (req, res) => {
  try {
    const { userId, action, details } = req.body;
    const log = new AuditLog({ userId, action, details });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create audit log.' });
  }
};

// Get all audit logs (optionally filter by userId)
const getAuditLogs = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const logs = await AuditLog.find(filter).sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch audit logs.' });
  }
};

module.exports = { createAuditLog, getAuditLogs };

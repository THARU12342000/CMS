const express = require('express');
const router = express.Router();
const { createAuditLog, getAuditLogs } = require('../controllers/auditController');

// POST /api/audit-logs
router.post('/', createAuditLog);

// GET /api/audit-logs?userId=xyz
router.get('/', getAuditLogs);

module.exports = router;

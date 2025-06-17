const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  authCustomer,
  getCustomerProfile,
} = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');
const auditLogger = require('../middleware/auditLogger');

router.post('/register', auditLogger, registerCustomer);
router.post('/login', auditLogger, authCustomer);
router.get('/profile', auditLogger, protect, getCustomerProfile);

module.exports = router;

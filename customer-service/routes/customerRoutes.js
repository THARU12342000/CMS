const express = require('express');
const router = express.Router();
const { registerCustomer, loginCustomer, getCustomerProfile } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.get('/profile', protect, getCustomerProfile);

module.exports = router;

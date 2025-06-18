const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  logoutCustomer
} = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.post('/logout', protect, logoutCustomer);

// Protected routes
router.get('/profile', protect, getCustomerProfile);
router.put('/profile', protect, updateCustomerProfile);

module.exports = router;

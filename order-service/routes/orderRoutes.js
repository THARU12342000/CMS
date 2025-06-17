const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { placeOrder, getOrdersByCustomer } = require('../controllers/orderController');

router.post('/', protect, placeOrder);
router.get('/', protect, getOrdersByCustomer);

module.exports = router;

const Order = require('../models/Order');
const axios = require('axios');

// POST /api/orders
const placeOrder = async (req, res) => {
  const customerId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    // Check if product exists
    try {
      await axios.get(`${process.env.PRODUCT_SERVICE_URL}/api/products/${productId}`);
    } catch (error) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check consent from Agreement Service
    const agreementServiceResponse = await axios.get(
      `${process.env.AGREEMENT_SERVICE_URL}/api/agreements?consentType=marketing`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    const consents = agreementServiceResponse.data;
    // Find a granted consent for the required type
    const hasConsent = consents.some(
      (consent) => consent.status === 'granted'
    );

    if (!hasConsent) {
      return res.status(403).json({ message: 'Consent required before placing orders' });
    }

    const order = await Order.create({
      customer: customerId,
      product: productId,
      quantity,
    });

    // Log order placement to audit service
    try {
      await axios.post(`${process.env.AUDIT_SERVICE_URL}/api/audit`, {
        userId: customerId,
        action: 'place_order',
        details: { productId, quantity }
      });
    } catch (error) {
      console.error('Audit logging failed:', error);
    }

    res.status(201).json(order);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(403).json({ message: 'Consent not found' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/orders
const getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { placeOrder, getOrdersByCustomer };

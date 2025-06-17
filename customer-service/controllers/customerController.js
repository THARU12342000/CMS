const Customer = require('../models/Customer');
const generateToken = require('../utils/generateToken');

// @desc    Register new customer
// @route   POST /api/customers/register
// @access  Public
const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    const customer = await Customer.create({ name, email, password });

    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate customer & get token
// @route   POST /api/customers/login
// @access  Public
const authCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });
    if (customer && (await customer.matchPassword(password))) {
      res.json({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        token: generateToken(customer._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get customer profile
// @route   GET /api/customers/profile
// @access  Private
const getCustomerProfile = async (req, res) => {
  try {
    const customer = req.customer;
    if (customer) {
      res.json({
        _id: customer._id,
        name: customer.name,
        email: customer.email,
      });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerCustomer,
  authCustomer,
  getCustomerProfile,
};

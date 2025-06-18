const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }
  const existingCustomer = await Customer.findOne({ email });
  if (existingCustomer) {
    return res.status(400).json({ message: 'Customer already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const customer = await Customer.create({ name, email, password: hashedPassword });
  // Log registration to audit service
  try {
    await axios.post(`${process.env.AUDIT_SERVICE_URL}/api/audit`, {
      userId: customer._id,
      action: 'register',
      details: { email }
    });
  } catch (error) {
    console.error('Audit logging failed:', error);
  }
  res.status(201).json({
    _id: customer._id,
    name: customer.name,
    email: customer.email,
    token: generateToken(customer._id),
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt
  });
};

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });
  if (customer && (await bcrypt.compare(password, customer.password))) {
    // Log login to audit service
    try {
      await axios.post(`${process.env.AUDIT_SERVICE_URL}/api/audit`, {
        userId: customer._id,
        action: 'login',
        details: { email }
      });
    } catch (error) {
      console.error('Audit logging failed:', error);
    }
    res.json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer._id),
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getCustomerProfile = async (req, res) => {
  const customer = await Customer.findById(req.user._id).select('-password');
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getCustomerProfile
};

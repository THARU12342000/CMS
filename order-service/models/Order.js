const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true }, // Store Customer ID as string
  product: { type: String, required: true },  // Store Product ID as string
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

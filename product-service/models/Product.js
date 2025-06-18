const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters long']
  },
  description: { 
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: { 
    type: String, 
    required: [true, 'Product category is required'],
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  stock: { 
    type: Number, 
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  specifications: {
    type: Map,
    of: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Add indexes for faster queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ sku: 1 });

// Generate SKU before saving
productSchema.pre('save', async function(next) {
  if (!this.sku) {
    const count = await this.constructor.countDocuments();
    this.sku = `SKU${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

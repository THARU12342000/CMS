const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/productController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/search', optionalAuth, searchProducts);
router.get('/:id', optionalAuth, getProductById);

// Protected routes (admin only)
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Proxy routes
app.use('/api/customers', createProxyMiddleware({
  target: process.env.CUSTOMER_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/products', createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/agreements', createProxyMiddleware({
  target: process.env.AGREEMENT_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true
}));

app.use('/api/audit', createProxyMiddleware({
  target: process.env.AUDIT_SERVICE_URL,
  changeOrigin: true
}));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'API Gateway: Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

// Customer Service Proxy
app.use(
  '/api/customers',
  createProxyMiddleware({
    target: process.env.CUSTOMER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/customers': '' }, // <--- THIS IS THE MISSING PART
    logLevel: 'debug',
    onProxyReq(proxyReq, req, res) {
      console.log('Proxying request:', req.method, req.originalUrl);
    },
    onError(err, req, res) {
      console.error('Proxy error:', err);
      res.status(500).json({ message: 'Proxy error' });
    }
  })
);

// Product Service Proxy
app.use('/api/products', createProxyMiddleware({
  target: process.env.PRODUCT_SERVICE_URL,
  changeOrigin: true,
}));

// Agreement Service Proxy
app.use('/api/agreements', createProxyMiddleware({
  target: process.env.AGREEMENT_SERVICE_URL,
  changeOrigin: true,
}));

// Order Service Proxy
app.use('/api/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
}));

// Audit Service Proxy
app.use('/api/audit', createProxyMiddleware({
  target: process.env.AUDIT_SERVICE_URL,
  changeOrigin: true,
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: 'API Gateway: Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

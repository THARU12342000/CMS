const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const options = {
  changeOrigin: true,
  timeout: 60000,
  proxyTimeout: 60000
};

app.use(
  '/api/customers',
  createProxyMiddleware({
    ...options,
    target: process.env.CUSTOMER_SERVICE_URL
  })
);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

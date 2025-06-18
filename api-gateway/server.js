const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Request validation middleware
const validateRequest = (req, res, next) => {
  // Add any global request validation here
  next();
};

// Customer Service Proxy
app.use(
  '/api/customers',
  validateRequest,
  createProxyMiddleware({
    target: process.env.CUSTOMER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/customers': '/api/customers' },
    logLevel: 'debug',
    onProxyReq(proxyReq, req, res) {
      // Forward cookies
      if (req.cookies) {
        proxyReq.setHeader('Cookie', Object.entries(req.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join('; '));
      }
      console.log('Proxying customer request:', req.method, req.originalUrl);
    },
    onError(err, req, res) {
      console.error('Customer proxy error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Customer service error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  })
);

// Product Service Proxy
app.use(
  '/api/products',
  validateRequest,
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/products': '/api/products' },
    logLevel: 'debug',
    onProxyReq(proxyReq, req, res) {
      // Forward cookies
      if (req.cookies) {
        proxyReq.setHeader('Cookie', Object.entries(req.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join('; '));
      }
      console.log('Proxying product request:', req.method, req.originalUrl);
    },
    onError(err, req, res) {
      console.error('Product proxy error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Product service error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  })
);

// Agreement Service Proxy
app.use(
  '/api/agreements',
  validateRequest,
  createProxyMiddleware({
    target: process.env.AGREEMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/agreements': '/api/agreements' },
    logLevel: 'debug',
    onProxyReq(proxyReq, req, res) {
      // Forward cookies
      if (req.cookies) {
        proxyReq.setHeader('Cookie', Object.entries(req.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join('; '));
      }
      console.log('Proxying agreement request:', req.method, req.originalUrl);
    },
    onError(err, req, res) {
      console.error('Agreement proxy error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Agreement service error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  })
);

// Audit Service Proxy
app.use(
  '/api/audit-logs',
  validateRequest,
  createProxyMiddleware({
    target: process.env.AUDIT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/audit-logs': '/api/audit-logs' },
    logLevel: 'debug',
    onProxyReq(proxyReq, req, res) {
      // Forward cookies
      if (req.cookies) {
        proxyReq.setHeader('Cookie', Object.entries(req.cookies)
          .map(([key, value]) => `${key}=${value}`)
          .join('; '));
      }
      console.log('Proxying audit request:', req.method, req.originalUrl);
    },
    onError(err, req, res) {
      console.error('Audit proxy error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Audit service error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  })
);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    service: 'api-gateway',
    timestamp: new Date().toISOString(),
    services: {
      customer: process.env.CUSTOMER_SERVICE_URL,
      product: process.env.PRODUCT_SERVICE_URL,
      agreement: process.env.AGREEMENT_SERVICE_URL,
      audit: process.env.AUDIT_SERVICE_URL
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Gateway error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: 'API Gateway error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Fallback route
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.originalUrl);
  res.status(404).json({ 
    success: false,
    message: 'API Gateway: Route not found' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Services:');
  console.log('- Customer:', process.env.CUSTOMER_SERVICE_URL);
  console.log('- Product:', process.env.PRODUCT_SERVICE_URL);
  console.log('- Agreement:', process.env.AGREEMENT_SERVICE_URL);
  console.log('- Audit:', process.env.AUDIT_SERVICE_URL);
});

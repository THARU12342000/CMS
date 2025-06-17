const auditLogger = (req, res, next) => {
  const { method, originalUrl } = req;
  const timestamp = new Date().toISOString();
  const user = req.customer ? req.customer.email : 'Guest';
  console.log(`[${timestamp}] ${method} ${originalUrl} by ${user}`);
  next();
};

module.exports = auditLogger;

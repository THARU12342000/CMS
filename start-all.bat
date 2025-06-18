@echo off
start "API Gateway" cmd /k "cd api-gateway && npm start"
start "Customer Service" cmd /k "cd customer-service && npm start"
start "Product Service" cmd /k "cd product-service && npm start"
start "Agreement Service" cmd /k "cd agreement-service && npm start"
start "Order Service" cmd /k "cd order-service && npm start"
start "Audit Service" cmd /k "cd audit-service && npm start"
start "Frontend" cmd /k "cd frontend && npm start"
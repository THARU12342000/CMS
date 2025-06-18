@echo off
echo Starting all services...

start cmd /k "cd api-gateway && npm start"
timeout /t 5
start cmd /k "cd customer-service && npm start"
timeout /t 5
start cmd /k "cd product-service && npm start"
timeout /t 5
start cmd /k "cd order-service && npm start"
timeout /t 5
start cmd /k "cd agreement-service && npm start"
timeout /t 5
start cmd /k "cd audit-service && npm start"
timeout /t 5
start cmd /k "cd frontend && npm start"

echo All services started!
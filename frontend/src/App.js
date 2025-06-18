import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/customers/Register';
import Login from './components/customers/Login';
import ProductList from './components/products/ProductList';
import ConsentForm from './components/agreements/ConsentForm';
import OrderForm from './components/orders/OrderForm';
import AuditLogList from './components/audit/AuditLogList';
import api from './api/api';

const Home = () => <h2>Welcome to the Consent Management System</h2>;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/customers/profile')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/consent">Consent</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/audit">Audit</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register onRegister={setUser} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/products" element={user ? <ProductList /> : <Navigate to="/login" />} />
          <Route path="/consent" element={user ? <ConsentForm /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <OrderForm /> : <Navigate to="/login" />} />
          <Route path="/audit" element={user ? <AuditLogList /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Register from './components/customers/Register';
import Login from './components/customers/Login';
import ProductList from './components/products/ProductList';
import ConsentForm from './components/agreements/ConsentForm';
import OrderForm from './components/orders/OrderForm';
import AuditLogList from './components/audit/AuditLogList';
import api from './api/api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Optional: check token in localStorage and fetch profile
    const token = localStorage.getItem('token');
    if (token && !user) {
      api.get('/customers/profile')
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <Register onRegister={setUser} />
        <Login onLogin={setUser} />
      </div>
    );
  }

  return (
    <div>
      <h1>Consent Management System</h1>
      <ProductList />
      <ConsentForm />
      <OrderForm />
      <AuditLogList />
      <button onClick={() => { setUser(null); localStorage.removeItem('token'); }}>Logout</button>
    </div>
  );
}

export default App;

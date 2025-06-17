import React, { useState, useEffect } from 'react';
import api from '../../api/api';

function OrderForm() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      await api.post('/orders', { productId, quantity });
      setMessage('Order placed!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place Order</h2>
      <select value={productId} onChange={e => setProductId(e.target.value)} required>
        <option value="">Select product</option>
        {products.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>
      <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <button type="submit">Order</button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default OrderForm;

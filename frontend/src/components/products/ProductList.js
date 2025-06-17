import React, { useEffect, useState } from 'react';
import api from '../../api/api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? <p>No products found.</p> : (
        <ul>
          {products.map(p => (
            <li key={p._id}>{p.name} - ${p.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../pageStyle/inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);
   
const handleOptionClick = (owner_id) => {
  navigate(`/productDetails/${owner_id}`);
};

  return (
    <div className="inventory-container">
      <h2>All Inventory Products</h2>
      <div className="product-grid">
        {products.map(prod => (
          <div key={prod.owner_id} onClick={()=>handleOptionClick(prod.owner_id)} className="product-card">
            <img
              src={`http://localhost:5000/upload/${prod.image}`}
              alt={prod.name}
              className="product-image"
            />
            <h3>{prod.name}</h3>
            <p><strong>Price:</strong> ₹{prod.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;

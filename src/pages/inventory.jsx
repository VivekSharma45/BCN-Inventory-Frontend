import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fix for `react-router`
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container py-5">
      <h2 className="text-center mb-4">All Inventory Products</h2>

      <div className="row g-4">
        {products.map(prod => (
          <div
            key={prod.owner_id}
            className="col-md-4 col-sm-6"
            onClick={() => handleOptionClick(prod.owner_id)}
          >
            <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ cursor: 'pointer' }}>
              <img
                src={`http://localhost:5000/upload/${prod.image}`}
                alt={prod.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text"><strong>Price:</strong> ₹{prod.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API calls
import '../pageStyle/home.css';

const Home = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);

  const handleCardClick = () =>{
    navigate('/inventory');
  }

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const total = response.data.products.length;
        setProductCount(total);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOptionClick = (type) => {
    navigate(`/inventory?type=${type}`);
  };

  return (
    <div className="home-container">
      <h1>Inventory Management Dashboard</h1>

      {/* Navigation list buttons */}
      <div className="nav-list-section">
        <ul className="nav-list">
          <li>
            <Link to="/login">
              <button className="btn secondary-btn">Login</button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button className="btn secondary-btn">Register</button>
            </Link>
          </li>
          <li>
            <Link to="/add-product">
              <button className="btn">Add Product</button>
            </Link>
          </li>
                    <li>
            <Link to="/productOwner">
              <button className="btn">Owner</button>
            </Link>
          </li>

          <li>
            <Link to="/inventory">
              <button className="btn">View Inventory</button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Summary cards */}
      <div className="dashboard">
        <div className="card" onClick={() => handleOptionClick('inventory')}>
          <h2>Total Products</h2>
          <p>{productCount}</p>
        </div>
        <div className="card">
          <h2>Low Stock Items</h2>
          <p>5</p>
        </div>
        <div className="card">
          <h2>Orders Today</h2>
          <p>17</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

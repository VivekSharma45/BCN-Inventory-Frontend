import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBox, FaExclamationTriangle, FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const [productCount, setProductCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [stockInCount, setStockInCount] = useState(0);
  const [stockOutCount, setStockOutCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get('http://localhost:5000/api/products');
        setProductCount(productsRes.data.products.length);

        const threshold = 10;
        const lowStockRes = await axios.get(`http://localhost:5000/api/stock/low?threshold=${threshold}`);
        setLowStockCount(lowStockRes.data.products.length);

        const stockInRes = await axios.get('http://localhost:5000/api/stock/all');
        setStockInCount(stockInRes.data.stockIns.length);

        const stockOutRes = await axios.get('http://localhost:5000/api/stock/allStockOut');
        setStockOutCount(stockOutRes.data.stockOuts.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (type) => {
    navigate(`/${type}`);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fs-3">📦 Inventory Dashboard</Link>
        </div>
      </nav>

      {/* Hero Heading */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-3 fw-bold">Smart Inventory Management System</h1>
        <p className="lead">Efficiently track, manage and analyze your stock in one place</p>
      </div>

      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar Buttons */}
          <div className="col-md-2 mb-4">
            <div className="d-grid gap-2">
              {[
                { path: '/login', label: 'Login', color: 'dark' },
                { path: '/register', label: 'Register', color: 'secondary' },
                { path: '/add-product', label: 'Add Product', color: 'success' },
                { path: '/productOwner', label: 'Add Owner', color: 'info' },
                { path: '/inventory', label: 'Inventory', color: 'primary' },
                { path: '/stockIn', label: 'Stock In', color: 'warning' },
                { path: '/stockOut', label: 'Stock Out', color: 'danger' },
                { path: '/lowStockItems', label: 'Low Stock Items', color: 'warning' },
                { path: '/stockInList', label: 'Stock In List', color: 'info' },
                { path: '/stockOutList', label: 'Stock Out List', color: 'outline-danger' },
              ].map((btn, i) => (
                <Link key={i} to={btn.path} className={`btn btn-${btn.color}`}>
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="col-md-10">
            <div className="row g-4">
              {[
                {
                  title: 'Total Products',
                  count: productCount,
                  icon: <FaBox size={40} />,
                  bg: 'primary',
                  path: 'inventory',
                },
                {
                  title: 'Low Stock',
                  count: lowStockCount,
                  icon: <FaExclamationTriangle size={40} />,
                  bg: 'warning text-dark',
                  path: 'lowStockItems',
                },
                {
                  title: 'Stock In',
                  count: stockInCount,
                  icon: <FaArrowAltCircleDown size={40} />,
                  bg: 'success',
                  path: 'stockInList',
                },
                {
                  title: 'Stock Out',
                  count: stockOutCount,
                  icon: <FaArrowAltCircleUp size={40} />,
                  bg: 'danger',
                  path: 'stockOutList',
                },
              ].map((card, index) => (
                <div key={index} className="col-md-6">
                  <div
                    className={`card text-white bg-${card.bg} shadow h-100`}
                    onClick={() => handleCardClick(card.path)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="card-body text-center">
                      {card.icon}
                      <h5 className="card-title mt-2">{card.title}</h5>
                      <h3>{card.count}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        &copy; {new Date().getFullYear()} Inventory System | Developed By Vivek Sharma❤️
      </footer>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaBox,
  FaExclamationTriangle,
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaUsers,
  FaChartLine,
  FaCog,
  FaPlus,
  FaList
} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [productCount, setProductCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [stockInCount, setStockInCount] = useState(0);
  const [stockOutCount, setStockOutCount] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const productsRes = await axios.get('https://bcn-inventory-backend.onrender.com/api/products');
        const allProducts = productsRes.data.products || [];
        setProductCount(allProducts.length);
        setLatestProducts(allProducts.slice(-5).reverse());

        const threshold = 10;
        const lowStockRes = await axios.get(`https://bcn-inventory-backend.onrender.com/api/stock/low?threshold=${threshold}`);
        setLowStockCount(lowStockRes.data.products.length);

        const stockInRes = await axios.get('https://bcn-inventory-backend.onrender.com/api/stock/all');
        const filteredStockIns = stockInRes.data.stockIns.filter(item => item.product_id);
        setStockInCount(filteredStockIns.length);

        const stockOutRes = await axios.get('https://bcn-inventory-backend.onrender.com/api/stock/allStockOut');
        const filteredStockOuts = stockOutRes.data.stockOuts.filter(item => item.product_id);
        setStockOutCount(filteredStockOuts.length);

        const ownerRes = await axios.get('https://bcn-inventory-backend.onrender.com/api/owner/all');
        if (ownerRes.data.success) {
          const sortedOwners = ownerRes.data.owners.sort((a, b) =>
            (a.owner_name || "").localeCompare(b.owner_name || "")
          );
          setOwners(sortedOwners);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load dashboard data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (type) => {
    navigate(`/${type}`);
  };

  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleOwnerClick = (id) => {
    navigate(`/owners/${id}/products`);
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-center text-white">
          <div className="spinner-border mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading Dashboard...</h4>
          <p className="text-white-50">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <div className="container-fluid py-3 py-md-4">
        <div className="row align-items-center">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="mb-3 mb-md-0">
                <h1 className="display-6 display-md-4 fw-bold text-white mb-2">
                  📦 BCN Inventory Dashboard
                </h1>
                <p className="text-white-50 fs-6 fs-md-5 mb-0">
                  Smart inventory management at your fingertips
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="container mb-4">
          <div className="alert alert-danger alert-dismissible fade show border-0" 
               style={{ borderRadius: '15px', backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
            <div className="d-flex align-items-center">
              <span className="me-2">⚠️</span>
              {error}
            </div>
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        </div>
      )}

      <div className="container-fluid pb-5">
        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-12 col-lg-3 mb-4">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="card-header bg-white border-0 py-3 py-md-4" style={{ borderRadius: '20px 20px 0 0' }}>
                <div className="d-flex align-items-center">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}>
                    <span style={{ fontSize: '1rem', color: 'white' }}>🧭</span>
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold text-dark">Quick Navigation</h5>
                    <small className="text-muted">Access all features</small>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                {/* Product Management Section */}
                <div className="mb-4">
                  <h6 className="fw-bold text-primary mb-3" style={{ fontSize: '0.9rem' }}>
                    📦 Product Management
                  </h6>
                  <div className="d-grid gap-2">
                    <Link 
                      to="/add-product" 
                      className="btn btn-success btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaPlus />
                      Add New Product
                    </Link>
                    <Link 
                      to="/inventory" 
                      className="btn btn-primary btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaBox />
                      View Inventory
                    </Link>
                    <Link 
                      to="/lowStockItems" 
                      className="btn btn-warning btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaExclamationTriangle />
                      Low Stock Alert
                    </Link>
                  </div>
                </div>

                {/* Stock Management Section */}
                <div className="mb-4">
                  <h6 className="fw-bold text-primary mb-3" style={{ fontSize: '0.9rem' }}>
                    📊 Stock Operations
                  </h6>
                  <div className="d-grid gap-2">
                    <Link 
                      to="/stockIn" 
                      className="btn btn-warning btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaArrowAltCircleDown />
                      Stock In
                    </Link>
                    <Link 
                      to="/stockOut" 
                      className="btn btn-danger btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaArrowAltCircleUp />
                      Stock Out
                    </Link>
                    <Link 
                      to="/stockInList" 
                      className="btn btn-info btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaList />
                      Stock In History
                    </Link>
                    <Link 
                      to="/stockOutList" 
                      className="btn btn-outline-danger btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaList />
                      Stock Out History
                    </Link>
                  </div>
                </div>

                {/* Owner Management Section */}
                <div className="mb-4">
                  <h6 className="fw-bold text-primary mb-3" style={{ fontSize: '0.9rem' }}>
                    👥 Owner Management
                  </h6>
                  <div className="d-grid gap-2">
                    <Link 
                      to="/productOwner" 
                      className="btn btn-info btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaUsers />
                      Add New Owner
                    </Link>
                    <Link 
                      to="/ownerList" 
                      className="btn btn-dark btn-sm text-start d-flex align-items-center gap-2"
                      style={{ borderRadius: '10px', fontSize: '0.9rem', padding: '10px 15px' }}
                    >
                      <FaUsers />
                      Manage Owners
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="col-12 col-lg-9">
            {/* Stats Cards */}
            <div className="row g-3 g-md-4 mb-4">
              {[
                { 
                  title: 'Total Products', 
                  count: productCount, 
                  icon: <FaBox size={24} />, 
                  bg: 'primary',
                  gradient: 'linear-gradient(45deg, #667eea, #764ba2)',
                  path: 'inventory',
                  description: 'Products in inventory'
                },
                { 
                  title: 'Low Stock Alert', 
                  count: lowStockCount, 
                  icon: <FaExclamationTriangle size={24} />, 
                  bg: 'warning',
                  gradient: 'linear-gradient(45deg, #ffc107, #fd7e14)',
                  path: 'lowStockItems',
                  description: 'Items below threshold'
                },
                { 
                  title: 'Stock In', 
                  count: stockInCount, 
                  icon: <FaArrowAltCircleDown size={24} />, 
                  bg: 'success',
                  gradient: 'linear-gradient(45deg, #28a745, #20c997)',
                  path: 'stockInList',
                  description: 'Stock in transactions'
                },
                { 
                  title: 'Stock Out', 
                  count: stockOutCount, 
                  icon: <FaArrowAltCircleUp size={24} />, 
                  bg: 'danger',
                  gradient: 'linear-gradient(45deg, #dc3545, #fd7e14)',
                  path: 'stockOutList',
                  description: 'Stock out transactions'
                },
              ].map((card, index) => (
                <div key={index} className="col-6 col-md-6 col-lg-3">
                  <div 
                    className="card border-0 shadow-sm h-100" 
                    style={{ 
                      cursor: 'pointer',
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                      background: card.gradient
                    }}
                    onClick={() => handleCardClick(card.path)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div className="card-body text-white p-3 p-md-4">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {card.icon}
                        </div>
                        <small className="opacity-75">{card.description}</small>
                      </div>
                      <h3 className="fw-bold mb-1">{card.count}</h3>
                      <h6 className="mb-0 opacity-90">{card.title}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tables Row */}
            <div className="row g-3 g-md-4">
              {/* Latest Products */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
                  <div className="card-header bg-white border-0 py-3 py-md-4" style={{ borderRadius: '20px 20px 0 0' }}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(45deg, #667eea, #764ba2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px'
                        }}>
                          <span style={{ fontSize: '1rem', color: 'white' }}>🆕</span>
                        </div>
                        <div>
                          <h5 className="mb-0 fw-bold text-dark">Latest Products</h5>
                          <small className="text-muted">Recently added items</small>
                        </div>
                      </div>
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate('/inventory')}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="border-0 px-3 px-md-4" style={{ fontSize: '0.9rem' }}>#</th>
                            <th className="border-0 px-3 px-md-4" style={{ fontSize: '0.9rem' }}>Product Name</th>
                            <th className="border-0 px-3 px-md-4" style={{ fontSize: '0.9rem' }}>Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {latestProducts.length === 0 ? (
                            <tr>
                              <td colSpan="3" className="text-center py-4 text-muted">
                                <div className="d-flex flex-column align-items-center">
                                  <span style={{ fontSize: '2rem' }}>📦</span>
                                  <p className="mb-0 mt-2">No products found</p>
                                  <button 
                                    className="btn btn-primary btn-sm mt-2"
                                    onClick={() => navigate('/add-product')}
                                  >
                                    Add Your First Product
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            latestProducts.map((product, index) => (
                              <tr key={index} className="border-bottom">
                                <td className="px-3 px-md-4 fw-bold text-muted">{index + 1}</td>
                                <td className="px-3 px-md-4">
                                  <div className="d-flex align-items-center">
                                    <span className="me-2" style={{ fontSize: '1.2rem' }}>
                                      {product.name.toLowerCase().includes('laptop') ? '💻' :
                                       product.name.toLowerCase().includes('phone') ? '📱' :
                                       product.name.toLowerCase().includes('ghee') ? '🫕' :
                                       product.name.toLowerCase().includes('oil') ? '🛢️' : '📦'}
                                    </span>
                                    <span className="fw-semibold">{product.name}</span>
                                  </div>
                                </td>
                                <td className="px-3 px-md-4">
                                  <span className={`badge fs-6 px-2 py-1 ${
                                    product.product_quantity < 10 ? 'bg-danger' : 
                                    product.product_quantity < 50 ? 'bg-warning' : 'bg-success'
                                  }`}>
                                    {product.product_quantity}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner List */}
              <div className="col-12 col-lg-6">
                <div className="card border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
                  <div className="card-header bg-white border-0 py-3 py-md-4" style={{ borderRadius: '20px 20px 0 0' }}>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(45deg, #28a745, #20c997)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px'
                        }}>
                          <span style={{ fontSize: '1rem', color: 'white' }}>👤</span>
                        </div>
                        <div>
                          <h5 className="mb-0 fw-bold text-dark">Product Owners</h5>
                          <small className="text-muted">Registered suppliers</small>
                        </div>
                      </div>
                      <button 
                        className="btn btn-outline-success btn-sm"
                        onClick={() => navigate('/ownerList')}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="border-0 px-3 px-md-4" style={{ fontSize: '0.9rem' }}>Owner Name</th>
                            <th className="border-0 px-3 px-md-4" style={{ fontSize: '0.9rem' }}>Company</th>
                          </tr>
                        </thead>
                        <tbody>
                          {owners.length === 0 ? (
                            <tr>
                              <td colSpan="2" className="text-center py-4 text-muted">
                                <div className="d-flex flex-column align-items-center">
                                  <span style={{ fontSize: '2rem' }}>👥</span>
                                  <p className="mb-0 mt-2">No owners found</p>
                                  <button 
                                    className="btn btn-success btn-sm mt-2"
                                    onClick={() => navigate('/productOwner')}
                                  >
                                    Add Your First Owner
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            owners.map((owner, index) => (
                              <tr key={owner._id} className="border-bottom">
                                <td className="px-3 px-md-4">
                                  <button 
                                    className="btn btn-link text-decoration-none text-primary p-0 fw-semibold"
                                    onClick={() => handleOwnerClick(owner._id)}
                                    style={{ fontSize: '0.9rem' }}
                                  >
                                    <span className="me-2">👤</span>
                                    {capitalizeWords(owner.owner_name || "Unnamed")}
                                  </button>
                                </td>
                                <td className="px-3 px-md-4">
                                  <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                                    {capitalizeWords(owner.company_name || "N/A")}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} BCN Inventory System | Developed with ❤️ by Vivek Sharma
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

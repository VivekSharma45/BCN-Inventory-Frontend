import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://bcn-inventory-backend.onrender.com/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await axios.delete(`https://bcn-inventory-backend.onrender.com/api/products/delete/${id}`);
        if (res.data.success) {
          alert("Product deleted successfully");
          fetchProducts(); // refresh list
        } else {
          alert("Failed to delete product");
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("Something went wrong");
      }
    }
  };

  const handleProductClick = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const getProductSymbol = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('laptop')) return '💻';
    if (lower.includes('phone') || lower.includes('mobile')) return '📱';
    if (lower.includes('mouse')) return '🖱️';
    if (lower.includes('keyboard')) return '⌨️';
    if (lower.includes('printer')) return '🖨️';
    if (lower.includes('camera')) return '📷';
    if (lower.includes('tv') || lower.includes('television')) return '📺';
    if (lower.includes('fan')) return '🌀';
    if (lower.includes('speaker')) return '🔊';
    if (lower.includes('router')) return '📡';
    if (lower.includes('ghee')) return '🫕';
    if (lower.includes('oil')) return '🛢️';
    if (lower.includes('rice')) return '🍚';
    if (lower.includes('sugar')) return '🍯';
    if (lower.includes('salt')) return '🧂';
    if (lower.includes('milk')) return '🥛';
    if (lower.includes('bread')) return '🍞';
    if (lower.includes('egg')) return '🥚';
    if (lower.includes('meat')) return '🥩';
    if (lower.includes('fish')) return '🐟';
    if (lower.includes('vegetable')) return '🥬';
    if (lower.includes('fruit')) return '🍎';
    return '📦';
  };

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="text-primary">Loading Inventory...</h4>
          <p className="text-muted">Please wait while we fetch your products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="container py-3 py-md-5">
        {/* Header Section */}
        <div className="row mb-4 mb-md-5">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="mb-3 mb-md-0">
                <h1 className="display-6 display-md-5 fw-bold text-primary mb-2">
                  📦 Inventory Dashboard
                </h1>
                <p className="text-muted fs-6 fs-md-5">
                  Manage your product inventory efficiently
                </p>
              </div>
              <div className="btn-group-vertical btn-group-sm d-md-none w-100 mb-3">
                <button className="btn btn-primary" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-success" onClick={() => navigate("/add-product")}>
                  ➕ Add Product
                </button>
                <button className="btn btn-warning" onClick={() => navigate("/ownerList")}>
                  🧑‍💼 Owners
                </button>
              </div>
              <div className="btn-group d-none d-md-flex">
                <button className="btn btn-primary" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-success" onClick={() => navigate("/add-product")}>
                  ➕ Add Product
                </button>
                <button className="btn btn-warning" onClick={() => navigate("/ownerList")}>
                  🧑‍💼 Owners
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-6 col-md-3 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-3 p-md-4">
                <div className="mb-2 mb-md-3">
                  <span style={{ fontSize: '2rem', fontSize: '1.5rem' }}>📊</span>
                </div>
                <h4 className="fw-bold text-primary mb-1">{products.length}</h4>
                <p className="text-muted mb-0 small">Total Products</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-3 p-md-4">
                <div className="mb-2 mb-md-3">
                  <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                </div>
                <h4 className="fw-bold text-warning mb-1">
                  {products.filter(p => p.product_quantity < 10).length}
                </h4>
                <p className="text-muted mb-0 small">Low Stock</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-3 p-md-4">
                <div className="mb-2 mb-md-3">
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                </div>
                <h4 className="fw-bold text-success mb-1">
                  {products.filter(p => p.product_quantity >= 50).length}
                </h4>
                <p className="text-muted mb-0 small">Well Stocked</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center p-3 p-md-4">
                <div className="mb-2 mb-md-3">
                  <span style={{ fontSize: '1.5rem' }}>🔍</span>
                </div>
                <h4 className="fw-bold text-info mb-1">{filteredProducts.length}</h4>
                <p className="text-muted mb-0 small">Filtered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show border-0 mb-4" 
               style={{ borderRadius: '15px', backgroundColor: '#fee' }}>
            <div className="d-flex align-items-center">
              <span className="me-2">⚠️</span>
              {error}
            </div>
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {/* Search Bar */}
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
          <div className="card-body p-3 p-md-4">
            <div className="input-group">
              <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                🔍
              </span>
              <input
                type="text"
                className="form-control border-0"
                style={{ backgroundColor: '#f8f9fa' }}
                placeholder="Search products by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
          <div className="card-header bg-primary text-white py-3">
            <h4 className="mb-0 fw-bold">📋 Product Inventory</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="border-0 px-3 px-md-4" style={{ width: '50px' }}>#</th>
                    <th className="border-0 px-3 px-md-4">Product Name</th>
                    <th className="border-0 px-3 px-md-4 d-none d-md-table-cell">Stock Level</th>
                    <th className="border-0 px-3 px-md-4" style={{ width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((prod, index) => (
                      <tr key={prod._id} className="border-bottom">
                        <td className="px-3 px-md-4 fw-bold text-muted">{index + 1}</td>
                        <td className="px-3 px-md-4">
                          <div 
                            className="d-flex align-items-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleProductClick(prod._id)}
                          >
                            <span className="me-2 me-md-3" style={{ fontSize: '1.2rem' }}>
                              {getProductSymbol(prod.name)}
                            </span>
                            <div>
                              <h6 className="mb-0 fw-semibold text-dark">
                                {capitalizeFirstLetter(prod.name)}
                              </h6>
                              <small className="text-muted d-none d-md-block">
                                ID: {prod._id.slice(-6)}
                              </small>
                              <small className="text-muted d-md-none">
                                Stock: {prod.product_quantity} items
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 px-md-4 d-none d-md-table-cell">
                          <span className={`badge fs-6 px-3 py-2 ${
                            prod.product_quantity < 10 ? 'bg-danger' : 
                            prod.product_quantity < 50 ? 'bg-warning' : 'bg-success'
                          }`}>
                            {prod.product_quantity} items
                          </span>
                        </td>
                        <td className="px-3 px-md-4">
                          <div className="d-flex flex-column flex-md-row gap-1 gap-md-2">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEditClick(prod._id)}
                              style={{ borderRadius: '6px', fontSize: '0.8rem' }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(prod._id)}
                              style={{ borderRadius: '6px', fontSize: '0.8rem' }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-5">
                        <div className="text-muted">
                          <span style={{ fontSize: '3rem' }}>📭</span>
                          <h5 className="mt-3">
                            {search ? 'No products found matching your search.' : 'No products found.'}
                          </h5>
                          {!search && (
                            <button 
                              className="btn btn-primary mt-2"
                              onClick={() => navigate("/add-product")}
                            >
                              Add Your First Product
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

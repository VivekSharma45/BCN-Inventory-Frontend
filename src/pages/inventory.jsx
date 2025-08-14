import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // ✅ Fetch all products
  const fetchProducts = () => {
    fetch('https://bcn-inventory-backend.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
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
    return '📦';
  };

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5 bg-light rounded">
      {/* Top Navigation + Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📦 Inventory Products</h2>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => navigate("/")}>🏠 Home</button>
          <button className="btn btn-success" onClick={() => navigate("/add-product")}>➕ Add Product</button>
          <button className="btn btn-warning" onClick={() => navigate("/ownerList")}>🧑‍💼 Owners</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control border-primary shadow-sm"
          placeholder="🔍 Search product by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product Table */}
      <div className="table-responsive shadow rounded">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="table-dark text-white">
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Product Name</th>
              <th>Total Number of Items</th>
              <th style={{ width: '120px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod, index) => (
                <tr key={prod._id}>
                  <td>{index + 1}</td>
                  <td
                    className="fw-semibold"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleProductClick(prod._id)}
                  >
                    {getProductSymbol(prod.name)} {capitalizeFirstLetter(prod.name)}
                  </td>
                  <td>{prod.product_quantity} </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(prod._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;

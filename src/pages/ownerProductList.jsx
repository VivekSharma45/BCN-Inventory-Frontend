import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OwnerProducts = () => {
  const { id } = useParams(); // Owner ID from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch products by owner ID only
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`https://bcn-inventory-backend.onrender.com/api/products/byowner/${id}`);
        if (res.data.success) {
          setProducts(res.data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleProductClick = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  // ✅ Get owner info from first product (if available)
  const ownerInfo = products.length > 0 ? `${products[0].owner_name} ` : '';

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📦 Inventory Products</h2>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => navigate("/")}>🏠 Home</button>
          <button className="btn btn-success" onClick={() => navigate("/add-product")}>➕ Add Product</button>
          <button className="btn btn-warning" onClick={() => navigate("/productOwner")}>➕ Add Owner</button>
        </div>
      </div>
      <h4>
        Products by:{' '}
        <span className="text-primary">
          {loading ? "Loading..." : ownerInfo || "Owner not found"}
        </span>
      </h4>

      {loading ? (
        <p className="mt-4">Loading products...</p>
      ) : (
        <table className="table table-striped table-hover mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
             <th>Total No. Of Items</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((prod, idx) => (
                <tr
                  key={prod._id}
                  onClick={() => handleProductClick(prod._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{idx + 1}</td>
                  <td>{prod.name}</td>
                  <td>{prod.product_quantity}</td>
                  <td>{prod.quantity}</td>
                  <td>{prod.unit}</td>
                  <td>{prod.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No products found for this owner</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerProducts;

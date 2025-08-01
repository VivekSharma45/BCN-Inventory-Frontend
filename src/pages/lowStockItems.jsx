import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const LowStockItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [threshold, setThreshold] = useState(10);

  useEffect(() => {
    fetchLowStockItems();
  }, [threshold]);

  const fetchLowStockItems = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/stock/low?threshold=${threshold}`);
      setProducts(res.data.products); // Ensure backend sends { products: [...] }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching low stock items", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-danger">🔻 Low Stock Items</h2>


      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="alert alert-success text-center">✅ All items are well-stocked!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
                <th>Expiry Date</th>
                <th>Owner ID</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className={item.quantity < threshold ? "text-danger fw-bold" : ""}>
                    {item.quantity}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.expiry ? new Date(item.expiry).toLocaleDateString() : "N/A"}</td>
                  <td>{item.owner_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LowStockItems;

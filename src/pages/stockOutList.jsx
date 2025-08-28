// src/pages/StockOutList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const StockOutList = () => {
  const [stockOuts, setStockOuts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStockOut = async () => {
      try {
        const response = await axios.get('https://bcn-inventory-backend.onrender.com/api/stock/allStockOut');
        setStockOuts(response.data?.stockOuts || []);
      } catch (error) {
        console.error('Error fetching stock out data:', error);
        setStockOuts([]);
      }
    };

    fetchStockOut();
  }, []);

  return (
    <div className="container mt-5">
     <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📦 Inventory Products</h2>
        <div className="btn-group">
          <button className="btn btn-warning" onClick={() => navigate("/")}>🏠 Home</button>
          <button className="btn btn-success" onClick={() => navigate("/add-product")}>➕ Add Product</button>
          <button className="btn btn-warning" onClick={() => navigate("/productOwner")}>➕ Add Owner</button>
        </div>
      </div>


      <h2 className="mb-4 text-primary text-center">📤 All Stock Out Entries</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity Out</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {stockOuts.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No stock out entries found.
                </td>
              </tr>
            ) : (
              stockOuts
                .filter(item => item.product_id && item.product_id.name) // ❗ Delete wala filter
                .map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{item.product_id.name}</td>
                    <td>{item.product_quantity || item.quantity}</td>
                    <td>{item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOutList;

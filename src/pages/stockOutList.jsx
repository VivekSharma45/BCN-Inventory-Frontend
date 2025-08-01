// src/pages/StockOutList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockOutList = () => {
  const [stockOuts, setStockOuts] = useState([]);

  useEffect(() => {
    const fetchStockOut = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stock/allStockOut');
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
              stockOuts.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item?.product_id?.name || "N/A"}</td>
                  <td>{item?.quantity}</td>
                  <td>{item?.date ? new Date(item.date).toLocaleDateString() : "N/A"}</td>
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

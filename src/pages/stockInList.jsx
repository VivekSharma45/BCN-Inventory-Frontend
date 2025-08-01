import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockInList = () => {
  const [stockIns, setStockIns] = useState([]);

  useEffect(() => {
    const fetchStockIn = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stock/all');
        setStockIns(response.data.stockIns);
      } catch (error) {
        console.error('Error fetching stock in data:', error);
      }
    };

    fetchStockIn();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">📦 All Stock In Entries</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity In</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {stockIns.length > 0 ? (
                  stockIns.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="fw-semibold">
                          {item.product_id?.name || "N/A"}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success">
                          {item.quantity}
                        </span>
                      </td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No stock in entries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInList;

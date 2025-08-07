import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const StockOut = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    unit: "",
    note: "",
    product_quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/stock/out", {
        ...formData,
        type: "out",
      });
      alert("✅ Stock Out Successfully");
      setFormData({ product_id: "", quantity: "", unit: "", note: "", product_quantity: "" });
    } catch (error) {
      console.error("Stock Out Failed");
      alert("❌ Stock Out Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-info text-danger">

           <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark"> Inventory Products</h2>
        <div className="btn-group">
          <button className="btn btn-warning" onClick={() => navigate("/")}>🏠 Home</button>
          <button className="btn btn-success" onClick={() => navigate("/add-product")}>➕ Add Product</button>
          <button className="btn btn-warning" onClick={() => navigate("/productOwner")}>➕ Add Owner</button>
        </div>
      </div>

          <h3 className="mb-0  align-items-center" >📦 Stock Out Entry</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Product ID */}
            <div className="mb-3">
              <label htmlFor="product_id" className="form-label">
                Product ID
              </label>
              <input
                type="text"
                className="form-control"
                id="product_id"
                value={formData.product_id}
                onChange={(e) =>
                  setFormData({ ...formData, product_id: e.target.value })
                }
                required
              />
            </div>
                        <div className="mb-3">
              <label htmlFor="product_quantity" className="form-label">
                Total Number of Items
              </label>
              <input
                type="number"
                className="form-control"
                id="product_quantity"
                min="1"
                value={formData.product_quantity}
                onChange={(e) =>
                  setFormData({ ...formData, product_quantity: e.target.value })
                }
                required
              />
            </div>


            {/* Quantity */}
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
            </div>

            {/* Unit */}
            <div className="mb-3">
              <label htmlFor="unit" className="form-label">
                Unit
              </label>
              <select
                className="form-select"
                id="unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                required
              >
                <option value="">Select unit</option>
                <option value="kg">Kg</option>
                <option value="liter">Liter</option>
                <option value="piece">Piece</option>
                <option value="packet">Packet</option>
                <option value="box">Box</option>
              </select>
            </div>

            {/* Note */}
            <div className="mb-3">
              <label htmlFor="note" className="form-label">
                Note (Optional)
              </label>
              <textarea
                className="form-control"
                id="note"
                rows="3"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? "Processing..." : "Submit Stock Out"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StockOut;

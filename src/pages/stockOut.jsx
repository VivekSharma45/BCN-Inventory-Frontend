import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const StockOut = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    unit: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/stock/out", {
        ...formData,
        type: "out",
      });
      alert("✅ Stock Out Successfully");
      setFormData({ product_id: "", quantity: "", unit: "", note: "" });
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
        <div className="card-header bg-danger text-white">
          <h4 className="mb-0">📦 Stock Out Entry</h4>
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

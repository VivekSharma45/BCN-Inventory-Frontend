import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StockIn = () => {
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
      await axios.post("https://bcn-inventory-backend.onrender.com/api/stock/in", {
        ...formData,
        type: "in"
      });
      alert("✅ Stock In Successfully");
      setFormData({ product_id: "", quantity: "", unit: "", note: "" , product_quantity: ""});
    } catch (error) {
      console.error("Stock In Failed", error);
      alert("❌ Stock In Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body">
         <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📦 Inventory Products</h2>
        <div className="btn-group">
          <button className="btn btn-warning" onClick={() => navigate("/")}>🏠 Home</button>
          <button className="btn btn-success" onClick={() => navigate("/add-product")}>➕ Add Product</button>
          <button className="btn btn-warning" onClick={() => navigate("/productOwner")}>➕ Add Owner</button>
        </div>
      </div>
      

              <h3 className="card-title mb-4 text-center text-primary">
                📦 Stock In Entry
              </h3>
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-bold">🔢 Product ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product ID"
                    value={formData.product_id}
                    onChange={(e) =>
                      setFormData({ ...formData, product_id: e.target.value })
                    }
                    required
                  />
                </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">📦 Total Number of Items</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      placeholder="Enter number of items"
                      value={formData.product_quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, product_quantity: e.target.value })
                      }
                      required
                    />
                  </div>


                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">📦 Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      placeholder="Enter quantity"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">📐 Unit</label>
                    <select
                      className="form-select"
                      value={formData.unit}
                      onChange={(e) =>
                        setFormData({ ...formData, unit: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Unit</option>
                      <option value="kg">Kg</option>
                      <option value="liter">Liter</option>
                      <option value="piece">Piece</option>
                      <option value="packet">Packet</option>
                      <option value="box">Box</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">📝 Note (Optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Add a note (if any)"
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? "⏳ Processing..." : "✅ Submit Stock In"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockIn;

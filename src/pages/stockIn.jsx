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
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.product_id.trim()) {
      setError("Product ID is required");
      return false;
    }
    if (!formData.product_quantity || formData.product_quantity <= 0) {
      setError("Total number of items must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("https://bcn-inventory-backend.onrender.com/api/stock/in", {
        ...formData,
        type: "in"
      });
      
      if (res.data.success) {
        alert("✅ Stock In Successfully");
        setFormData({ product_id: "", quantity: "", unit: "", note: "", product_quantity: "" });
      } else {
        setError(res.data.message || "Failed to record stock in");
      }
    } catch (error) {
      console.error("Stock In Failed", error);
      setError(error.response?.data?.message || "❌ Stock In Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container py-3 py-md-5">
        {/* Header */}
        <div className="row mb-4 mb-md-5">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
              <div className="mb-3 mb-md-0">
                <h1 className="display-6 display-md-5 fw-bold text-white mb-2">
                  📦 Stock In Entry
                </h1>
                <p className="text-white-50 fs-6 fs-md-5">
                  Add new stock to your inventory
                </p>
              </div>
              <div className="btn-group-vertical btn-group-sm d-md-none w-100 mb-3">
                <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/add-product")}>
                  ➕ Add Product
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/ownerList")}>
                  👥 Owners
                </button>
              </div>
              <div className="btn-group d-none d-md-flex">
                <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/add-product")}>
                  ➕ Add Product
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/ownerList")}>
                  👥 Owners
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="card-header bg-success text-white border-0 py-3 py-md-4" style={{ borderRadius: '20px 20px 0 0' }}>
                <div className="d-flex align-items-center">
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>📦</span>
                  </div>
                  <div>
                    <h3 className="mb-1 fw-bold fs-4 fs-md-3">Stock In Form</h3>
                    <p className="mb-0 opacity-75 small">Enter stock details to add to inventory</p>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-3 p-md-5">
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show border-0 mb-4" 
                       style={{ borderRadius: '12px', backgroundColor: '#fee' }}>
                    <div className="d-flex align-items-center">
                      <span className="me-2">⚠️</span>
                      {error}
                    </div>
                    <button type="button" className="btn-close" onClick={() => setError("")}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Product Information */}
                  <div className="mb-4">
                    <h5 className="fw-bold text-primary mb-3">🔢 Product Information</h5>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Product ID *</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                          🔢
                        </span>
                        <input
                          type="text"
                          className="form-control border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                          placeholder="Enter Product ID"
                          value={formData.product_id}
                          onChange={handleChange}
                          name="product_id"
                          required
                        />
                      </div>
                      <small className="text-muted">Enter the product ID from the inventory</small>
                    </div>
                  </div>

                  {/* Stock Details */}
                  <div className="mb-4">
                    <h5 className="fw-bold text-primary mb-3">📦 Stock Details</h5>
                    <div className="row">
                      <div className="col-12 col-md-6 mb-3">
                        <label className="form-label fw-semibold">Total Items *</label>
                        <div className="input-group">
                          <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                            📦
                          </span>
                          <input
                            type="number"
                            className="form-control border-0"
                            style={{ backgroundColor: '#f8f9fa' }}
                            min="1"
                            placeholder="Enter number of items"
                            value={formData.product_quantity}
                            onChange={handleChange}
                            name="product_quantity"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 mb-3">
                        <label className="form-label fw-semibold">Quantity (Optional)</label>
                        <div className="input-group">
                          <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                            📊
                          </span>
                          <input
                            type="number"
                            className="form-control border-0"
                            style={{ backgroundColor: '#f8f9fa' }}
                            min="0.01"
                            step="0.01"
                            placeholder="Enter quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            name="quantity"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 mb-3">
                        <label className="form-label fw-semibold">Unit (Optional)</label>
                        <div className="input-group">
                          <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                            📐
                          </span>
                          <select
                            className="form-select border-0"
                            style={{ backgroundColor: '#f8f9fa' }}
                            value={formData.unit}
                            onChange={handleChange}
                            name="unit"
                          >
                            <option value="">Select Unit</option>
                            <option value="kg">Kg</option>
                            <option value="liter">Liter</option>
                            <option value="piece">Piece</option>
                            <option value="packet">Packet</option>
                            <option value="box">Box</option>
                            <option value="gram">Gram</option>
                            <option value="ml">ml</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <h5 className="fw-bold text-primary mb-3">📝 Additional Notes</h5>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Notes (Optional)</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                          📝
                        </span>
                        <textarea
                          className="form-control border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                          rows="3"
                          placeholder="Add any additional notes or comments"
                          value={formData.note}
                          onChange={handleChange}
                          name="note"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="d-flex flex-column flex-md-row gap-3 justify-content-end">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary px-4 py-2 order-2 order-md-1"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success px-4 py-2 fw-semibold order-1 order-md-2"
                      style={{
                        background: 'linear-gradient(45deg, #28a745, #20c997)',
                        border: 'none',
                        borderRadius: '8px'
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Processing...
                        </>
                      ) : (
                        '✅ Submit Stock In'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
              <div className="card-body p-3 p-md-4">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <span style={{ fontSize: '1.5rem' }}>💡</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Stock In Process</h6>
                    <p className="text-muted mb-0 small">
                      When you submit stock in, the total number of items will be added to the product's inventory count.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockIn;

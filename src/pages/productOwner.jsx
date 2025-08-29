import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductOwner = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    owner_name: "",
    phone: "",
    gst: "",
    register: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://bcn-inventory-backend.onrender.com/api/owner/all")
      .then((res) => {
        if (res.data.success) setOwners(res.data.owners);
      })
      .catch((err) => console.error("Error fetching owners:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.company_name.trim()) {
      setError("Company name is required");
      return false;
    }
    if (!formData.owner_name.trim()) {
      setError("Owner name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!formData.register) {
      setError("Register date is required");
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
      const res = await axios.post("https://bcn-inventory-backend.onrender.com/api/owner/create", formData);
      if (res.data.success) {
        alert("✅ Owner added successfully");
        navigate("/ownerList");
      } else {
        setError(res.data.message || "Failed to add owner");
      }
    } catch (err) {
      console.error("❌ Error adding Owner:", err);
      setError(err.response?.data?.message || "Failed to add owner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container py-3 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
              <div className="card-header bg-primary text-white border-0 py-3 py-md-4" style={{ borderRadius: '20px 20px 0 0' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 mb-md-4">
                  <div className="mb-3 mb-md-0">
                    <h2 className="fw-bold text-white mb-2 fs-3 fs-md-2">📦 BCN Inventory System</h2>
                    <p className="text-white-50 mb-0 small">Add a new product owner</p>
                  </div>
                  <div className="btn-group-vertical btn-group-sm d-md-none w-100">
                    <button className="btn btn-light" onClick={() => navigate("/")}>🏠 Home</button>
                    <button className="btn btn-light" onClick={() => navigate("/add-product")}>➕ Add Product</button>
                    <button className="btn btn-light" onClick={() => navigate("/ownerList")}>👥 View Owners</button>
                  </div>
                  <div className="btn-group d-none d-md-flex">
                    <button className="btn btn-light" onClick={() => navigate("/")}>🏠 Home</button>
                    <button className="btn btn-light" onClick={() => navigate("/add-product")}>➕ Add Product</button>
                    <button className="btn btn-light" onClick={() => navigate("/ownerList")}>👥 View Owners</button>
                  </div>
                </div>
                <h3 className="mb-0 fs-4 fs-md-3">Add Product Owner</h3>
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
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Company Name *</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                          🏢
                        </span>
                        <input
                          type="text"
                          className="form-control border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          placeholder="Enter company name"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Owner Name *</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                          👤
                        </span>
                        <input
                          type="text"
                          className="form-control border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                          name="owner_name"
                          value={formData.owner_name}
                          onChange={handleChange}
                          placeholder="Enter owner name"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Contact Number *</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                          📞
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter contact number"
                          pattern="[0-9]{10,}"
                          title="Please enter a valid phone number (10 digits minimum)"
                          required
                        />
                      </div>
                      <small className="text-muted">Enter a valid phone number (10 digits minimum)</small>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">GST Number (Optional)</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                          🏛️
                        </span>
                        <input
                          type="text"
                          name="gst"
                          className="form-control border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                          value={formData.gst}
                          onChange={handleChange}
                          placeholder="Enter GST number (optional)"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Register Date *</label>
                      <div className="input-group">
                        <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                          📅
                        </span>
                        <input
                          type="date"
                          name="register"
                          className="form-control border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                          value={formData.register}
                          onChange={handleChange}
                          max={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column flex-md-row gap-3 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4 py-2 order-2 order-md-1"
                      onClick={() => navigate("/ownerList")}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2 fw-semibold order-1 order-md-2"
                      style={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        border: 'none',
                        borderRadius: '8px'
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Adding Owner...
                        </>
                      ) : (
                        '✅ Add Owner'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOwner;

import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductOwner = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    owner_name: '',
    phone: '',
    product: '',
    owner_id: '',
    register: ''
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/owner")
      .then((res) => {
        console.log("Owners fetched:", res.data.owners);
      })
      .catch((err) => console.error("Error fetching owners:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/owner/create", formData);
      alert("✅ Owner added successfully");
    } catch (err) {
      console.error("❌ Error adding Owner:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Add Product Owner</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="company_name"
                className="form-control"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Owner Name</label>
              <input
                type="text"
                name="owner_name"
                className="form-control"
                value={formData.owner_name}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Owner ID</label>
              <input
                type="text"
                name="owner_id"
                className="form-control"
                value={formData.owner_id}
                onChange={handleChange}
                placeholder="Enter owner ID"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Register Date</label>
              <input
                type="date"
                name="register"
                className="form-control"
                value={formData.register}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Product</label>
              <input
                type="text"
                name="product"
                className="form-control"
                value={formData.product}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Submit Owner Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductOwner;

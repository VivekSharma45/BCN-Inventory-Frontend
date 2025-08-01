import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [form, setForm] = useState({
    company_name: "",
    owner_name: "",
    phone: "",
    owner_id: "",
    register: "",
    product: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/owners", form);
      alert("Owner registered successfully");
    } catch (err) {
      console.error("Error registering owner:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4">Register Owner</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              name="company_name"
              placeholder="Enter company name"
              value={form.company_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Owner Name</label>
            <input
              type="text"
              className="form-control"
              name="owner_name"
              placeholder="Enter owner name"
              value={form.owner_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Owner ID</label>
            <input
              type="text"
              className="form-control"
              name="owner_id"
              placeholder="Enter owner ID"
              value={form.owner_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Register Date</label>
            <input
              type="date"
              className="form-control"
              name="register"
              value={form.register}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Type</label>
            <input
              type="text"
              className="form-control"
              name="product"
              placeholder="Enter product type"
              value={form.product}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register Owner
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

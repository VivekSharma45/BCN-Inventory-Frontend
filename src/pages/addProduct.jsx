import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    unit: "",
    price_BCN: "",
    register: "",
    expiry: "",
    owner_name: "",
    description: "",
    owner_id: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post("http://localhost:5000/api/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product added successfully");
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name</label>
              <input
                name="name"
                className="form-control"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Price (₹)</label>
              <input
                name="price"
                className="form-control"
                placeholder="Enter price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Quantity</label>
              <input
                name="quantity"
                className="form-control"
                placeholder="Enter quantity"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Unit</label>
              <select
                name="unit"
                className="form-select"
                value={form.unit}
                onChange={handleChange}
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

            <div className="col-md-6 mb-3">
              <label className="form-label">Price BCN</label>
              <input
                name="price_BCN"
                className="form-control"
                placeholder="Optional BCN price"
                value={form.price_BCN}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Owner ID</label>
              <input
                name="owner_id"
                className="form-control"
                placeholder="Enter owner ID"
                value={form.owner_id}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Register Date</label>
              <input
                name="register"
                type="date"
                className="form-control"
                value={form.register}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Expiry Date</label>
              <input
                name="expiry"
                type="date"
                className="form-control"
                value={form.expiry}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Owner Name</label>
              <input
                name="owner_name"
                className="form-control"
                placeholder="Enter owner name"
                value={form.owner_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Enter product description"
                value={form.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="col-md-6 mb-4">
              <label className="form-label">Product Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

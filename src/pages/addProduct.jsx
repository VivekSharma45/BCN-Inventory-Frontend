// src/pages/AddProduct.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../pageStyle/addProduct.css';

const AddProduct = () => {
  const [owners, setOwners] = useState([]);
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

useEffect(() => {
  axios.get("http://localhost:5000/api/products")  // ✅ CORRECTED
    .then((res) => {
      console.log("Fetched products:", res.data.products);
    })
    .catch((err) => console.error("Error fetching products:", err));
}, []);

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
      // Optionally reset form here
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Product Name</label>
        <input
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <label>Quantity</label>
        <input
          name="quantity"
          value={form.quantity}
          placeholder="Quantity"
          onChange={handleChange}
          required
        />

        <label>Unit</label>
        <select name="unit" value={form.unit} onChange={handleChange} required>
          <option value="">Select unit</option>
          <option value="kg">Kg</option>
          <option value="liter">Liter</option>
          <option value="piece">Piece</option>
          <option value="packet">Packet</option>
          <option value="box">Box</option>
        </select>

        <label>Price BCN</label>
        <input
          name="price_BCN"
          value={form.price_BCN}
          placeholder="Price BCN"
          onChange={handleChange}
        />
                <label>Owner Id</label>
        <input
          name="owner_id"
          value={form.owner_id}
          placeholder="Owner id"
          onChange={handleChange}
        />


        <label>Register Date</label>
        <input
          name="register"
          type="date"
          value={form.register}
          onChange={handleChange}
          required
        />

        <label>Expiry Date</label>
        <input
          name="expiry"
          type="date"
          value={form.expiry}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
        />

      <label>Owner Name</label>
        <input
          name="owner_name"
          value={form.owner_name}
          placeholder="Owner Name"
          onChange={handleChange}
          required
        />
        <label>Product Image</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

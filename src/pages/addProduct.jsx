import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    unit: "",
    price_BCN: "",
    register: "",
    expiry: "",
    description: "",
    owner_name: "",
    owner_id: "",
    product_quantity: "",
  });

  const [images, setImages] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/owner/all")
      .then((res) => {
        if (res.data.success) setOwners(res.data.owners);
      })
      .catch((err) => console.error("Error fetching owners:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs((prev) => [...prev, ...newPreviews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 5 || wordCount > 200) {
      alert("Description must be between 5 and 200 words.");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    images.forEach((img) => formData.append("image", img));

    try {
      const res = await axios.post("http://localhost:5000/api/products/create", formData);
      alert("Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error while adding product.");
    }
  };

  return (
    <div className="container mt-4">
<div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📦 Inventory System</h2>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => navigate("/")}>🏠 Home</button>
          {/* <button className="btn btn-success" onClick={() => navigate("/add-product")}>➕ Add Product</button> */}
          <button className="btn btn-warning" onClick={() => navigate("/ownerList")}>🧑‍💼 Owners</button>
        </div>
      </div>


      <h4>Add Product</h4>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Name</label>
            <input type="text" name="name" className="form-control" required onChange={handleChange} />
          </div>

          {/* Price */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Price</label>
            <input type="number" name="price" className="form-control" required onChange={handleChange} />
          </div>
                    <div className="col-md-6">
            <label className="form-label fw-semibold">Total Number of Items</label>
            <input type="number" name="product_quantity" className="form-control" required onChange={handleChange} />
          </div>


          {/* Quantity */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Measurment</label>
            <input type="number" name="quantity" className="form-control" required onChange={handleChange} />
          </div>

          {/* Unit */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Unit</label>
            <select name="unit" className="form-select" required value={form.unit} onChange={handleChange}>
              <option value="">Select Unit</option>
              <option value="kg">kg</option>
              <option value="liter">Liter</option>
              <option value="piece">Gram</option>
              <option value="packet">Packet</option>
              <option value="box">ml</option>
            </select>
          </div>

          {/* Price BCN */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Price (BCN)</label>
            <input type="number" name="price_BCN" className="form-control" onChange={handleChange} required />
          </div>

          {/* Register Date */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Register Date</label>
            <input type="date" name="register" className="form-control" onChange={handleChange} required />
          </div>

          {/* Expiry Date */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Expiry Date</label>
            <input type="date" name="expiry" className="form-control" onChange={handleChange} required />
          </div>

          {/* Select Owner */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Select Owner</label>
            <select
              name="owner_id"
              className="form-select"
              value={form.owner_id}
              onChange={(e) => {
                const selectedOwner = owners.find((o) => o._id === e.target.value);
                setForm({
                  ...form,
                  owner_id: selectedOwner._id,
                  owner_name: selectedOwner.owner_name,
                });
              }}
              required
            >
              <option value="">Select an owner</option>
              {owners.map((owner) => (
                <option key={owner._id} value={owner._id}>
                  {owner.owner_name} ({owner.company_name})
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              placeholder="At least 5 words"
              onChange={handleChange}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="col-md-12">
            <label className="form-label fw-semibold">Upload Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* 👇 Image Previews (Moved Below Upload) */}
{/* 👇 Image Thumbnails Only (No Big Preview) */}
{/* 👇 Image Thumbnails with Remove (×) Button */} 
{previewURLs.length > 0 && (
  <div
    className="d-flex overflow-auto gap-2 my-4 px-2"
    style={{ maxWidth: "100%", scrollbarWidth: "thin" }}
  >
    {previewURLs.map((url, i) => (
      <div
        key={i}
        style={{ position: "relative", display: "inline-block" }}
      >
        <img
          src={url}
          alt={`preview-${i}`}
          style={{
            height: "70px",
            width: "100px",
            objectFit: "cover",
            border: "2px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="button"
          onClick={() => {
            const updatedPreviews = previewURLs.filter((_, index) => index !== i);
            const updatedImages = images.filter((_, index) => index !== i);
            setPreviewURLs(updatedPreviews);
            setImages(updatedImages);
            if (selectedImageIndex >= updatedPreviews.length) {
              setSelectedImageIndex(0);
            }
          }}
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            cursor: "pointer",
            fontSize: "12px",
            lineHeight: "20px",
            padding: 0,
          }}
        >
          ×
        </button>
      </div>
    ))}
  </div>
)}

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

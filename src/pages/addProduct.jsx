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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://bcn-inventory-backend.onrender.com/api/owner/all")
      .then((res) => {
        if (res.data.success) setOwners(res.data.owners);
      })
      .catch((err) => {
        console.error("Error fetching owners:", err);
        setError("Failed to load owners. Please refresh the page.");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError("Please select only image files (JPEG, PNG, GIF, WebP)");
      return;
    }
    
    // Validate file size (max 5MB per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      setError("Image files must be smaller than 5MB each");
      return;
    }
    
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs((prev) => [...prev, ...newPreviews]);
    setError(""); // Clear error on successful image selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 5 || wordCount > 200) {
      setError("Description must be between 5 and 200 words.");
      setLoading(false);
      return;
    }

    if (images.length === 0) {
      setError("Please select at least one image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    images.forEach((img) => formData.append("image", img));

    try {
      const res = await axios.post("https://bcn-inventory-backend.onrender.com/api/products/create", formData);
      if (res.data.success) {
        alert("Product added successfully!");
        navigate("/inventory");
      } else {
        setError(res.data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error while adding product. Please try again.");
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
                  ➕ Add New Product
                </h1>
                <p className="text-white-50 fs-6 fs-md-5">
                  Add a new product to your inventory
                </p>
              </div>
              <div className="btn-group-vertical btn-group-sm d-md-none w-100 mb-3">
                <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/ownerList")}>
                  🧑‍💼 Owners
                </button>
              </div>
              <div className="btn-group d-none d-md-flex">
                <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/ownerList")}>
                  🧑‍💼 Owners
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="card-header bg-white border-0 py-3 py-md-4" style={{ borderRadius: '20px 20px 0 0' }}>
                <div className="d-flex align-items-center">
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                    <span style={{ fontSize: '1.2rem', color: 'white' }}>📦</span>
                  </div>
                  <div>
                    <h3 className="mb-1 fw-bold text-dark fs-4 fs-md-3">Product Information</h3>
                    <p className="text-muted mb-0 small">Fill in the details below to add a new product</p>
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

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {/* Basic Information */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h5 className="fw-bold text-primary mb-3">📝 Basic Information</h5>
                    </div>
                    
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Product Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        className="form-control border-0" 
                        style={{ backgroundColor: '#f8f9fa' }}
                        required 
                        onChange={handleChange} 
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Price (₹) *</label>
                      <input 
                        type="number" 
                        name="price" 
                        className="form-control border-0" 
                        style={{ backgroundColor: '#f8f9fa' }}
                        min="0" 
                        step="0.01" 
                        required 
                        onChange={handleChange} 
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Total Items *</label>
                      <input 
                        type="number" 
                        name="product_quantity" 
                        className="form-control border-0" 
                        style={{ backgroundColor: '#f8f9fa' }}
                        min="1" 
                        required 
                        onChange={handleChange} 
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Measurement (Optional)</label>
                      <input 
                        type="number" 
                        name="quantity" 
                        className="form-control border-0" 
                        style={{ backgroundColor: '#f8f9fa' }}
                        min="0" 
                        step="0.01" 
                        onChange={handleChange} 
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Unit (Optional)</label>
                      <select 
                        name="unit" 
                        className="form-select border-0" 
                        style={{ backgroundColor: '#f8f9fa' }}
                        value={form.unit} 
                        onChange={handleChange}
                      >
                        <option value="">Select Unit</option>
                        <option value="kg">kg</option>
                        <option value="liter">Liter</option>
                        <option value="gram">Gram</option>
                        <option value="packet">Packet</option>
                        <option value="ml">ml</option>
                        <option value="piece">Piece</option>
                        <option value="box">Box</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Price BCN (₹) (Optional)</label>
                      <input 
                        type="number" 
                        name="price_BCN" 
                        className="form-control border-0" 
                        style={{ backgroundColor: '#f8f9fa' }}
                        min="0" 
                        step="0.01" 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  {/* Dates and Owner */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h5 className="fw-bold text-primary mb-3">📅 Dates & Owner</h5>
                    </div>
                    
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Register Date *</label>
                      <input 
                        type="date" 
                        name="register" 
                        className="form-control border-0" 
                        style={{ backgroundColor: '#f8f9fa' }}
                        onChange={handleChange} 
                        required 
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label fw-semibold">Expiry Date (Optional)</label>
                      <input 
                        type="date" 
                        name="expiry" 
                        className="form-control border-0" 
                        style={{ backgroundColor: '#f8f9fa' }}
                        onChange={handleChange} 
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label fw-semibold">Select Owner *</label>
                      <select
                        name="owner_id"
                        className="form-select border-0"
                        style={{ backgroundColor: '#f8f9fa' }}
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
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h5 className="fw-bold text-primary mb-3">📝 Description</h5>
                    <label className="form-label fw-semibold">Product Description *</label>
                    <textarea
                      name="description"
                      className="form-control border-0"
                      style={{ backgroundColor: '#f8f9fa' }}
                      rows="4"
                      placeholder="Describe your product (5-200 words)"
                      onChange={handleChange}
                      required
                    />
                    <small className="text-muted">Description must be between 5 and 200 words.</small>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-4">
                    <h5 className="fw-bold text-primary mb-3">🖼️ Product Images</h5>
                    <label className="form-label fw-semibold">Upload Images *</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control border-0"
                      style={{ backgroundColor: '#f8f9fa' }}
                      accept="image/*"
                      onChange={handleImageChange}
                      multiple
                    />
                    <small className="text-muted">
                      Select up to 5 images. Max size: 5MB each. Supported formats: JPEG, PNG, GIF, WebP
                    </small>
                  </div>

                  {/* Image Previews */}
                  {previewURLs.length > 0 && (
                    <div className="mb-4">
                      <h6 className="fw-semibold mb-3">📸 Image Previews</h6>
                      <div className="d-flex flex-wrap gap-2 gap-md-3">
                        {previewURLs.map((url, i) => (
                          <div key={i} style={{ position: "relative" }}>
                            <img
                              src={url}
                              alt={`preview-${i}`}
                              style={{
                                height: "80px",
                                width: "80px",
                                objectFit: "cover",
                                border: "3px solid #e9ecef",
                                borderRadius: "12px",
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
                                background: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "24px",
                                height: "24px",
                                cursor: "pointer",
                                fontSize: "14px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="d-flex flex-column flex-md-row gap-3 justify-content-end">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary px-4 py-2 order-2 order-md-1"
                      onClick={() => navigate("/inventory")}
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
                          Adding Product...
                        </>
                      ) : (
                        '✅ Add Product'
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

export default AddProduct;

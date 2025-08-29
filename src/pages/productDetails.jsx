import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://bcn-inventory-backend.onrender.com/api/products/details/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-center text-white">
          <div className="spinner-border mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading Product Details...</h4>
          <p className="text-white-50">Please wait while we fetch the product information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-center">
          <div className="card border-0 shadow-lg" style={{ borderRadius: '20px', maxWidth: '500px' }}>
            <div className="card-body p-5">
              <div className="mb-4">
                <span style={{ fontSize: '4rem' }}>⚠️</span>
              </div>
              <h4 className="text-danger mb-3">Error Loading Product</h4>
              <p className="text-muted mb-4">{error}</p>
              <button className="btn btn-primary" onClick={() => navigate("/inventory")}>
                Back to Inventory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-center">
          <div className="card border-0 shadow-lg" style={{ borderRadius: '20px', maxWidth: '500px' }}>
            <div className="card-body p-5">
              <div className="mb-4">
                <span style={{ fontSize: '4rem' }}>📭</span>
              </div>
              <h4 className="text-warning mb-3">Product Not Found</h4>
              <p className="text-muted mb-4">The product you're looking for doesn't exist.</p>
              <button className="btn btn-primary" onClick={() => navigate("/inventory")}>
                Back to Inventory
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images = Array.isArray(product.image) ? product.image : [product.image];
  
  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    
    // If it's already a full URL (Cloudinary or other), use it directly
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a local filename, construct the full URL
    return `https://bcn-inventory-backend.onrender.com/upload/${imagePath}`;
  };
  
  const currentImage = getImageUrl(images[currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
                  📦 Product Details
                </h1>
                <p className="text-white-50 fs-6 fs-md-5">
                  Complete information about {product.name}
                </p>
              </div>
              <div className="btn-group-vertical btn-group-sm d-md-none w-100 mb-3">
                <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/add-product")}>
                  ➕ Add Product
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/updateProduct/" + id)}>
                  ✏️ Edit Product
                </button>
              </div>
              <div className="btn-group d-none d-md-flex">
                <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/add-product")}>
                  ➕ Add Product
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/updateProduct/" + id)}>
                  ✏️ Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Card */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              
              {/* Image Carousel */}
              <div className="position-relative" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="p-3 p-md-4">
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                        style={{
                          zIndex: 1,
                          fontSize: "1.5rem",
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                        onClick={prevImage}
                      >
                        ‹
                      </button>
                      <button
                        className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                        style={{
                          zIndex: 1,
                          fontSize: "1.5rem",
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                        onClick={nextImage}
                      >
                        ›
                      </button>
                    </>
                  )}

                  {/* Main Image */}
                  <div className="text-center" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {currentImage ? (
                      <img
                        src={currentImage}
                        alt={`Product ${currentImageIndex + 1}`}
                        style={{
                          maxHeight: "250px",
                          maxWidth: "100%",
                          objectFit: "contain",
                          borderRadius: '15px',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                        }}
                        onError={(e) => {
                          console.error('Image failed to load:', currentImage);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : (
                      <div className="text-muted">
                        <span style={{ fontSize: '3rem' }}>📷</span>
                        <p className="mt-3">No image available</p>
                      </div>
                    )}
                    <div className="text-muted" style={{ display: 'none' }}>
                      <span style={{ fontSize: '3rem' }}>❌</span>
                      <p className="mt-3">Image failed to load</p>
                    </div>
                  </div>

                  {/* Image Indicators */}
                  {images.length > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          style={{
                            height: "10px",
                            width: "10px",
                            margin: "0 4px",
                            backgroundColor: currentImageIndex === idx ? "#667eea" : "#dee2e6",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transition: "all 0.3s ease"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Information */}
              <div className="card-body p-3 p-md-5">
                {/* Product Title */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary mb-2 fs-3 fs-md-2">{product.name}</h2>
                  <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 gap-md-3">
                    <span className={`badge fs-6 px-3 py-2 ${
                      product.product_quantity < 10 ? 'bg-danger' : 
                      product.product_quantity < 50 ? 'bg-warning' : 'bg-success'
                    }`}>
                      Stock: {product.product_quantity} items
                    </span>
                    <span className="badge bg-info fs-6 px-3 py-2">
                      ID: {product._id.slice(-6)}
                    </span>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Product Details Grid */}
                <div className="row">
                  <div className="col-12 col-md-6">
                    <h5 className="fw-bold text-primary mb-3">💰 Pricing Information</h5>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center p-3" 
                           style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                        <span className="fw-semibold">Regular Price:</span>
                        <span className="fs-5 fw-bold text-success">₹{product.price}</span>
                      </div>
                    </div>
                    {product.price_BCN && (
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center p-3" 
                             style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                          <span className="fw-semibold">BCN Price:</span>
                          <span className="fs-5 fw-bold text-primary">₹{product.price_BCN}</span>
                        </div>
                      </div>
                    )}
                    {product.quantity && (
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center p-3" 
                             style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                          <span className="fw-semibold">Quantity:</span>
                          <span className="fs-5 fw-bold text-info">{product.quantity} {product.unit}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <h5 className="fw-bold text-primary mb-3">📅 Dates & Owner</h5>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center p-3" 
                           style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                        <span className="fw-semibold">Owner:</span>
                        <span className="fw-bold text-dark">{product.owner_name || product.owner_id?.company_name}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center p-3" 
                           style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                        <span className="fw-semibold">Register Date:</span>
                        <span className="fw-bold text-dark">
                          {product.register ? new Date(product.register).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                    {product.expiry && (
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center p-3" 
                             style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                          <span className="fw-semibold">Expiry Date:</span>
                          <span className="fw-bold text-dark">
                            {new Date(product.expiry).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4">
                  <h5 className="fw-bold text-primary mb-3">📝 Product Description</h5>
                  <div className="p-3 p-md-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                    <p className="mb-0 fs-6 fs-md-5 text-dark">{product.description}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center mt-4 mt-md-5">
                  <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 justify-content-center">
                    <button 
                      className="btn btn-primary px-3 px-md-4 py-2"
                      onClick={() => navigate("/inventory")}
                    >
                      ← Back to Inventory
                    </button>
                    <button 
                      className="btn btn-warning px-3 px-md-4 py-2"
                      onClick={() => navigate("/updateProduct/" + id)}
                    >
                      ✏️ Edit Product
                    </button>
                    <button 
                      className="btn btn-success px-3 px-md-4 py-2"
                      onClick={() => navigate("/add-product")}
                    >
                      ➕ Add Another Product
                    </button>
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

export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/details/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProduct(data.product);
        }
      })
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <div className="text-center py-5 text-white bg-dark">Loading product...</div>;
  }

  const images = Array.isArray(product.image) ? product.image : [product.image];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="py-5" style={{ background: "linear-gradient(to right, #e0f7fa, #e8f5e9)" }}>
      <div className="container">
<div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📦 Inventory Products</h2>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => navigate("/")}>🏠 Home</button>
          <button className="btn btn-success" onClick={() => navigate("/add-product")}>➕ Add Product</button>
          <button className="btn btn-warning" onClick={() => navigate("/productOwner")}>➕ Add Owner</button>
        </div>
      </div>

        <h2 className="text-center mb-5 text-primary display-5 fw-semibold">📦 Product Details</h2>

        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">

              {/* Image Carousel */}
              <div className="position-relative bg-white p-3 border-bottom text-center">

                {/* Left Arrow */}
                {images.length > 1 && (
                  <button
                    className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                    style={{
                      zIndex: 1,
                      fontSize: "4rem",
                    //  width: "50px",
                      //height: "50px",
                      //borderRadius: "50%",
                      //boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                      paddingBottom:"1px",
                    }}
                    onClick={prevImage}
                  >
                    ‹
                  </button>
                )}

                {/* Center Image */}
                <div
                  style={{
                    height: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={`http://localhost:5000/upload/${currentImage}`}
                    alt={`Product ${currentImageIndex + 1}`}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>

                {/* Right Arrow */}
                {images.length > 1 && (
                  <button
                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                    style={{
                      zIndex: 1,
                      fontSize: "4rem",
                     // width: "50px",
                     // height: "50px",
                     // borderRadius: "50%",
                     // boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      paddingBottom: "1px",
                      

                    }}
                    onClick={nextImage}
                  >
                    ›
                  </button>
                )}

                {/* Bullet Indicators */}
                <div className="d-flex justify-content-center mt-3">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      style={{
                        height: "12px",
                        width: "12px",
                        margin: "0 6px",
                        backgroundColor: currentImageIndex === idx ? "#007bff" : "#ccc",
                        borderRadius: "50%",
                        cursor: "pointer",
                        transition: "background-color 0.3s"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="card-body bg-light">
                <h3 className="card-title text-success fw-bold">{product.name}</h3>
                <hr />
                <p><strong>💰 Price:</strong> ₹{product.price}</p>
                <p><strong>📊 Price BCN:</strong> ₹{product.price_BCN}</p>
                <p><strong>📦 Quantity:</strong> {product.quantity} {product.unit}</p>
                <p><strong>📝 Description:</strong> {product.description}</p>
                <p><strong>🏢 Owner:</strong> {product.owner_name || product.owner_id?.company_name}</p>
                <p><strong>📅 Expiry:</strong> {product.expiry ? new Date(product.expiry).toLocaleDateString() : 'N/A'}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

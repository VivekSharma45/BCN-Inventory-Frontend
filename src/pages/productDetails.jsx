// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // this is owner_id
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/byowner/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch(err => console.error("Error fetching owner products:", err));
  }, [id]);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Products of this Owner</h2>
      {products.map(product => (
        <div key={product._id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Owner Name</strong> {product.owner_name}</p>
                <p><strong>Company Name</strong> {product.company_name}</p>


          {product.image && (
            <img
              src={`http://localhost:5000/upload/${product.image}`}
              alt={product.name}
              width="200"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;

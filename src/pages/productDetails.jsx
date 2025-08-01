import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Owner from "../../../server/models/owner";

const ProductDetails = () => {
  const { id } = useParams(); // owner_id
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
    <div className="container py-4">
      <h2 className="text-center mb-4 text-primary">📦 Products Details</h2>

      <div className="row">
        {products.length === 0 ? (
          <div className="col-12 text-center">
            <div className="alert alert-info">No products found for this owner.</div>
          </div>
        ) : (
          products.map(product => (
            <div key={product._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {product.image && (
                  <img
                    src={`http://localhost:5000/upload/${product.image}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-success">{product.name}</h5>
                  <p className="card-text"><strong>Price:</strong> ₹{product.price}</p>
                  <p className="card-text"><strong>Price BCN:</strong> ₹{product.price_BCN}</p>

                  <p className="card-text"><strong>Quantity:</strong> {product.quantity}</p>
                  <p className="card-text"><strong>Description:</strong> {product.description}</p>
                  <p className="card-text"><strong>Owner:</strong> {product.owner_name}</p>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = () => {
    axios.get('http://localhost:5000/api/owner/all')
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.owners)) {
          setOwners(res.data.owners);
        } else {
          console.error("Unexpected API response:", res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch owners:", err);
      });
  };

  const handleOwnerClick = (owner_id) => {
    if (owner_id) {
      navigate(`/owners/${owner_id}/products`);
    }
  };

  const handleDelete = async (owner_id) => {
    if (window.confirm("Are you sure you want to delete this owner?")) {
      try {
        const res = await axios.delete(`https://bcn-inventory-backend.vercel.app/api/owner/deleted/${owner_id}`);
        if (res.data.success) {
          alert("Owner deleted successfully");
          fetchOwners(); // Refresh the list
        } else {
          alert("Failed to delete owner");
        }
      } catch (err) {
        console.error("Error deleting owner:", err);
        alert("Error deleting owner");
      }
    }
  };

  return (
    <div className="container mt-4">
       <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📦 Inventory Products</h2>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => navigate("/")}>🏠 Home</button>
          <button className="btn btn-success" onClick={() => navigate("/add-product")}>➕ Add Product</button>
          <button className="btn btn-warning" onClick={() => navigate("/productOwner")}>➕ Add Owner</button>
        </div>
      </div>
      <h3 className="mb-3">Owner List</h3>
      {owners.length > 0 ? (
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Owner Name</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr key={owner._id}>
                <td>{index + 1}</td>
                <td
                  onClick={() => handleOwnerClick(owner._id)}
                  style={{ cursor: 'pointer' }}
                >
                  {owner.name || owner.owner_name || 'N/A'}
                </td>
                <td>{owner.company || owner.company_name || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(owner._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No owners found.</p>
      )}
    </div>
  );
};

export default OwnerList;

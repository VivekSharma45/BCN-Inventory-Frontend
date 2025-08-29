import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('https://bcn-inventory-backend.onrender.com/api/owner/all');
      if (res.data.success && Array.isArray(res.data.owners)) {
        setOwners(res.data.owners);
      } else {
        setError("Unexpected API response");
      }
    } catch (err) {
      console.error("Failed to fetch owners:", err);
      setError("Failed to load owners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOwnerClick = (owner_id) => {
    if (owner_id) {
      navigate(`/owners/${owner_id}/products`);
    }
  };

  const handleDelete = async (owner_id) => {
    if (window.confirm("Are you sure you want to delete this owner?")) {
      try {
        const res = await axios.delete(`https://bcn-inventory-backend.onrender.com/api/owner/deleted/${owner_id}`);
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

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-center text-white">
          <div className="spinner-border mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4>Loading Owners...</h4>
          <p className="text-white-50">Please wait while we fetch the owner information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container py-5">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="display-5 fw-bold text-white mb-2">
                  👥 Product Owners
                </h1>
                <p className="text-white-50 fs-5">
                  Manage your product owners and their information
                </p>
              </div>
              <div className="btn-group">
                <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                  🏠 Home
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/add-product")}>
                  ➕ Add Product
                </button>
                <button className="btn btn-outline-light" onClick={() => navigate("/productOwner")}>
                  ➕ Add Owner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center">
                <div className="mb-3">
                  <span style={{ fontSize: '2.5rem' }}>👥</span>
                </div>
                <h3 className="fw-bold text-primary">{owners.length}</h3>
                <p className="text-muted mb-0">Total Owners</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center">
                <div className="mb-3">
                  <span style={{ fontSize: '2.5rem' }}>🏢</span>
                </div>
                <h3 className="fw-bold text-success">{owners.length}</h3>
                <p className="text-muted mb-0">Companies</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
              <div className="card-body text-center">
                <div className="mb-3">
                  <span style={{ fontSize: '2.5rem' }}>📞</span>
                </div>
                <h3 className="fw-bold text-info">{owners.length}</h3>
                <p className="text-muted mb-0">Contacts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show border-0 mb-4" 
               style={{ borderRadius: '15px', backgroundColor: '#fee' }}>
            <div className="d-flex align-items-center">
              <span className="me-2">⚠️</span>
              {error}
            </div>
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {/* Owners Table */}
        <div className="card border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
          <div className="card-header bg-white border-0 py-4">
            <div className="d-flex align-items-center">
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px'
              }}>
                <span style={{ fontSize: '1.5rem', color: 'white' }}>👥</span>
              </div>
              <div>
                <h3 className="mb-1 fw-bold text-dark">Owner Information</h3>
                <p className="text-muted mb-0">View and manage product owners</p>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            {owners.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="border-0 px-4" style={{ width: '60px' }}>#</th>
                      <th className="border-0 px-4">Company & Owner</th>
                      <th className="border-0 px-4">Contact</th>
                      <th className="border-0 px-4">Register Date</th>
                      <th className="border-0 px-4" style={{ width: '120px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {owners.map((owner, index) => (
                      <tr key={owner._id} className="border-bottom">
                        <td className="px-4 fw-bold text-muted">{index + 1}</td>
                        <td className="px-4">
                          <div 
                            className="d-flex align-items-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleOwnerClick(owner._id)}
                          >
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
                              <span style={{ fontSize: '1.2rem', color: 'white' }}>🏢</span>
                            </div>
                            <div>
                              <h6 className="mb-1 fw-semibold text-dark">
                                {owner.company_name}
                              </h6>
                              <small className="text-muted">
                                Owner: {owner.owner_name}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td className="px-4">
                          <div>
                            <div className="fw-semibold text-dark">📞 {owner.phone}</div>
                            {owner.gst && (
                              <small className="text-muted">GST: {owner.gst}</small>
                            )}
                          </div>
                        </td>
                        <td className="px-4">
                          <span className="badge bg-light text-dark px-3 py-2">
                            {new Date(owner.register).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(owner._id)}
                            style={{ borderRadius: '8px' }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="text-muted">
                  <span style={{ fontSize: '4rem' }}>📭</span>
                  <h4 className="mt-3 mb-3">No Owners Found</h4>
                  <p className="mb-4">No product owners have been added yet.</p>
                  <button 
                    className="btn btn-primary px-4 py-2"
                    onClick={() => navigate("/productOwner")}
                  >
                    ➕ Add Your First Owner
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="text-center mt-4">
          <p className="text-white-50">
            Showing <strong>{owners.length}</strong> owner{owners.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerList;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-redirect to homepage on component mount
  useEffect(() => {
    // Automatically redirect to homepage after a short delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Automatically redirect to homepage (bypass authentication)
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px 0'
    }}>
      <div className="container">
        {/* Navigation */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="text-white fw-bold display-6">
            📦 BCN Inventory System
          </h1>
          <div className="btn-group">
            <button className="btn btn-outline-light" onClick={() => navigate("/")}>
              🏠 Home
            </button>
            <button className="btn btn-outline-light" onClick={() => navigate("/add-product")}>
              ➕ Add Product
            </button>
            <button className="btn btn-outline-light" onClick={() => navigate("/ownerList")}>
              🧑‍💼 Owners
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0" style={{
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)'
            }}>
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                    }}>
                      <span style={{ fontSize: '2rem', color: 'white' }}>🔐</span>
                    </div>
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {/* Auto-redirect Message */}
                <div className="alert alert-info border-0 mb-4" style={{
                  borderRadius: '12px',
                  backgroundColor: 'rgba(13, 202, 240, 0.1)'
                }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">ℹ️</span>
                    <div>
                      <strong>Authentication Disabled</strong>
                      <p className="mb-0 small">Redirecting to dashboard automatically...</p>
                    </div>
                  </div>
                </div>

                {/* Loading Spinner */}
                <div className="text-center mb-4">
                  <div className="spinner-border text-primary mb-3" style={{ width: '2rem', height: '2rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted mb-0">Redirecting to dashboard...</p>
                </div>

                {/* Disabled Form */}
                <form onSubmit={handleSubmit} className="opacity-50">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                        📧
                      </span>
                      <input
                        type="email"
                        name="email"
                        className="form-control border-0"
                        style={{ backgroundColor: '#f8f9fa' }}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Password</label>
                    <div className="input-group">
                      <span className="input-group-text border-0" style={{ backgroundColor: '#f8f9fa' }}>
                        🔒
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control border-0"
                        style={{ backgroundColor: '#f8f9fa' }}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    style={{
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                    disabled
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                    ) : (
                      '🔐 Sign In (Disabled)'
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="text-muted small mb-0">
                    Authentication is currently disabled. You will be automatically redirected to the dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="row justify-content-center mt-4">
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
              <div className="card-body p-3 p-md-4">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <span style={{ fontSize: '1.5rem' }}>💡</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">System Status</h6>
                    <p className="text-muted mb-0 small">
                      Login authentication has been disabled for easier access. You can directly access all features.
                    </p>
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

export default Login;

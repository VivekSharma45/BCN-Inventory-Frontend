import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaBox,
  FaExclamationTriangle,
  FaArrowAltCircleDown,
  FaArrowAltCircleUp
} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const [productCount, setProductCount] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [stockInCount, setStockInCount] = useState(0);
  const [stockOutCount, setStockOutCount] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get('https://bcn-inventory-backend.vercel.app/api/products');
        const allProducts = productsRes.data.products || [];
        setProductCount(allProducts.length);
        setLatestProducts(allProducts.slice(-5).reverse());

        const threshold = 10;
        const lowStockRes = await axios.get(`https://bcn-inventory-backend.vercel.app/api/stock/low?threshold=${threshold}`);
        setLowStockCount(lowStockRes.data.products.length);

        const stockInRes = await axios.get('https://bcn-inventory-backend.vercel.app/api/stock/all');
        const filteredStockIns = stockInRes.data.stockIns.filter(item => item.product_id);
        setStockInCount(filteredStockIns.length);

        const stockOutRes = await axios.get('https://bcn-inventory-backend.vercel.app/api/stock/allStockOut');
        const filteredStockOuts = stockOutRes.data.stockOuts.filter(item => item.product_id);
        setStockOutCount(filteredStockOuts.length);

        const ownerRes = await axios.get('https://bcn-inventory-backend.vercel.app/api/owner/all');
        if (ownerRes.data.success) {
          const sortedOwners = ownerRes.data.owners.sort((a, b) =>
            (a.owner_name || "").localeCompare(b.owner_name || "")
          );
          setOwners(sortedOwners);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (type) => {
    navigate(`/${type}`);
  };

  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleOwnerClick = (id) => {
    navigate(`/owners/${id}/products`);
  };

  return (
    <>
      <div className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Smart Inventory Management System</h1>
          <p className="lead">Efficiently track, manage and analyze your stock in one place</p>
        </div>
      </div>

      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 mb-4">
            <div className="list-group">
              {[
                { path: '/add-product', label: 'Add Product', color: 'success' },
                { path: '/productOwner', label: 'Add Owner', color: 'info' },
                { path: '/inventory', label: 'Inventory', color: 'primary' },
                { path: '/stockIn', label: 'Stock In', color: 'warning' },
                { path: '/stockOut', label: 'Stock Out', color: 'danger' },
                { path: '/lowStockItems', label: 'Low Stock Items', color: 'warning' },
                { path: '/stockInList', label: 'Stock In List', color: 'info' },
                { path: '/stockOutList', label: 'Stock Out List', color: 'outline-danger' },
                { path: '/ownerList', label: 'Owner List', color: 'dark' },
              ].map((btn, i) => (
                <Link key={i} to={btn.path} className={`btn btn-${btn.color} mb-2`}>
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-10">
            {/* Dashboard Cards */}
            <div className="row g-4 mb-4">
              {[
                { title: 'Total Products', count: productCount, icon: <FaBox size={40} />, bg: 'primary', path: 'inventory' },
                { title: 'Low Stock', count: lowStockCount, icon: <FaExclamationTriangle size={40} />, bg: 'warning text-dark', path: 'lowStockItems' },
                { title: 'Stock In', count: stockInCount, icon: <FaArrowAltCircleDown size={40} />, bg: 'success', path: 'stockInList' },
                { title: 'Stock Out', count: stockOutCount, icon: <FaArrowAltCircleUp size={40} />, bg: 'danger', path: 'stockOutList' },
              ].map((card, index) => (
                <div key={index} className="col-md-6 col-lg-6">
                  <div className={`card bg-${card.bg} text-white h-100 shadow`} style={{ cursor: 'pointer' }} onClick={() => handleCardClick(card.path)}>
                    <div className="card-body text-center">
                      {card.icon}
                      <h5 className="card-title mt-3">{card.title}</h5>
                      <h3>{card.count}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tables Row */}
            <div className="row">
              {/* Latest Products */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-primary text-white">
                    🆕 Latest Products
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Total Number of Items</th>
                          </tr>
                        </thead>
                        <tbody>
                          {latestProducts.length === 0 ? (
                            <tr>
                              <td colSpan="3" className="text-center">No products found</td>
                            </tr>
                          ) : (
                            latestProducts.map((product, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.product_quantity}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner List */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-success text-white">
                    👤 Owner List
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Owner Name</th>
                            <th>Company</th>
                          </tr>
                        </thead>
                        <tbody>
                          {owners.length === 0 ? (
                            <tr>
                              <td colSpan="2" className="text-center">No owners found</td>
                            </tr>
                          ) : (
                            owners.map((owner, index) => (
                              <tr key={owner._id}>
                                <td>
                                  <button className="btn btn-link text-decoration-none text-primary"
                                    onClick={() => handleOwnerClick(owner._id)}>
                                    {capitalizeWords(owner.owner_name || "Unnamed")}
                                  </button>
                                </td>
                                <td>{capitalizeWords(owner.company_name || "N/A")}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        &copy; {new Date().getFullYear()} Inventory System | Developed By Vivek Sharma ❤️
      </footer>
    </>
  );
};

export default Home;

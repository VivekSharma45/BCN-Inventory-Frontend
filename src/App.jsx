import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Inventory from './pages/inventory';
import AddProduct from './pages/addProduct';
import ProductOwner from './pages/productOwner';
import ProductDetails from './pages/productDetails';
import StockIn from './pages/stockIn';
import StockOut from './pages/stockOut';
import LowStockItems from './pages/lowStockItems';
import StockInList from './pages/stockInList';
import StockOutList from './pages/stockOutList';
import OwnerList from './pages/ownerList';
import OwnerProducts from './pages/ownerProductList';
import UpdateProduct from './pages/updateProduct';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to homepage */}
        <Route path="/" element={<Home />} />
        
        {/* Main application routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/ownerList" element={<OwnerList />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/productOwner" element={<ProductOwner />} />
        <Route path="/stockIn" element={<StockIn />} />
        <Route path="/stockOut" element={<StockOut />} />
        <Route path="/lowStockItems" element={<LowStockItems />} />
        <Route path="/stockInList" element={<StockInList />} />
        <Route path="/stockOutList" element={<StockOutList/>} />
        <Route path="/owners/:id/products" element={<OwnerProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />

        {/* Optional Routes */}
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        
        {/* Catch all route - redirect to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

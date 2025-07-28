// src/pages/Root.jsx
import { useAuth } from "../context/AuthContext";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Root = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'customer') {
        navigate('/employee/dashboard');
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
};

export default Root;

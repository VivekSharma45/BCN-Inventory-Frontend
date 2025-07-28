// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import "../pageStyle/register.css";

const Register = () => {
  const [form, setForm] = useState({
    company_name: "",
    owner_name: "",
    phone: "",
    owner_id: "",
    register: "",
    product: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/owners", form);
      alert("Owner registered successfully");
    } catch (err) {
      console.error("Error registering owner:", err);
    }
  };

  return (
    <div className="register-page">
      <h2>Register Owner</h2>
      <form onSubmit={handleSubmit}>
        <input name="company_name" placeholder="Company Name" onChange={handleChange} />
        <input name="owner_name" placeholder="Owner Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} />
        <input name="owner_id" placeholder="Owner ID" onChange={handleChange} />
        <input name="register" placeholder="Register Date" onChange={handleChange} />
        <input name="product" placeholder="Product Type" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

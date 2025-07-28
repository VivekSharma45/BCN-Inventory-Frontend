// src/components/ProductOwner.jsx
import React,{ useState ,useEffect} from "react";
import axios from "axios";
import '../pageStyle/addOwner.css';

const ProductOwner = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    owner_name: '',
    phone: '',
    product: '',
    owner_id: '',
    register: ''
  });

useEffect(() => {
  axios.get("http://localhost:5000/api/owner")  // ✅ CORRECTED
    .then((res) => {
      console.log("Owners fetched:", res.data.owners);
    })
    .catch((err) => console.error("Error fetching owners:", err));
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // You can POST this to backend here using axios
    try{
      await axios.post("http://localhost:5000/api/owner/create", formData,{
      });
      alert("Owner added successfully");
    }catch(err){
      console.error("Error adding Owner:",err);
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Product Owner Details</h2>

      <label>Company Name</label><br />
      <input
        type="text"
        name="company_name"
        value={formData.company_name}
        onChange={handleChange}
        required
      /><br /><br />

      <label>Owner Name</label><br />
      <input
        type="text"
        name="owner_name"
        value={formData.owner_name}
        onChange={handleChange}
        required
      /><br /><br />

      <label>Contact Number</label><br />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      /><br /><br />

      <label>Owner ID</label><br />
      <input
        type="text"
        name="owner_id"
        value={formData.owner_id}
        onChange={handleChange}
      /><br /><br />

      <label>Register Date</label><br />
      <input
        type="date"
        name="register"
        value={formData.register}
        onChange={handleChange}
        required
      /><br /><br />

      <label>Product</label><br />
      <input
        type="text"
        name="product"
        value={formData.product}
        onChange={handleChange}
        required
      /><br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductOwner;

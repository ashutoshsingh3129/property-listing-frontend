// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/admin.css'
import { axiosRequest } from '../service/axiosRequest';
const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  
  useEffect(() => {
    const fetchProperties = async () => {
      //const res = await axios.get('/api/admin/properties');
      const res= await axiosRequest("GET",'/api/properties')
      setProperties(res.data);
    };
    fetchProperties();
  }, []);

  const deleteProperty = async (id) => {
    await axios.delete(`/api/admin/properties/${id}`);
    setProperties(properties.filter((property) => property._id !== id));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {properties.map((property) => (
        <div key={property._id}>
          <h3>{property.name}</h3>
          <button onClick={() => deleteProperty(property._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

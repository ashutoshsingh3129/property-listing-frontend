import React, { useState } from 'react';
import axios from 'axios';
import { axiosRequest } from '../service/axiosRequest';

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    availability: true,
    amenities: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('location', formData.location);
    form.append('availability', formData.availability);
    form.append('amenities', formData.amenities);
    form.append('image', formData.image); // Append image file

    try {
      //const response = await axios.post('/api/properties', form, {
        
    //  });
     const headers={
        'Content-Type': 'multipart/form-data',
      }
      const res=await axiosRequest("POST","/api/properties",form,'',headers)
      alert('Property created successfully!');
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Failed to create property.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Property Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </div>
      <div>
        <label>Availability</label>
        <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} />
      </div>
      <div>
        <label>Amenities (comma separated)</label>
        <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} />
      </div>
      <div>
        <label>Image</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <button type="submit">Create Property</button>
    </form>
  );
};

export default CreateProperty;

import React, { useState, useEffect } from 'react';
import '../css/createEditProperty.css'

const CreateEditProperty = ({ property, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    availability: true, // Default to true for creation
    amenities: '',
    image: null,
  });

  useEffect(() => {
    if (property) {
      // Pre-fill form with property data if editing
      setFormData({
        name: property.name || '',
        price: property.price || '',
        location: property.location || '',
        availability: property.availability !== undefined ? property.availability : true,
        amenities: property.amenities ? property.amenities.join(', ') : '',
        image: property.image || null,
      });
    }
  }, [property]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure amenities are always sent as an array
    const updatedProperty = {
      ...formData,
      amenities: formData.amenities.split(',').map(a => a.trim()),
      availability: formData.availability,  // Explicitly sending the availability value
    };
    onSave(updatedProperty); // Pass updated property data to the save handler
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{property ? 'Edit Property' : 'Create Property'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          
          <div className="checkbox-wrapper">
          <label>Availability</label>

  <input
    type="checkbox"
    name="availability"
    checked={formData.availability}
    onChange={handleChange}
  />
</div>
          
          <label>Amenities (comma separated):</label>
          <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} />
          
          <label>Image:</label>
          <input type="file" onChange={handleFileChange} />
          
          <button type="submit">{property ? 'Update' : 'Create'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditProperty;

import React, { useEffect, useState } from 'react';
import { axiosRequest } from '../service/axiosRequest';
import '../css/admin.css';
import CreateEditProperty from './CreateEditProperty'; // Reusing for both create/edit modal
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false); // To toggle modal visibility
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({ name: '', price: '', location: '' });
  const navigate = useNavigate();
  const availableLocations = ['Gurgoan', 'Delhi', 'Mumbai']; // Replace with dynamic locations if needed
  const priceRanges = ['0-500000', '500000-1000000', '10000+'];
  // Fetch properties on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      const res = await axiosRequest("GET", '/api/properties');
      setProperties(res.data);
    };
    fetchProperties();
  }, []);

  const openEditModal = (property) => {
    setSelectedProperty(property); // Set the selected property to edit
    setShowModal(true); // Open the modal
  };

  const openCreateModal = () => {
    setSelectedProperty(null); // Reset selectedProperty to null for creating a new property
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setSelectedProperty(null); // Reset the selected property
  };

  const viewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  // Handle save after creating or editing a property
  const handleSave = async (updatedProperty) => {
    const formData = new FormData();
    
    // Append data to FormData
    formData.append('name', updatedProperty.name);
    formData.append('price', updatedProperty.price);
    formData.append('location', updatedProperty.location);
    formData.append('amenities', updatedProperty.amenities);
    formData.append('availability', updatedProperty.availability);

    // Append image if it exists
    if (updatedProperty.image) {
      formData.append('image', updatedProperty.image);
    }

    if (selectedProperty) {
      // Edit mode
      formData.append('_id', selectedProperty._id); // Include ID in the FormData
      await axiosRequest('PUT', `/api/properties/${selectedProperty._id}`, formData);
      setProperties(properties.map((property) =>
        property._id === selectedProperty._id ? { ...property, ...updatedProperty } : property
      ));
    } else {
      // Create mode
      const res = await axiosRequest('POST', '/api/properties', formData);
      setProperties([...properties, res.data]);
    
    }
    closeModal(); // Close modal after saving
  };

  const deleteProperty = async (id) => {
    await axiosRequest("DELETE", `/api/admin/properties/${id}`);
    setProperties(properties.filter((property) => property._id !== id));
  };
  useEffect(() => {
    const fetchProperties = async () => {
      const res = await axiosRequest("GET", "/api/properties", '', filters);
      setProperties(res.data);
    };
    fetchProperties();
  }, [filters]);

  const handleSearch = ({ searchQuery, locationFilter, priceFilter }) => {
    setFilters({
      name: searchQuery || '',
      price: priceFilter || '',
      location: locationFilter || ''
    });
  };
  return (
    <div>
      <Navbar 
        onSearch={handleSearch} 
        locations={availableLocations} 
        priceRanges={priceRanges}  
      />
      <h1>Admin Dashboard</h1>
      <button onClick={openCreateModal} className="create-button w-56 mr-24">Create New Property</button>
      <div className="property-grid">
        {properties.map((property) => (
          <div key={property?._id} className="property-card">
            <img src={`${process.env.REACT_APP_API_BASE_URL}/${property?.image}`} alt={property?.name} className="property-image" />
            <h3>{property?.name}</h3>
            <p>Price: ₹{property?.price}</p>
            <p>Location: {property?.location}</p>
            <button onClick={() => viewProperty(property?._id)}>view Details</button>
            <button onClick={() => openEditModal(property)}>Edit</button>
            <button onClick={() => deleteProperty(property?._id)}>Delete</button>
          </div>
        ))}
      </div>
      {showModal && (
        <CreateEditProperty
          property={selectedProperty} // Pass selected property for editing
          onClose={closeModal} // Close modal callback
          onSave={handleSave} // Save callback
        />
      )}
    </div>
  );
};

export default AdminDashboard;

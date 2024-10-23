import React, { useState, useEffect } from 'react';
import '../css/propertyListing.css'; // Optional, you might remove this if using only Tailwind
import { axiosRequest } from '../service/axiosRequest';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const PropertyListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ name: '', price: '', location: '' });
  const navigate = useNavigate();
  const availableLocations = ['Gurgoan', 'Delhi', 'Mumbai']; // Replace with dynamic locations if needed
  const priceRanges = ['0-500000', '500000-1000000', '10000+'];

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await axiosRequest("GET", "/api/properties", '', filters);
      setProperties(res.data);
    };
    fetchProperties();
  }, [filters]);

  const handlePropertyDetail = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleSearch = ({ searchQuery, locationFilter, priceFilter }) => {
    setFilters({
      name: searchQuery || '',
      price: priceFilter || '',
      location: locationFilter || ''
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar 
        onSearch={handleSearch} 
        locations={availableLocations} 
        priceRanges={priceRanges}  
      />
      <div className="property-grid">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  className="w-full h-48 object-cover"
                  src={process.env.REACT_APP_API_BASE_URL + '/' + property.image}
                  alt={property.name}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-green-500 font-bold">₹ {property.price.toLocaleString()}</p>
                  <p className={`mt-2 text-sm ${property.availability ? 'text-green-600' : 'text-red-600'}`}>
                    {property.availability ? 'Available' : 'Not Available'}
                  </p>
                  <button 
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => handlePropertyDetail(property._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No properties available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyListingPage;

// PropertyListingPage.js
import React, { useState, useEffect } from 'react';
import '../css/propertyListing.css'
import { axiosRequest } from '../service/axiosRequest';
import { useNavigate } from 'react-router-dom';
const PropertyListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ location: '', availability: '', price: '' });
  const navigate=useNavigate()
  useEffect(() => {
    const fetchProperties = async () => {
      //const res = await axios.get('/api/properties', { params: filters });
      const res=await axiosRequest("GET","/api/properties",'',filters)
      setProperties(res.data);
    };
    fetchProperties();
  }, [filters]);
  const hadlePropertyDetail = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  return (
    <div className="property-listing-container">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div className="property-card" key={property._id}>
            <img
              className="property-image"
              src={process.env.REACT_APP_API_BASE_URL+'/'+property.image}
              alt={property.name}
            />
            {console.log("image",process.env.REACT_APP_API_BASE_URL+'/'+property.image)}
            <div className="property-details">
              <h3 className="property-name">{property.name}</h3>
              <p className="property-location">{property.location}</p>
              <p className="property-price">₹ {property.price.toLocaleString()}</p>
              <p className="property-availability">
                {property.availability ? 'Available' : 'Not Available'}
              </p>
              <button className="property-book-btn" onClick={() => hadlePropertyDetail(property._id)}
          style={{ cursor: 'pointer' }}>View Details</button>
            </div>
          </div>
        ))
      ) : (
        <p>No properties available at the moment.</p>
      )}
    </div>
  )

  
};

export default PropertyListingPage;

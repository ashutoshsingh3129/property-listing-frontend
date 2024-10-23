import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosRequest } from '../service/axiosRequest'; // Assuming you have this Axios instance setup
import * as PANOLENS from 'panolens'; // Panolens.js library
import '../css/propertyDetails.css';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loadingPano, setLoadingPano] = useState(true); // Loading state for 360° view
  const [panoError, setPanoError] = useState(false); // Error state for 360° view
  const panoContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await axiosRequest('GET', `/api/properties/${id}`);
      setProperty(res.data);
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (property && property.image) {
      const imageUrl = `${process.env.REACT_APP_API_BASE_URL}/${property.image}`;

      // Preload image
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        console.log('Panoramic image successfully preloaded.');

        if (panoContainerRef.current) {
          const panorama = new PANOLENS.ImagePanorama(imageUrl);

          const viewer = new PANOLENS.Viewer({
            container: panoContainerRef.current,
            autoRotate: true,
            autoRotateSpeed: 0.5,
          });

          viewer.add(panorama);

          panorama.addEventListener('load', () => {
            console.log('Panoramic image successfully loaded in Panolens.');
            setLoadingPano(false);
            setPanoError(false);
          });

          panorama.addEventListener('error', (event) => {
            console.error('Error loading panoramic image in Panolens:', event);
            setLoadingPano(false);
            setPanoError(true);
          });
        }
      };

      image.onerror = () => {
        console.error('Error preloading panoramic image.');
        setLoadingPano(false);
        setPanoError(true);
      };
    }
  }, [property]);

  const handleBook = async (propertyId, amount,name) => {
    try {
      const bookingDate = new Date(); // You can change this based on when the user is booking
      const response = await axiosRequest('POST', '/api/bookings', {
        propertyId,
        date: bookingDate, // Assuming booking for the current date
      });

      // Handle successful booking
    //  alert('Booking successful! Redirecting to payment...');
      navigate('/payment', { state: { propertyId, amount ,propertyName:name} }); // Navigate to payment page with propertyId and amount
    } catch (error) {
      console.error('Error booking property:', error);
      alert('Failed to book the property. Please try again.');
    }
  };

  return (
    <div>
      {property ? (
        <>
          <h1>{property.name}</h1>

          {/* Panoramic Viewer */}
          {property.image ? (
            <div style={{ marginBottom: '20px' }}>

              {loadingPano && <p>Loading 360° view...</p>}
              {panoError && <p>Error loading panoramic view.</p>}

              <div
                ref={panoContainerRef}
                style={{
                  width: '100%',
                  height: '500px',
                  display: loadingPano || panoError ? 'none' : 'block', // Only display viewer after loading
                  border: '1px solid black',
                }}
              />
            </div>
          ) : (
            <p>No 360° view available for this property.</p>
          )}

          {/* Property Details */}
          <div style={{ zIndex: 1, position: 'relative' }}>
            <p>Price: ₹{property.price}</p>
            <p>Location: {property.location}</p>
            <p>Amenities: {property.amenities.join(', ')}</p>

            <button
              onClick={() => handleBook(property._id, property.price,property.name)}
              style={{ cursor: 'pointer', zIndex: 1 }}
            >
              Book Now
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PropertyDetailsPage;

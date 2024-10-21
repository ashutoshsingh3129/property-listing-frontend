import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosRequest } from '../service/axiosRequest';
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

        // Initialize Panolens only if the container is available
        if (panoContainerRef.current) {
          const panorama = new PANOLENS.ImagePanorama(imageUrl);

          const viewer = new PANOLENS.Viewer({
            container: panoContainerRef.current,
            autoRotate: true,
            autoRotateSpeed: 0.5,
          });

          viewer.add(panorama);

          // Use addEventListener for load and error events
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

          // Optional: Check if the panorama is loaded correctly
          console.log('Panorama is now set up and should be visible.');
        } else {
          console.warn('Pano container is not available when initializing Panolens.');
        }
      };

      image.onerror = () => {
        console.error('Error preloading panoramic image.');
        setLoadingPano(false);
        setPanoError(true);
      };
    }
  }, [property]);

  const handleBook = (propertyId, amount) => {
    navigate('/payment', { state: { propertyId, amount } });
  };

  return (
    <div>
      {property ? (
        <>
          <h1>{property.name}</h1>

          {/* Panoramic Viewer */}
          {property.image ? (
            <div style={{ marginBottom: '20px' }}>
              <h3>360° View</h3>

              {/* Show loading spinner or error message */}
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
            <p>Price: {property.price}</p>
            <p>Location: {property.location}</p>
            <p>Amenities: {property.amenities.join(', ')}</p>

            <button
              onClick={() => handleBook(property._id, property.price)}
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

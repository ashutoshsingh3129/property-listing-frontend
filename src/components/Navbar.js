import React, { useState, useEffect, useContext } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ onSearch, locations, priceRanges }) => {
  const {  logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const navigate = useNavigate();
  let user=JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    onSearch({ searchQuery, locationFilter, priceFilter });
  }, [searchQuery, locationFilter, priceFilter]); // Runs when any of these values change

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          
        </div>

        <div className="flex items-center space-x-4">
          {/* Location Filter Dropdown */}
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)} // Only update the state here
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>

          {/* Price Filter Dropdown */}
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)} // Only update the state here
          >
            <option value="">All Prices</option>
            {priceRanges.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
            className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="navbar-right">
            {user ? (
              <>
                <span className="navbar-user">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="login-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

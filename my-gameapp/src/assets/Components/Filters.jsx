import React, { useState } from 'react';

const Filters = ({ categories, onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent component
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilter(value); // Pass the selected category to the parent component
  };

  return (
    <div className="filters-container d-flex justify-content-between align-items-center mb-4">
      {/* Search Bar */}
      <input
        type="text"
        className="form-control me-3"
        placeholder="Search games..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ maxWidth: '300px' }}
      />

      {/* Category Filter */}
      <select
        className="form-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{ maxWidth: '200px' }}
      >
        <option value="">All Categories</option>
        {/* Ensure categories is an array before trying to map */}
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))
        ) : (
          <option disabled>No categories available</option>
        )}
      </select>
    </div>
  );
};

export default Filters;

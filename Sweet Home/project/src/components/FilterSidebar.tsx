import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, X } from 'lucide-react';
import { FilterOptions } from '../types';
import { locations, propertyTypes } from '../data/properties';

interface FilterSidebarProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  isMobileFilterOpen: boolean;
  closeMobileFilter: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onApplyFilters,
  onResetFilters,
  isMobileFilterOpen,
  closeMobileFilter
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    location: true,
    rooms: true,
    features: true,
    availability: true,
    propertyType: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      location: e.target.value
    }));
  };

  const handleBedroomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      bedrooms: value
    }));
  };

  const handleBathroomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      bathrooms: value
    }));
  };

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    setFilters(prev => ({
      ...prev,
      propertyType: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    setFilters(prev => ({
      ...prev,
      availableBy: value
    }));
  };

  const sidebarClasses = `bg-white shadow-lg rounded-lg p-5 ${
    isMobileFilterOpen 
      ? 'fixed inset-0 z-50 overflow-y-auto'
      : 'hidden md:block sticky top-24'
  }`;

  return (
    <div className={sidebarClasses}>
      {isMobileFilterOpen && (
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button 
            onClick={closeMobileFilter}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-6">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2"
          onClick={() => toggleSection('price')}
        >
          <span>Price Range</span>
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.price && (
          <div className="mt-2 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Min: ${filters.priceRange[0]}</span>
              <span className="text-sm text-gray-500">Max: ${filters.priceRange[1]}</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(parseInt(e.target.value), filters.priceRange[1])}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(
                    Math.max(0, parseInt(e.target.value) || 0), 
                    filters.priceRange[1]
                  )}
                  className="pl-7 w-20 py-1 border rounded text-sm"
                />
              </div>
              <span className="text-gray-500">-</span>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(
                    filters.priceRange[0], 
                    Math.max(filters.priceRange[0], parseInt(e.target.value) || 0)
                  )}
                  className="pl-7 w-20 py-1 border rounded text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="mb-6">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2"
          onClick={() => toggleSection('location')}
        >
          <span>Location</span>
          {expandedSections.location ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.location && (
          <div className="mt-2">
            <select
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Rooms */}
      <div className="mb-6">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2"
          onClick={() => toggleSection('rooms')}
        >
          <span>Rooms</span>
          {expandedSections.rooms ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.rooms && (
          <div className="mt-2 space-y-3">
            <div>
              <label className="block text-sm mb-1">Bedrooms</label>
              <select
                value={filters.bedrooms === null ? "" : filters.bedrooms}
                onChange={handleBedroomsChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="0">Studio</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Bathrooms</label>
              <select
                value={filters.bathrooms === null ? "" : filters.bathrooms}
                onChange={handleBathroomsChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any</option>
                <option value="1">1 Bathroom</option>
                <option value="2">2 Bathrooms</option>
                <option value="3">3+ Bathrooms</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2"
          onClick={() => toggleSection('propertyType')}
        >
          <span>Property Type</span>
          {expandedSections.propertyType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.propertyType && (
          <div className="mt-2">
            <select
              value={filters.propertyType === null ? "" : filters.propertyType}
              onChange={handlePropertyTypeChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mb-6">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2"
          onClick={() => toggleSection('features')}
        >
          <span>Features</span>
          {expandedSections.features ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.features && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="petFriendly"
                name="petFriendly"
                checked={filters.petFriendly === true}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="petFriendly" className="ml-2 text-sm text-gray-700">
                Pet Friendly
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                checked={filters.furnished === true}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="furnished" className="ml-2 text-sm text-gray-700">
                Furnished
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="mb-6">
        <button 
          className="w-full flex justify-between items-center font-semibold mb-2"
          onClick={() => toggleSection('availability')}
        >
          <span>Availability</span>
          {expandedSections.availability ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {expandedSections.availability && (
          <div className="mt-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={16} className="text-gray-500" />
              </div>
              <input
                type="date"
                value={filters.availableBy || ''}
                onChange={handleAvailabilityChange}
                className="w-full pl-10 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Available by..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={onApplyFilters}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={onResetFilters}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
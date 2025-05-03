import React, { useState, useEffect } from 'react';
import PropertyList from '../components/PropertyList';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { FilterOptions, Property } from '../types';
import { properties } from '../data/properties';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 3000],
    location: '',
    bedrooms: null,
    bathrooms: null,
    availableBy: null,
    petFriendly: null,
    furnished: null,
    propertyType: null
  });

  useEffect(() => {
    setTimeout(() => {
      applyFilters();
      setLoading(false);
    }, 800);
  }, []);

  const applyFilters = () => {
    setLoading(true);
    
    setTimeout(() => {
      let results = [...properties];
      
      if (filters.location) {
        results = results.filter(property => 
          property.location === filters.location
        );
      }
      
      results = results.filter(property => 
        property.price >= filters.priceRange[0] && 
        property.price <= filters.priceRange[1]
      );
      
      if (filters.bedrooms !== null) {
        results = results.filter(property => 
          property.bedrooms === filters.bedrooms
        );
      }
      
      if (filters.bathrooms !== null) {
        results = results.filter(property => 
          property.bathrooms === filters.bathrooms
        );
      }
      
      if (filters.availableBy) {
        const availableByDate = new Date(filters.availableBy);
        results = results.filter(property => 
          new Date(property.available) <= availableByDate
        );
      }
      
      if (filters.petFriendly !== null) {
        results = results.filter(property => 
          property.petFriendly === filters.petFriendly
        );
      }
      
      if (filters.furnished !== null) {
        results = results.filter(property => 
          property.furnished === filters.furnished
        );
      }
      
      if (filters.propertyType !== null) {
        results = results.filter(property => 
          property.type === filters.propertyType
        );
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(property => 
          property.title.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.amenities.some(amenity => 
            amenity.toLowerCase().includes(query)
          )
        );
      }
      
      setFilteredProperties(results);
      setCurrentPage(1);
      setLoading(false);
      setIsMobileFilterOpen(false);
    }, 500);
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 3000],
      location: '',
      bedrooms: null,
      bathrooms: null,
      availableBy: null,
      petFriendly: null,
      furnished: null,
      propertyType: null
    });
    
    setTimeout(() => {
      applyFilters();
    }, 0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters();
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section with Background */}
      <div 
        className="relative h-[500px] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/40"
        style={{ 
          backgroundImage: `url('https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Find Your Perfect Student Home
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
          >
            Discover comfortable and affordable housing options near your university
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-3xl"
          >
            <SearchBar onSearch={handleSearch} toggleMobileFilter={toggleMobileFilter} />
          </motion.div>
        </div>
      </div>

      <main className="container mx-auto px-4 -mt-24 pb-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={applyFilters}
              onResetFilters={resetFilters}
              isMobileFilterOpen={isMobileFilterOpen}
              closeMobileFilter={() => setIsMobileFilterOpen(false)}
            />
            
            <div className="md:hidden mb-4">
              <button
                onClick={toggleMobileFilter}
                className="w-full flex items-center justify-center gap-2 glass-effect p-3 rounded-lg shadow-sm"
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          {/* Property listings */}
          <div className="md:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground">
                {loading ? (
                  "Finding properties..."
                ) : (
                  `${filteredProperties.length} properties found`
                )}
              </p>
            </div>
            
            <PropertyList properties={currentProperties} loading={loading} />
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
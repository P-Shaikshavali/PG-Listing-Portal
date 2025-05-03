import React from 'react';
import { useAuth } from '../context/AuthContext';
import { properties } from '../data/properties';
import PropertyList from '../components/PropertyList';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const SavedProperties: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Saved Properties</h1>
            <p className="text-gray-600 mb-6">Please log in to view your saved properties.</p>
            <Link 
              to="/login" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Filter properties to only show saved ones
  const savedProperties = properties.filter(property => 
    user?.savedProperties.includes(property.id)
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Saved Properties</h1>
          <p className="text-gray-600 mt-2">
            {savedProperties.length > 0 
              ? 'View and manage your saved properties' 
              : 'You haven\'t saved any properties yet'
            }
          </p>
        </div>
        
        {savedProperties.length > 0 ? (
          <PropertyList properties={savedProperties} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">No saved properties</h3>
            <p className="text-gray-600 mb-6">Browse available properties and save the ones you like.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Home size={18} />
              <span>Browse Properties</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedProperties;
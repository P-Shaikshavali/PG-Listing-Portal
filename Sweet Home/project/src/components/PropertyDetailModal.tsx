import React, { useState } from 'react';
import { X, Heart, MapPin, Calendar, Users, MaximizeIcon, Bath } from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';

interface PropertyDetailModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ property, isOpen, onClose }) => {
  const { isAuthenticated, saveProperty, unsaveProperty, isSaved } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const saved = isSaved(property.id);

  if (!isOpen) return null;

  const handleSaveToggle = () => {
    if (!isAuthenticated) {
      alert('Please log in to save properties');
      return;
    }
    
    if (saved) {
      unsaveProperty(property.id);
    } else {
      saveProperty(property.id);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex + 1 >= property.images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex - 1 < 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col relative z-10 animate-fadeIn">
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image gallery */}
        <div className="relative h-64 sm:h-80 md:h-96 bg-gray-100">
          <img 
            src={property.images[currentImageIndex]} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          
          {property.images.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50"
                onClick={handlePrevImage}
              >
                <span className="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50"
                onClick={handleNextImage}
              >
                <span className="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
            <h2 className="text-2xl font-bold">{property.title}</h2>
            <div className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
              <span className="ml-2 text-sm">({property.distance} from university)</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <button 
              className={`flex items-center gap-1 px-4 py-2 rounded-md ${
                saved ? 'bg-red-100 text-red-500 border border-red-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={handleSaveToggle}
            >
              <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              <span>
                {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <Bath className="h-5 w-5 mr-2 text-blue-600" />
              <span>
                {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              <MaximizeIcon className="h-5 w-5 mr-2 text-blue-600" />
              <span>{property.size} sq ft</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              <span>Available from {new Date(property.available).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {property.type && (
              <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </span>
            )}
            {property.furnished && (
              <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                Furnished
              </span>
            )}
            {property.petFriendly && (
              <span className="inline-block bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full">
                Pet Friendly
              </span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button 
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
              onClick={() => window.open('mailto:contact@studentstay.example.com?subject=Inquiry about ' + property.title)}
            >
              Contact Landlord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal;
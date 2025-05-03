import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Users, MaximizeIcon, Bath } from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';
import PropertyDetailModal from './PropertyDetailModal';
import { motion } from 'framer-motion';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isAuthenticated, saveProperty, unsaveProperty, isSaved } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const saved = isSaved(property.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="group glass-effect rounded-xl overflow-hidden card-hover"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className={`absolute top-3 right-3 p-2.5 rounded-full ${
              saved 
                ? 'bg-red-100 text-red-500 dark:bg-red-900/30' 
                : 'glass-effect text-gray-600 hover:text-red-500 dark:text-gray-300'
            } transition-colors shadow-lg`}
            onClick={handleSaveToggle}
            aria-label={saved ? "Remove from saved" : "Save property"}
          >
            <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </motion.button>
          <div className="absolute bottom-0 left-0 right-0 glass-effect backdrop-blur-md bg-gradient-to-t from-black/60 to-transparent p-3">
            <span className="font-bold text-lg text-white">{formatPrice(property.price)}</span>
            <span className="text-sm text-gray-200">/month</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{property.location}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-2">
            {property.description}
          </p>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-xs">Available: {new Date(property.available).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MaximizeIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">{property.size} sq ft</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-xs">
                {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
              </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-xs">
                {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.type && (
              <span className="inline-block bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </span>
            )}
            {property.furnished && (
              <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2.5 py-1 rounded-full">
                Furnished
              </span>
            )}
            {property.petFriendly && (
              <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs px-2.5 py-1 rounded-full">
                Pet Friendly
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <PropertyDetailModal 
        property={property} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default PropertyCard;
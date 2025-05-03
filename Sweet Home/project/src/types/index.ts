export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: number; // in sq ft
  available: string; // date string
  images: string[];
  amenities: string[];
  petFriendly: boolean;
  furnished: boolean;
  type: 'apartment' | 'house' | 'studio' | 'shared';
  distance: string; // distance to university
}

export interface User {
  id: string;
  name: string;
  email: string;
  savedProperties: string[];
}

export interface FilterOptions {
  priceRange: [number, number];
  location: string;
  bedrooms: number | null;
  bathrooms: number | null;
  availableBy: string | null;
  petFriendly: boolean | null;
  furnished: boolean | null;
  propertyType: string | null;
}
import { Property } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Studio Near Campus',
    description: 'A bright and spacious studio apartment, perfectly located just a 5-minute walk from the university. Recently renovated with modern appliances and high-speed internet included.',
    price: 850,
    location: 'University District',
    bedrooms: 0,
    bathrooms: 1,
    size: 450,
    available: '2025-01-15',
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
    ],
    amenities: ['WiFi', 'Heating', 'Air Conditioning', 'Laundry Facility', 'Security System'],
    petFriendly: false,
    furnished: true,
    type: 'studio',
    distance: '0.3 miles'
  },
  {
    id: '2',
    title: 'Cozy 2BR Apartment with Balcony',
    description: 'Spacious 2-bedroom apartment with a nice balcony overlooking the city. Perfect for sharing with a roommate. Close to public transportation and local amenities.',
    price: 1200,
    location: 'Riverside',
    bedrooms: 2,
    bathrooms: 1,
    size: 800,
    available: '2025-02-01',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
    ],
    amenities: ['WiFi', 'Heating', 'Balcony', 'Dishwasher', 'Gym', 'Parking'],
    petFriendly: true,
    furnished: true,
    type: 'apartment',
    distance: '1.2 miles'
  },
  {
    id: '3',
    title: 'Budget-Friendly Shared House',
    description: 'A room in a shared house with 3 other students. Common kitchen and living area. Great for socializing and making new friends. Utilities included in the rent.',
    price: 550,
    location: 'College Heights',
    bedrooms: 1,
    bathrooms: 2,
    size: 250,
    available: '2025-01-05',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg'
    ],
    amenities: ['WiFi', 'Heating', 'Shared Kitchen', 'Laundry Facility', 'Garden'],
    petFriendly: false,
    furnished: true,
    type: 'shared',
    distance: '0.8 miles'
  },
  {
    id: '4',
    title: 'Luxury 1BR with Study Nook',
    description: 'Premium 1-bedroom apartment with a dedicated study area, perfect for students who need a quiet space for concentration. High-end finishes and appliances.',
    price: 1100,
    location: 'Downtown',
    bedrooms: 1,
    bathrooms: 1,
    size: 650,
    available: '2025-02-15',
    images: [
      'https://images.pexels.com/photos/1643385/pexels-photo-1643385.jpeg',
      'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg'
    ],
    amenities: ['WiFi', 'Heating', 'Air Conditioning', 'Study Desk', 'Smart Home System', 'Pool'],
    petFriendly: true,
    furnished: true,
    type: 'apartment',
    distance: '1.5 miles'
  },
  {
    id: '5',
    title: 'Affordable 3BR House for Group',
    description: 'Entire 3-bedroom house ideal for a group of students. Spacious backyard, garage, and full kitchen. Close to campus and grocery stores.',
    price: 1800,
    location: 'Oak Valley',
    bedrooms: 3,
    bathrooms: 2,
    size: 1200,
    available: '2025-03-01',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
    ],
    amenities: ['WiFi', 'Heating', 'Garage', 'Full Kitchen', 'Backyard', 'Washer/Dryer'],
    petFriendly: true,
    furnished: false,
    type: 'house',
    distance: '2.1 miles'
  },
  {
    id: '6',
    title: 'Studio with Excellent Amenities',
    description: 'Compact but well-designed studio in a modern building with excellent amenities including gym, rooftop lounge, and study rooms. Great for students who value convenience.',
    price: 950,
    location: 'University District',
    bedrooms: 0,
    bathrooms: 1,
    size: 400,
    available: '2025-01-10',
    images: [
      'https://images.pexels.com/photos/1879061/pexels-photo-1879061.jpeg',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg'
    ],
    amenities: ['WiFi', 'Heating', 'Gym', 'Study Room', 'Rooftop Lounge', 'Bike Storage'],
    petFriendly: false,
    furnished: true,
    type: 'studio',
    distance: '0.4 miles'
  },
  {
    id: '7',
    title: '2BR Apartment Near Public Transit',
    description: 'Comfortable 2-bedroom apartment located near public transportation. Easy access to campus, shopping centers, and entertainment. Ideal for students who do not have a car.',
    price: 1250,
    location: 'Westside',
    bedrooms: 2,
    bathrooms: 1,
    size: 750,
    available: '2025-02-05',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg'
    ],
    amenities: ['WiFi', 'Heating', 'Parking', 'Dishwasher', 'Laundry Facility'],
    petFriendly: true,
    furnished: false,
    type: 'apartment',
    distance: '1.7 miles'
  },
  {
    id: '8',
    title: 'Eco-Friendly 1BR Apartment',
    description: 'Modern 1-bedroom apartment with eco-friendly features like solar power and energy-efficient appliances. Reduced utility costs and a smaller environmental footprint.',
    price: 1050,
    location: 'Greenview',
    bedrooms: 1,
    bathrooms: 1,
    size: 600,
    available: '2025-01-20',
    images: [
      'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg'
    ],
    amenities: ['WiFi', 'Heating', 'Solar Power', 'Energy-Efficient Appliances', 'Recycling Program'],
    petFriendly: true,
    furnished: true,
    type: 'apartment',
    distance: '1.3 miles'
  }
];

export const locations = [
  'University District',
  'Riverside',
  'College Heights',
  'Downtown',
  'Oak Valley',
  'Westside',
  'Greenview'
];

export const propertyTypes = [
  'apartment',
  'house',
  'studio',
  'shared'
];

export const amenities = [
  'WiFi',
  'Heating',
  'Air Conditioning',
  'Laundry Facility',
  'Security System',
  'Balcony',
  'Dishwasher',
  'Gym',
  'Parking',
  'Shared Kitchen',
  'Garden',
  'Study Desk',
  'Smart Home System',
  'Pool',
  'Garage',
  'Full Kitchen',
  'Backyard',
  'Washer/Dryer',
  'Rooftop Lounge',
  'Bike Storage',
  'Solar Power',
  'Energy-Efficient Appliances',
  'Recycling Program'
];
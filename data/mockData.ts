import { Pool, Location } from '@/types';

// Mock data for pools
export const mockPools: Pool[] = [
  {
    id: '1',
    source: 'MGR Central Railway Station',
    destination: 'Velachery',
    cost: 100,
    availableSeats: 2,
    departureTime: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes from now
    driverRating: 4.7,
    driverName: 'Arun R',
    driverAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '2',
    source: 'Tambaram',
    destination: 'Guindy',
    cost: 100,
    availableSeats: 1,
    departureTime: new Date(Date.now() + 35 * 60 * 1000), // 35 minutes from now
    driverRating: 4.5,
    driverName: 'Priya V',
    driverAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '3',
    source: 'Egmore',
    destination: 'Pallavaram',
    cost: 90,
    availableSeats: 1,
    departureTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    driverRating: 4.9,
    driverName: 'Sathish K',
    driverAvatar: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
  {
    id: '4',
    source: 'Chrompet',
    destination: 'Kaiveli',
    cost: 70,
    availableSeats: 2,
    departureTime: new Date(Date.now() + 25 * 60 * 1000), // 25 minutes from now
    driverRating: 4.3,
    driverName: 'Meena S',
    driverAvatar: 'https://randomuser.me/api/portraits/women/58.jpg',
  },
  {
    id: '5',
    source: 'Beach',
    destination: 'Tambaram',
    cost: 120,
    availableSeats: 2,
    departureTime: new Date(Date.now() + 40 * 60 * 1000), // 40 minutes from now
    driverRating: 4.6,
    driverName: 'Suresh N',
    driverAvatar: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

// Mock data for locations
export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'MGR Central Railway Station',
    address: 'Park Town, Chennai',
    isPopular: true,
  },
  {
    id: '2',
    name: 'Velachery',
    address: 'Velachery, Chennai',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Beach',
    address: 'Marina Beach, Chennai',
    isPopular: true,
  },
  {
    id: '4',
    name: 'Tambaram',
    address: 'Tambaram, Chennai',
    isPopular: false,
  },
  {
    id: '5',
    name: 'Guindy',
    address: 'Guindy, Chennai',
    isPopular: true,
  },
  {
    id: '6',
    name: 'Kaiveli',
    address: 'Kaiveli, Chennai',
    isPopular: false,
  },
  {
    id: '7',
    name: 'Chrompet',
    address: 'Chrompet, Chennai',
    isPopular: false,
  },
  {
    id: '8',
    name: 'Pallavaram',
    address: 'Pallavaram, Chennai',
    isPopular: true,
  },
  {
    id: '9',
    name: 'Egmore',
    address: 'Egmore, Chennai',
    isPopular: false,
  },
  {
    id: '10',
    name: 'Sholinganallur',
    address: 'Sholinganallur, Chennai',
    isPopular: true,
  },
];

// Mock data for recent locations
export const mockRecentLocations: Location[] = [
  {
    id: '1',
    name: 'MGR Central Railway Station',
    address: 'Park Town, Chennai',
  },
  {
    id: '5',
    name: 'Guindy',
    address: 'Guindy, Chennai',
  },
  {
    id: '8',
    name: 'Pallavaram',
    address: 'Pallavaram, Chennai',
  },
];
export interface Pool {
  id: string;
  source: string;
  destination: string;
  cost: number;
  availableSeats: number;
  departureTime: Date;
  driverRating: number;
  driverName: string;
  driverAvatar?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  isPopular?: boolean;
}
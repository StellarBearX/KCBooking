export interface Court {
  id: string;
  name: string;
  address: string;
  openingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  } | {
    open: string;
    close: string;
  };
  amenities: Amenity[];
  description: string;
  pricePerHour: number;
  images: string[];
  googleMapsUrl?: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}


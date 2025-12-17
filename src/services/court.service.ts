import { courtsData } from "@/lib/data";

export interface Court {
  id: string;
  name: string;
  address: string;
  openingHours: Record<string, string>;
  amenities: Array<{ id: string; name: string; icon: string }>;
  description: string;
  pricePerHour: number;
  images: string[];
  googleMapsUrl: string;
  location: {
    lat: number;
    lng: number;
  };
}

export class CourtService {
  static getCourtById(courtId: string): Court | null {
    return courtsData[courtId] || null;
  }

  static getAllCourts(): Court[] {
    return Object.values(courtsData);
  }

  static getAvailableCourts(): Court[] {
    // In production, this would filter based on availability
    return Object.values(courtsData);
  }
}


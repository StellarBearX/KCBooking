export interface Court {
  id: string;
  name: string;
  address: string;
  openingHours: {
    open: string;
    close: string;
  };
  amenities: Amenity[];
  description: string;
  pricePerHour: number;
  images: string[];
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

export interface BookingSlot {
  courtId: string;
  courtName: string;
  date: Date;
  timeSlot: TimeSlot;
  price: number;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  date: Date;
  startTime: string;
  endTime: string;
  courtNumber: string;
  totalPrice: number;
  status: "upcoming" | "completed" | "cancelled";
  bookerName: string;
  bookerPhone: string;
  paymentMethod: "card" | "promptpay";
  createdAt: Date;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: "card" | "promptpay";
}


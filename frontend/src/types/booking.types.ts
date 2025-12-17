export interface BookingSlot {
  courtId: string;
  timeSlot: string;
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
  bookerEmail: string;
  bookerPhone: string;
  paymentMethod: "card" | "promptpay";
  createdAt: Date;
}

export interface BookingRequest {
  slots: BookingSlot[];
  date: Date;
  bookerName: string;
  bookerEmail: string;
  bookerPhone: string;
  paymentMethod: string;
}


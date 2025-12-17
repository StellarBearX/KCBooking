// Re-export all types
export * from "./booking.types";
export * from "./user.types";
export * from "./court.types";

// Legacy compatibility - export only non-conflicting types from legacy types
// Note: Booking, BookingSlot are exported from ./booking.types above
export type {
  Court,
  Amenity,
  TimeSlot,
  PaymentMethod,
} from "@/types/index";


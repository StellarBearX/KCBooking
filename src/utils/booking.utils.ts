// Booking-related utilities
export const bookingUtils = {
  generateBookingId: (): string => {
    const prefix = "BM";
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  },

  calculateTotalPrice: (slots: number, pricePerHour: number): number => {
    return slots * pricePerHour;
  },

  formatBookingTime: (startTime: string): string => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHour = (hours + 1) % 24;
    const endTime = `${endHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    return `${startTime}-${endTime}`;
  },
};


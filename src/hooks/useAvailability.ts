// Mock availability checker - In production, this would call an API
export function useAvailability() {
  const checkAvailability = (courtId: string, timeSlot: string, date: Date): boolean => {
    // Simulate some booked slots
    const bookedSlots = [
      { court: "court-1", time: "12:00" },
      { court: "court-1", time: "13:00" },
      { court: "court-3", time: "14:00" },
      { court: "court-5", time: "15:00" },
      { court: "court-7", time: "16:00" },
    ];
    
    return !bookedSlots.some(
      (slot) => slot.court === courtId && slot.time === timeSlot
    );
  };

  return {
    checkAvailability,
  };
}


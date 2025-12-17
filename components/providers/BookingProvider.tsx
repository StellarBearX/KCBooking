"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BookingSlot } from "@/types";

interface BookingContextType {
  selectedSlot: BookingSlot | null;
  setSelectedSlot: (slot: BookingSlot | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);

  return (
    <BookingContext.Provider value={{ selectedSlot, setSelectedSlot }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}


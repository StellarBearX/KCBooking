import { useState, useMemo } from "react";
import { addDays, format, startOfWeek, isWeekend } from "date-fns";
import { th } from "date-fns/locale";
import { APP_CONFIG, OPENING_HOURS } from "@/src/constants";

interface BookingSlot {
  courtId: string;
  timeSlot: string;
}

interface Court {
  id: string;
  name: string;
}

interface TimeSlot {
  id: string;
  time: string;
  hour: number;
}

export function useBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<BookingSlot[]>([]);

  const courts = useMemo(() => {
    return Array.from({ length: APP_CONFIG.courts.total }, (_, i) => ({
      id: `court-${i + 1}`,
      name: APP_CONFIG.courts.names[i],
    }));
  }, []);

  const timeSlots = useMemo(() => {
    const isWeekendDay = isWeekend(selectedDate);
    const config = isWeekendDay ? OPENING_HOURS.weekend : OPENING_HOURS.weekday;
    
    const slots: TimeSlot[] = [];
    for (let hour = config.start; hour < config.end; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`;
      slots.push({
        id: `slot-${hour}`,
        time: timeString,
        hour: hour,
      });
    }
    
    return slots;
  }, [selectedDate]);

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlots([]);
  };

  const handleSlotSelect = (courtId: string, timeSlot: string) => {
    setSelectedSlots((prev) => {
      const slotKey = `${courtId}-${timeSlot}`;
      const exists = prev.some(
        (slot) => `${slot.courtId}-${slot.timeSlot}` === slotKey
      );
      
      if (exists) {
        return prev.filter(
          (slot) => `${slot.courtId}-${slot.timeSlot}` !== slotKey
        );
      } else {
        return [...prev, { courtId, timeSlot }];
      }
    });
  };

  const isSlotSelected = (courtId: string, timeSlot: string) => {
    return selectedSlots.some(
      (slot) => slot.courtId === courtId && slot.timeSlot === timeSlot
    );
  };

  const getOpeningHours = (date: Date) => {
    return isWeekend(date) 
      ? OPENING_HOURS.weekend.display 
      : OPENING_HOURS.weekday.display;
  };

  return {
    selectedDate,
    selectedSlots,
    courts,
    timeSlots,
    weekDays,
    handleDateSelect,
    handleSlotSelect,
    isSlotSelected,
    getOpeningHours,
    setSelectedSlots,
  };
}


"use client";

import { cn } from "@/lib/utils";

interface TimeSlot {
  id: string;
  time: string;
  hour: number;
}

interface Court {
  id: string;
  name: string;
}

interface BookingTimeSlotGridProps {
  courts: Court[];
  timeSlots: TimeSlot[];
  isSlotAvailable: (courtId: string, timeSlot: string) => boolean;
  isSlotSelected: (courtId: string, timeSlot: string) => boolean;
  onSlotSelect: (courtId: string, timeSlot: string) => void;
}

export default function BookingTimeSlotGrid({
  courts,
  timeSlots,
  isSlotAvailable,
  isSlotSelected,
  onSlotSelect,
}: BookingTimeSlotGridProps) {
  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-hide">
      {courts.map((court) => (
        <div key={court.id} className="space-y-2">
          <p className="text-sm font-semibold text-text mb-2">{court.name}</p>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const available = isSlotAvailable(court.id, slot.time);
              const selected = isSlotSelected(court.id, slot.time);
              return (
                <button
                  key={slot.id}
                  onClick={() => available && onSlotSelect(court.id, slot.time)}
                  disabled={!available}
                  className={cn(
                    "py-2.5 px-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95",
                    selected
                      ? "bg-primary text-white shadow-md scale-105 ring-2 ring-primary/30"
                      : available
                      ? "bg-white border-2 border-border hover:border-primary hover:bg-primary/5 text-text"
                      : "bg-border/50 text-text-muted cursor-not-allowed opacity-50"
                  )}
                >
                  {available ? slot.time : "✕"}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}


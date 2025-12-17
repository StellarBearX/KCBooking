"use client";

import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { dateUtils } from "@/src/utils/date.utils";

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
}

interface BookingSummaryProps {
  selectedSlots: BookingSlot[];
  selectedDate: Date;
  courts: Court[];
  timeSlots: TimeSlot[];
  pricePerHour: number;
  onClear: () => void;
}

export default function BookingSummary({
  selectedSlots,
  selectedDate,
  courts,
  timeSlots,
  pricePerHour,
  onClear,
}: BookingSummaryProps) {
  if (selectedSlots.length === 0) return null;

  const totalPrice = selectedSlots.length * pricePerHour;

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 animate-slide-up">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold text-text">รายละเอียดการจอง</p>
          </div>
          <button
            onClick={onClear}
            className="text-xs text-text-secondary hover:text-primary transition-colors"
          >
            ล้างทั้งหมด
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">วันที่</span>
            <span className="text-sm font-semibold text-text">
              {format(selectedDate, "d MMMM yyyy", { locale: th })}
            </span>
          </div>
          
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-text-secondary mb-2">
              รายการที่เลือก ({selectedSlots.length} รายการ)
            </p>
            <div className="space-y-1.5 max-h-32 overflow-y-auto scrollbar-hide">
              {selectedSlots.map((slot, index) => {
                const court = courts.find((c) => c.id === slot.courtId);
                const timeSlot = timeSlots.find((ts) => ts.time === slot.timeSlot);
                return (
                  <div
                    key={`${slot.courtId}-${slot.timeSlot}-${index}`}
                    className="flex items-center justify-between text-xs bg-white/50 rounded px-2 py-1.5"
                  >
                    <span className="text-text">
                      {court?.name} - {timeSlot?.time}
                    </span>
                    <span className="text-primary font-semibold">
                      {formatCurrency(pricePerHour)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-text">ราคารวม</span>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {selectedSlots.length} ชั่วโมง × {formatCurrency(pricePerHour)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


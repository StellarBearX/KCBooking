"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { mockCourt } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { addWeeks, subWeeks, format } from "date-fns";
import { th } from "date-fns/locale";
import { ChevronLeft, ChevronRight, ArrowLeft, Clock, Calendar } from "lucide-react";
import { useBooking } from "@/src/hooks/useBooking";
import { useAvailability } from "@/src/hooks/useAvailability";
import BookingDateSelector from "@/src/components/features/booking/BookingDateSelector";
import BookingTimeSlotGrid from "@/src/components/features/booking/BookingTimeSlotGrid";
import BookingSummary from "@/src/components/features/booking/BookingSummary";
import { ROUTES } from "@/src/constants";

export default function BookingPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const {
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
  } = useBooking();

  const { checkAvailability } = useAvailability();

  const handleNextMonth = () => {
    setCurrentMonth(addWeeks(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subWeeks(currentMonth, 1));
  };

  const isSlotAvailable = (courtId: string, timeSlot: string) => {
    return checkAvailability(courtId, timeSlot, selectedDate);
  };

  const openingHours = getOpeningHours(selectedDate);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-4 space-y-4 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text active:opacity-70"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">กลับ</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg active:bg-background-light transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-text w-32 text-center">
              {format(currentMonth, "MMMM yyyy", { locale: th })}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg active:bg-background-light transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <BookingDateSelector
          dates={weekDays}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />

        {/* Opening Hours Info */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-text">
                เวลาเปิด-ปิด: {openingHours}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Time Slot Selection */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-text">เลือกคอร์ดและเวลา</h2>
            </div>

            <BookingTimeSlotGrid
              courts={courts}
              timeSlots={timeSlots}
              isSlotAvailable={isSlotAvailable}
              isSlotSelected={isSlotSelected}
              onSlotSelect={handleSlotSelect}
            />

            {/* Legend */}
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-white border-2 border-border rounded"></div>
                <span className="text-text-secondary">ว่าง</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-border/50 rounded"></div>
                <span className="text-text-secondary">จองแล้ว</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-primary rounded ring-2 ring-primary/30"></div>
                <span className="text-text-secondary">เลือกแล้ว</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Slots Summary */}
        <BookingSummary
          selectedSlots={selectedSlots}
          selectedDate={selectedDate}
          courts={courts}
          timeSlots={timeSlots}
          pricePerHour={mockCourt.pricePerHour}
          onClear={() => setSelectedSlots([])}
        />

        {/* Continue Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={() => router.push(ROUTES.payment)}
          disabled={selectedSlots.length === 0}
        >
          {selectedSlots.length > 0 
            ? `ดำเนินการต่อ (${selectedSlots.length} รายการ)`
            : "เลือกคอร์ดและเวลา"}
        </Button>
      </div>
    </div>
  );
}

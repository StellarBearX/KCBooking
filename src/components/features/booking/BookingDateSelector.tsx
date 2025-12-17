"use client";

import { format } from "date-fns";
import { th } from "date-fns/locale";
import { isWeekend } from "date-fns";
import { cn } from "@/lib/utils";
import { dateUtils } from "@/src/utils/date.utils";

interface BookingDateSelectorProps {
  dates: Date[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function BookingDateSelector({
  dates,
  selectedDate,
  onDateSelect,
}: BookingDateSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {dates.map((date) => {
        const isSelected =
          format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
        const isToday = dateUtils.isToday(date);
        const isWeekendDate = isWeekend(date);
        
        return (
          <button
            key={date.toISOString()}
            onClick={() => onDateSelect(date)}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-3 rounded-xl min-w-[60px] transition-all duration-200 shadow-sm",
              isSelected
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-white/80 backdrop-blur-sm hover:bg-background-light hover:shadow-md active:scale-95"
            )}
          >
            <span className={cn(
              "text-xs font-medium",
              isToday && !isSelected && "text-primary"
            )}>
              {format(date, "EEE", { locale: th })}
            </span>
            <span className="text-lg font-semibold">
              {format(date, "d")}
            </span>
            {isToday && !isSelected && (
              <div className="w-1 h-1 bg-primary rounded-full" />
            )}
            {isWeekendDate && (
              <span className="text-[10px] text-text-secondary">8-22</span>
            )}
          </button>
        );
      })}
    </div>
  );
}


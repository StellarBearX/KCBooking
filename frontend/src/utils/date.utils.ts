import { format, addDays, startOfWeek, isWeekend } from "date-fns";
import { th } from "date-fns/locale";

export const dateUtils = {
  formatDate: (date: Date, formatStr: string = "d MMMM yyyy") => {
    return format(date, formatStr, { locale: th });
  },

  formatTime: (date: Date) => {
    return format(date, "HH:mm");
  },

  getWeekDays: (date: Date) => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  },

  isWeekend: (date: Date) => {
    return isWeekend(date);
  },

  isToday: (date: Date) => {
    const today = new Date();
    return format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
  },

  getEndTime: (startTime: string): string => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endHour = (hours + 1) % 24;
    return `${endHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  },
};


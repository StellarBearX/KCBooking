// Legacy utilities - keeping for backward compatibility
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { bookingUtils } from "./booking.utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date, formatStr: string = "d MMMM yyyy"): string {
  return format(date, formatStr, { locale: th });
}

export function generateBookingId(): string {
  return bookingUtils.generateBookingId();
}


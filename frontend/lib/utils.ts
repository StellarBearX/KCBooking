import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `THB ${amount.toLocaleString()}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatTime(time: string): string {
  return time;
}

export function generateBookingId(): string {
  return `#BM${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}


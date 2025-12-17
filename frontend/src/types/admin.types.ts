export interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  courtUtilizationRate: number;
  todayBookings: number;
  todayRevenue: number;
  weekBookings: number;
  weekRevenue: number;
  monthBookings: number;
  monthRevenue: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
}

export interface PopularCourt {
  courtId: string;
  courtName: string;
  bookingCount: number;
  revenue: number;
}

import { Booking } from "./booking.types";

export interface AdminBooking extends Booking {
  updatedAt?: Date;
}

export interface BookingFilter {
  dateFrom?: Date;
  dateTo?: Date;
  status?: "upcoming" | "completed" | "cancelled";
  courtId?: string;
  search?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  totalBookings: number;
  totalSpent: number;
  status: "active" | "banned";
}

export interface CourtSchedule {
  courtId: string;
  courtName: string;
  openingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  isAvailable: boolean;
  maintenanceMode?: boolean;
  maintenanceStart?: Date;
  maintenanceEnd?: Date;
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
  courts: string[]; // empty array means all courts
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  targetUsers?: string[]; // empty array means all users
  sentAt?: Date;
  createdAt: Date;
}

export interface SystemSettings {
  defaultPricePerHour: number;
  defaultOpeningHours: {
    weekday: { start: number; end: number };
    weekend: { start: number; end: number };
  };
  notificationSettings: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    bookingConfirmation: boolean;
    bookingReminder: boolean;
    paymentConfirmation: boolean;
  };
  paymentSettings: {
    promptpayEnabled: boolean;
    cardEnabled: boolean;
    promptpayQrCode?: string;
  };
}


// Application Constants
export const APP_CONFIG = {
  name: "KCBooking",
  description: "Professional badminton court booking platform",
  defaultPricePerHour: 200,
  courts: {
    total: 12,
    names: Array.from({ length: 12 }, (_, i) => `คอร์ด ${i + 1}`),
  },
} as const;

export const OPENING_HOURS = {
  weekday: {
    start: 12,
    end: 24, // 0:00 (midnight)
    display: "12:00–0:00",
  },
  weekend: {
    start: 8,
    end: 22,
    display: "8:00–22:00",
  },
} as const;

export const ROUTES = {
  home: "/home",
  login: "/",
  register: "/register",
  courts: "/courts",
  court: (id: string) => `/court/${id}`,
  booking: "/booking",
  payment: "/payment",
  confirmation: "/confirmation",
  myBookings: "/my-bookings",
  profile: "/profile",
  terms: "/terms",
  admin: "/admin",
  adminBookings: "/admin/bookings",
  adminCourts: "/admin/courts",
  adminSchedule: "/admin/schedule",
  adminUsers: "/admin/users",
  adminReports: "/admin/reports",
  adminSettings: "/admin/settings",
  adminNotifications: "/admin/notifications",
} as const;


// Application Configuration
export const appConfig = {
  name: "KCBooking",
  description: "Professional badminton court booking platform",
  version: "1.0.0",
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    timeout: 30000,
  },
  features: {
    enableMultiSelection: true,
    enableProfileSync: true,
    enableLocalStorage: true,
  },
} as const;


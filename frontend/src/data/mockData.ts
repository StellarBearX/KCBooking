import { Court, PaymentMethod } from "@/types";
import { APP_CONFIG } from "@/src/constants";

export const mockCourt: Court = {
  id: "1",
  name: "Baan Badminton Sukhumvit",
  address: "Vv. Baan Badminton, Sukhumvit, Baan",
  openingHours: {
    open: "09:00",
    close: "21:00",
  },
  amenities: [
    { id: "1", name: "AC", icon: "snowflake" },
    { id: "2", name: "Parking", icon: "car" },
    { id: "3", name: "Shower", icon: "droplet" },
    { id: "4", name: "Clinics", icon: "stethoscope" },
  ],
  description:
    "Baan Badminton Sukhumvit is located at badminton court in longe shan ineas and maronn:onreers.",
  pricePerHour: APP_CONFIG.defaultPricePerHour,
  images: ["/court1.jpg", "/court2.jpg"],
  location: {
    lat: 13.7563,
    lng: 100.5018,
  },
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: "credit-card",
    type: "card",
  },
  {
    id: "promptpay",
    name: "QR PromptPay",
    icon: "qr-code",
    type: "promptpay",
  },
];

// Export for backward compatibility
export { mockCourt as defaultMockCourt };


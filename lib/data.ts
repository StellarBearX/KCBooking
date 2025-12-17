import { Court, Amenity, TimeSlot, PaymentMethod } from "@/types";

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
  pricePerHour: 200,
  images: ["/court1.jpg", "/court2.jpg"],
  location: {
    lat: 13.7563,
    lng: 100.5018,
  },
};

export const timeSlots: TimeSlot[] = [
  { id: "1", time: "09:00", available: true },
  { id: "2", time: "10:00", available: true },
  { id: "3", time: "11:00", available: false },
  { id: "4", time: "12:00", available: false },
  { id: "5", time: "13:00", available: true },
  { id: "6", time: "14:00", available: true },
  { id: "7", time: "15:00", available: true },
  { id: "8", time: "16:00", available: true },
  { id: "9", time: "17:00", available: true },
  { id: "10", time: "18:00", available: true },
  { id: "11", time: "19:00", available: true },
  { id: "12", time: "20:00", available: true },
];

export const courts = [
  { id: "court-1", name: "คอร์ด 1" },
  { id: "court-2", name: "คอร์ด 2" },
  { id: "court-vip", name: "คอร์ด VIP" },
];

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


import { APP_CONFIG } from "@/src/constants";

export const courtsData: Record<string, any> = {
  "manta-badminton-court": {
    id: "manta-badminton-court",
    name: "สนามแบดมินตัน มันตา",
    address: "20 ซอย พหลโยธิน 24 แยก 8 แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
    openingHours: {
      monday: "12:00–0:00",
      tuesday: "12:00–0:00",
      wednesday: "12:00–0:00",
      thursday: "12:00–0:00",
      friday: "12:00–0:00",
      saturday: "8:00–22:00",
      sunday: "8:00–22:00",
    },
    amenities: [
      { id: "1", name: "ที่จอดรถ", icon: "car" },
      { id: "2", name: "ที่อาบน้ำ", icon: "droplet" },
      { id: "3", name: "ห้องน้ำ", icon: "droplet" },
    ],
    description:
      "สนามแบดมินตัน มันตา เป็นสนามแบดมินตันที่ตั้งอยู่ในทำเลที่สะดวกสบายใกล้ถนนพหลโยธิน เหมาะสำหรับการเล่นกีฬาและออกกำลังกาย มีที่จอดรถกว้างขวาง พร้อมที่อาบน้ำและห้องน้ำ",
    pricePerHour: APP_CONFIG.defaultPricePerHour,
    images: ["/manta.jpeg"],
    googleMapsUrl: "https://maps.app.goo.gl/A59iJQM7FuZxUTzu7",
    location: {
      lat: 13.8256,
      lng: 100.5567,
    },
  },
};


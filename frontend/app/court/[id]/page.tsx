"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import CourtImageCarousel from "@/components/court/CourtImageCarousel";
import Amenities from "@/components/court/Amenities";
import BookingButton from "@/components/court/BookingButton";
import { MapPin, Clock, ArrowLeft } from "lucide-react";

const courtsData: Record<string, any> = {
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
    pricePerHour: 200,
    images: ["/manta.jpeg"],
    googleMapsUrl: "https://maps.app.goo.gl/A59iJQM7FuZxUTzu7",
    location: {
      lat: 13.8256,
      lng: 100.5567,
    },
  },
};

export default function CourtDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courtId = params.id as string;
  const court = courtsData[courtId] || courtsData["manta-badminton-court"];

  return (
    <main className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-4 max-w-md">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-text active:opacity-70"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">กลับ</span>
        </button>

        <Card className="overflow-hidden">
          <CourtImageCarousel images={court.images} />
          <CardContent className="p-4 space-y-4">
            <div>
              <h1 className="text-xl font-bold mb-3 text-text">{court.name}</h1>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-text-secondary">ที่อยู่</p>
                    <p className="text-sm text-text">{court.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-text-secondary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-text-secondary mb-1">เวลาเปิด-ปิด</p>
                    <div className="space-y-0.5 text-sm">
                      <p className="text-text">จันทร์ - ศุกร์: {court.openingHours.monday}</p>
                      <p className="text-text">เสาร์ - อาทิตย์: {court.openingHours.saturday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold mb-3 text-text">สิ่งอำนวยความสะดวก</h2>
              <Amenities amenities={court.amenities} />
            </div>

            <div>
              <h2 className="text-base font-semibold mb-2 text-text">รายละเอียด</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {court.description}
              </p>
            </div>

            <div className="rounded-lg bg-background-light p-3 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-secondary">ราคา</p>
                  <p className="text-xl font-bold text-primary">
                    {formatCurrency(court.pricePerHour)} / ชม.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-background-light border border-border overflow-hidden">
              <div className="h-48 w-full relative">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(court.address)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-3">
                <a
                  href={court.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark font-medium text-xs flex items-center gap-2"
                >
                  <MapPin className="h-3 w-3" />
                  เปิดใน Google Maps
                </a>
              </div>
            </div>

            <div className="pb-2">
              <BookingButton courtId={court.id} variant="default" />
            </div>
          </CardContent>
        </Card>

        {/* Sticky Booking Button - Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border p-4 shadow-lg">
          <BookingButton courtId={court.id} variant="sticky" />
        </div>
      </div>
    </main>
  );
}

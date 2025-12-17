"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const availableCourts = [
  {
    id: "manta-badminton-court",
    name: "สนามแบดมินตัน มันตา",
    address: "20 ซอย พหลโยธิน 24 แยก 8 แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
    openingHours: "จ-ศ: 12:00–0:00, ส-อา: 8:00–22:00",
    pricePerHour: 200,
    rating: 4.8,
    image: "/manta.jpeg",
    amenities: ["ที่จอดรถ", "ที่อาบน้ำ", "ห้องน้ำ"],
  },
];

export default function CourtsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 pt-4 max-w-md">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1 text-text">เลือกคอร์ด</h1>
          <p className="text-sm text-text-secondary">เลือกคอร์ดที่คุณต้องการจอง</p>
        </div>

        <div className="space-y-4">
          {availableCourts.map((court) => (
            <Card
              key={court.id}
              className="overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
              onClick={() => router.push(`/court/${court.id}`)}
            >
              <div className="flex">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold">{court.rating}</span>
                  </div>
                </div>

                <CardContent className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-bold mb-2 text-text line-clamp-1">{court.name}</h2>

                    <div className="space-y-1.5 mb-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-text-secondary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-text-secondary line-clamp-1">{court.address}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-text-secondary flex-shrink-0" />
                        <p className="text-xs text-text-secondary">{court.openingHours}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {court.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-background-light rounded-full text-xs text-text-secondary"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(court.pricePerHour)}
                      </p>
                      <p className="text-xs text-text-muted">/ ชั่วโมง</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <span className="text-sm font-medium">จอง</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

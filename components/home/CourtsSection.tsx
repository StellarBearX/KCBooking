"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin, Clock, Star, Calendar } from "lucide-react";
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

export default function CourtsSection() {
  const router = useRouter();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-text">เลือกคอร์ด</h2>
          <p className="text-lg text-text-secondary">เลือกคอร์ดที่คุณต้องการจอง</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourts.map((court, index) => (
            <Card
              key={court.id}
              className="overflow-hidden cursor-pointer card-hover animate-scale-in"
              onClick={() => router.push(`/court/${court.id}`)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold">{court.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-text">{court.name}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">ที่อยู่</p>
                      <p className="text-text text-sm">{court.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-text-secondary">เวลาเปิด-ปิด</p>
                      <p className="text-text text-sm">{court.openingHours}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {court.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-background-light rounded-full text-sm text-text-secondary"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-text-secondary">ราคา</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(court.pricePerHour)}
                    </p>
                    <p className="text-xs text-text-muted">/ ชั่วโมง</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/court/${court.id}`);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>จองเลย</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


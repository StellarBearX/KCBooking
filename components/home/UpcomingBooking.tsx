"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { mockCourt } from "@/lib/data";

export default function UpcomingBooking() {
  const router = useRouter();

  const upcomingBooking = {
    id: "1",
    courtName: mockCourt.name,
    date: "20 ต.ค. 2023",
    time: "18:00-19:00",
    courtNumber: "คอร์ด 1",
    price: mockCourt.pricePerHour,
    daysLeft: 2,
  };

  return (
    <Card
      className="bg-white/80 backdrop-blur-sm cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => router.push("/my-bookings")}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-text">การจองที่กำลังจะมาถึง</h3>
          </div>
          <ArrowRight className="h-4 w-4 text-text-secondary" />
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-sm font-semibold text-text mb-1">
              {upcomingBooking.courtName}
            </p>
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{upcomingBooking.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{upcomingBooking.time}</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              {upcomingBooking.courtNumber}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div>
              <p className="text-xs text-text-secondary">ราคา</p>
              <p className="text-lg font-bold text-primary">
                {formatCurrency(upcomingBooking.price)}
              </p>
            </div>
            <div className="px-3 py-1 bg-primary/10 rounded-full">
              <p className="text-xs font-medium text-primary">
                อีก {upcomingBooking.daysLeft} วัน
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


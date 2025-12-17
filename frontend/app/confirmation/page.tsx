"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { mockCourt } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "#BM123455";

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-text">การจองสำเร็จ!</h1>
            <p className="text-sm text-text-secondary">Booking ID: {bookingId}</p>
          </div>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div>
                <h2 className="font-semibold text-base mb-1 text-text">{mockCourt.name}</h2>
                <p className="text-sm text-text-secondary">
                  20 ต.ค. 2023, 18:00-19:00 (คอร์ด 1)
                </p>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-secondary">(คอร์ด 1)</span>
                  <span className="text-sm text-text">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm text-text">รวม</span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(mockCourt.pricePerHour)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => router.push("/my-bookings")}
            >
              ดูการจองของวัน
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="outline"
              onClick={() => router.push("/home")}
            >
              กลับหน้าแรก
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-text-secondary">กำลังโหลด...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

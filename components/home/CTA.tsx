"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Calendar, ArrowRight } from "lucide-react";

export default function CTA() {
  const router = useRouter();

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text">
            พร้อมเริ่มจองคอร์ดแล้วหรือยัง?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            เข้าร่วมกับผู้ใช้หลายพันคนที่ไว้วางใจ KCBooking
            <br />
            เริ่มจองคอร์ดแบดมินตันของคุณได้เลยวันนี้
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/courts")}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl"
            >
              เริ่มจองเลย
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/my-bookings")}
              className="px-8 py-6 text-lg"
            >
              ดูการจองของฉัน
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


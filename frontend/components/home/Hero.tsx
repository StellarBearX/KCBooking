"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Calendar, ArrowRight, Star } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background-light">
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-4">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-text">แพลตฟอร์มจองคอร์ดแบดมินตัน</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 leading-tight">
            จองคอร์ดแบดมินตัน
            <br />
            <span className="text-primary">ง่ายๆ ในคลิกเดียว</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
            เลือกคอร์ด ตรวจสอบความพร้อม และจองได้ทันที
            <br />
            ไม่ต้องรอคิว ไม่ต้องโทรจอง
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => router.push("/courts")}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl"
            >
              <Calendar className="mr-2 h-5 w-5" />
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


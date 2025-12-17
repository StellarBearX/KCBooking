"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { mockCourt } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MyBookingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">(
    "upcoming"
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-4 space-y-4 max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-text">การจองของฉัน</h1>
            <p className="text-sm text-text-secondary">จัดการการจองของคุณ</p>
          </div>
          <button
            onClick={() => router.push("/profile")}
            className="p-2 rounded-lg text-text-secondary active:bg-background-light"
          >
            <User className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "px-4 py-2 font-medium border-b-2 transition-colors text-sm",
              activeTab === "upcoming"
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary active:text-text"
            )}
          >
            ที่กำลังจะมาถึง
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "px-4 py-2 font-medium border-b-2 transition-colors text-sm",
              activeTab === "history"
                ? "border-primary text-primary"
                : "border-transparent text-text-secondary active:text-text"
            )}
          >
            ประวัติการจอง
          </button>
        </div>

        {activeTab === "upcoming" && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <div>
                <h2 className="font-semibold text-base mb-1 text-text">{mockCourt.name}</h2>
                <p className="text-sm text-text-secondary mb-2">
                  20 ต.ค. 2023, 18:00-19:00 (คอร์ด 1)
                </p>
                <p className="text-xs text-primary font-medium mb-3">
                  อีก 2 วัน
                </p>
              </div>
              <Button className="w-full" size="md">
                ดู QR Code สำหรับเข้าใช้
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === "history" && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-semibold text-base text-text">Baan Badminton</h2>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                      สำเร็จ
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    20 ต.ค. 2023, 18:00-19:00 (คอร์ด 1)
                  </p>
                  <p className="text-sm font-semibold text-text">
                    รวม {formatCurrency(mockCourt.pricePerHour)}
                  </p>
                </div>
              </div>
              <Button className="w-full" size="md" variant="outline">
                ดูรายละเอียด
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

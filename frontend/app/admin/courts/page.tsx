"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Plus, Edit, Trash2, MapPin, Clock, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { courtsData } from "@/src/data/courtsData";
import type { Court } from "@/src/types/court.types";

export default function AdminCourtsPage() {
  const router = useRouter();
  const [courts, setCourts] = useState<Court[]>(Object.values(courtsData));

  const handleDelete = (courtId: string) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสนามนี้?")) {
      setCourts(courts.filter((c) => c.id !== courtId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">จัดการสนาม</h1>
          <p className="text-text-secondary mt-1">จัดการข้อมูลสนามแบดมินตันทั้งหมด</p>
        </div>
        <Button onClick={() => router.push("/admin/courts/new")}>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มสนามใหม่
        </Button>
      </div>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <Card key={court.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Court Image */}
              <div className="aspect-video bg-background-light rounded-lg mb-4 overflow-hidden">
                {court.images && court.images.length > 0 ? (
                  <img
                    src={court.images[0]}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-text-muted" />
                  </div>
                )}
              </div>

              {/* Court Info */}
              <h3 className="text-lg font-semibold text-text mb-2">{court.name}</h3>
              <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                {court.address}
              </p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <DollarSign className="h-4 w-4" />
                  <span>{formatCurrency(court.pricePerHour)}/ชั่วโมง</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Clock className="h-4 w-4" />
                  <span>
                    {typeof court.openingHours === "object" && "monday" in court.openingHours
                      ? "ดูเวลาเปิด-ปิด"
                      : "open" in court.openingHours
                      ? `${(court.openingHours as { open: string; close: string }).open} - ${(court.openingHours as { open: string; close: string }).close}`
                      : "ดูเวลาเปิด-ปิด"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <MapPin className="h-4 w-4" />
                  <span>{court.amenities.length} สิ่งอำนวยความสะดวก</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/courts/${court.id}`)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  แก้ไข
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(court.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">ยังไม่มีสนาม</p>
            <Button className="mt-4" onClick={() => router.push("/admin/courts/new")}>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มสนามแรก
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


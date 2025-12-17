"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Clock, Calendar, Wrench } from "lucide-react";
import { courtsData } from "@/src/data/courtsData";
import type { CourtSchedule, Holiday } from "@/src/types/admin.types";

const daysOfWeek = [
  { key: "monday", label: "จันทร์" },
  { key: "tuesday", label: "อังคาร" },
  { key: "wednesday", label: "พุธ" },
  { key: "thursday", label: "พฤหัสบดี" },
  { key: "friday", label: "ศุกร์" },
  { key: "saturday", label: "เสาร์" },
  { key: "sunday", label: "อาทิตย์" },
];

export default function AdminSchedulePage() {
  const [schedules, setSchedules] = useState<CourtSchedule[]>(
    Object.values(courtsData).map((court) => ({
      courtId: court.id,
      courtName: court.name,
      openingHours:
        typeof court.openingHours === "object" && "monday" in court.openingHours
          ? court.openingHours
          : {
              monday: "12:00–0:00",
              tuesday: "12:00–0:00",
              wednesday: "12:00–0:00",
              thursday: "12:00–0:00",
              friday: "12:00–0:00",
              saturday: "8:00–22:00",
              sunday: "8:00–22:00",
            },
      isAvailable: true,
      maintenanceMode: false,
    }))
  );

  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const toggleMaintenance = (courtId: string) => {
    setSchedules(
      schedules.map((s) =>
        s.courtId === courtId
          ? { ...s, maintenanceMode: !s.maintenanceMode }
          : s
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">จัดการเวลา</h1>
        <p className="text-text-secondary mt-1">ตั้งค่าเวลาเปิด-ปิดและวันหยุดพิเศษ</p>
      </div>

      {/* Court Schedules */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.courtId}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text">{schedule.courtName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {schedule.maintenanceMode ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                        <Wrench className="h-3 w-3" />
                        อยู่ระหว่างการซ่อมบำรุง
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        <Clock className="h-3 w-3" />
                        เปิดให้บริการ
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleMaintenance(schedule.courtId)}
                >
                  {schedule.maintenanceMode ? "เปิดให้บริการ" : "ปิดเพื่อซ่อมบำรุง"}
                </Button>
              </div>

              {/* Opening Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {daysOfWeek.map((day) => (
                  <div key={day.key} className="p-3 bg-background-light rounded-lg">
                    <div className="text-sm font-medium text-text mb-1">{day.label}</div>
                    <div className="text-sm text-text-secondary">
                      {schedule.openingHours[day.key as keyof typeof schedule.openingHours] || "ปิด"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Holidays */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-text flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                วันหยุดพิเศษ
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                ตั้งค่าวันหยุดที่ปิดให้บริการ
              </p>
            </div>
            <Button variant="outline" size="sm">
              เพิ่มวันหยุด
            </Button>
          </div>

          {holidays.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              ยังไม่มีวันหยุดพิเศษ
            </div>
          ) : (
            <div className="space-y-2">
              {holidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="flex items-center justify-between p-3 bg-background-light rounded-lg"
                >
                  <div>
                    <div className="font-medium text-text">{holiday.name}</div>
                    <div className="text-sm text-text-secondary">
                      {holiday.date.toLocaleDateString("th-TH")}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    ลบ
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


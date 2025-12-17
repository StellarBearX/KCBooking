"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Download, Calendar, TrendingUp, MapPin, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { th } from "date-fns/locale";

type ReportPeriod = "day" | "week" | "month";

export default function AdminReportsPage() {
  const [period, setPeriod] = useState<ReportPeriod>("month");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDateRange = () => {
    switch (period) {
      case "day":
        return {
          start: selectedDate,
          end: selectedDate,
          label: format(selectedDate, "dd MMMM yyyy", { locale: th }),
        };
      case "week":
        return {
          start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
          end: endOfWeek(selectedDate, { weekStartsOn: 1 }),
          label: `${format(startOfWeek(selectedDate, { weekStartsOn: 1 }), "dd MMM", { locale: th })} - ${format(endOfWeek(selectedDate, { weekStartsOn: 1 }), "dd MMM yyyy", { locale: th })}`,
        };
      case "month":
        return {
          start: startOfMonth(selectedDate),
          end: endOfMonth(selectedDate),
          label: format(selectedDate, "MMMM yyyy", { locale: th }),
        };
    }
  };

  const dateRange = getDateRange();

  // Mock data
  const mockRevenue = 97400;
  const mockBookings = 487;
  const mockCancellations = 23;
  const mockPopularCourts = [
    { name: "คอร์ด 1", bookings: 234, revenue: 46800 },
    { name: "คอร์ด 2", bookings: 198, revenue: 39600 },
    { name: "คอร์ด 3", bookings: 187, revenue: 37400 },
    { name: "คอร์ด VIP", bookings: 156, revenue: 46800 },
  ];
  const mockPopularTimes = [
    { time: "18:00-19:00", bookings: 89 },
    { time: "19:00-20:00", bookings: 95 },
    { time: "20:00-21:00", bookings: 78 },
    { time: "17:00-18:00", bookings: 67 },
  ];

  const handleExport = (format: "excel" | "pdf") => {
    alert(`กำลังส่งออกรายงานเป็น ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">รายงาน</h1>
          <p className="text-text-secondary mt-1">รายงานสถิติและข้อมูลการใช้งาน</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("excel")}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex gap-2">
              {(["day", "week", "month"] as ReportPeriod[]).map((p) => (
                <Button
                  key={p}
                  variant={period === p ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setPeriod(p)}
                >
                  {p === "day" ? "รายวัน" : p === "week" ? "รายสัปดาห์" : "รายเดือน"}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-text-secondary" />
              <input
                type={period === "month" ? "month" : period === "week" ? "week" : "date"}
                value={
                  period === "month"
                    ? format(selectedDate, "yyyy-MM")
                    : period === "week"
                    ? format(selectedDate, "yyyy-'W'ww")
                    : format(selectedDate, "yyyy-MM-dd")
                }
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="px-3 py-2 border border-border rounded-lg"
              />
            </div>
            <div className="text-sm text-text-secondary">
              {dateRange.label}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">รายได้รวม</p>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {formatCurrency(mockRevenue)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">จำนวนการจอง</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {mockBookings.toLocaleString()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">การยกเลิก</p>
                <p className="text-2xl font-bold text-red-900 mt-1">
                  {mockCancellations}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {(mockCancellations / mockBookings * 100).toFixed(1)}% ของการจองทั้งหมด
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-700 rotate-180" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Courts */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            สนามที่ได้รับความนิยม
          </h2>
          <div className="space-y-3">
            {mockPopularCourts.map((court, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background-light rounded-lg">
                <div>
                  <p className="font-medium text-text">{court.name}</p>
                  <p className="text-sm text-text-secondary">{court.bookings} การจอง</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text">{formatCurrency(court.revenue)}</p>
                  <p className="text-xs text-text-secondary">รายได้</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Times */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            ช่วงเวลาที่จองมากที่สุด
          </h2>
          <div className="space-y-3">
            {mockPopularTimes.map((time, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm text-text-secondary">{time.time}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="h-6 bg-primary rounded"
                      style={{ width: `${(time.bookings / 100) * 100}%` }}
                    />
                    <span className="text-sm font-medium text-text">{time.bookings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


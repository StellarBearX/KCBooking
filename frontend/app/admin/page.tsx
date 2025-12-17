"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Clock,
  MapPin
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import type { AdminStats, RevenueData, PopularCourt, AdminBooking } from "@/src/types/admin.types";

// Mock data - ใน production จะดึงจาก API
const mockStats: AdminStats = {
  totalBookings: 1247,
  totalRevenue: 249400,
  totalUsers: 342,
  courtUtilizationRate: 68.5,
  todayBookings: 23,
  todayRevenue: 4600,
  weekBookings: 156,
  weekRevenue: 31200,
  monthBookings: 487,
  monthRevenue: 97400,
};

const mockRevenueData: RevenueData[] = [
  { date: "2024-01-01", revenue: 12000, bookings: 60 },
  { date: "2024-01-02", revenue: 15000, bookings: 75 },
  { date: "2024-01-03", revenue: 18000, bookings: 90 },
  { date: "2024-01-04", revenue: 14000, bookings: 70 },
  { date: "2024-01-05", revenue: 16000, bookings: 80 },
  { date: "2024-01-06", revenue: 20000, bookings: 100 },
  { date: "2024-01-07", revenue: 22000, bookings: 110 },
];

const mockPopularCourts: PopularCourt[] = [
  { courtId: "1", courtName: "คอร์ด 1", bookingCount: 234, revenue: 46800 },
  { courtId: "2", courtName: "คอร์ด 2", bookingCount: 198, revenue: 39600 },
  { courtId: "3", courtName: "คอร์ด 3", bookingCount: 187, revenue: 37400 },
  { courtId: "4", courtName: "คอร์ด VIP", bookingCount: 156, revenue: 46800 },
];

const mockRecentBookings: AdminBooking[] = [
  {
    id: "1",
    courtId: "1",
    courtName: "สนามแบดมินตัน มันตา",
    date: new Date(),
    startTime: "14:00",
    endTime: "15:00",
    courtNumber: "คอร์ด 1",
    totalPrice: 200,
    status: "upcoming",
    bookerName: "สมชาย ใจดี",
    bookerEmail: "somchai@example.com",
    bookerPhone: "0812345678",
    paymentMethod: "promptpay",
    createdAt: new Date(),
  },
  {
    id: "2",
    courtId: "1",
    courtName: "สนามแบดมินตัน มันตา",
    date: new Date(),
    startTime: "15:00",
    endTime: "16:00",
    courtNumber: "คอร์ด 2",
    totalPrice: 200,
    status: "upcoming",
    bookerName: "สมหญิง รักดี",
    bookerEmail: "somying@example.com",
    bookerPhone: "0823456789",
    paymentMethod: "card",
    createdAt: new Date(),
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>(mockStats);
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("today");

  const getTimeRangeStats = () => {
    switch (timeRange) {
      case "today":
        return { bookings: stats.todayBookings, revenue: stats.todayRevenue };
      case "week":
        return { bookings: stats.weekBookings, revenue: stats.weekRevenue };
      case "month":
        return { bookings: stats.monthBookings, revenue: stats.monthRevenue };
    }
  };

  const timeRangeStats = getTimeRangeStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-text-secondary mt-1">ภาพรวมระบบการจองสนามแบดมินตัน</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(["today", "week", "month"] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeRange === range
                ? "bg-primary text-white"
                : "bg-white text-text-secondary hover:bg-background-light"
            }`}
          >
            {range === "today" ? "วันนี้" : range === "week" ? "สัปดาห์นี้" : "เดือนนี้"}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">จำนวนการจอง</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {timeRangeStats.bookings.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">รายการ</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-full">
                <Calendar className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">รายได้รวม</p>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {formatCurrency(timeRangeStats.revenue)}
                </p>
                <p className="text-xs text-green-600 mt-1">บาท</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <DollarSign className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium">จำนวนผู้ใช้</p>
                <p className="text-2xl font-bold text-purple-900 mt-1">
                  {stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-purple-600 mt-1">คน</p>
              </div>
              <div className="p-3 bg-purple-200 rounded-full">
                <Users className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">อัตราการใช้งาน</p>
                <p className="text-2xl font-bold text-orange-900 mt-1">
                  {stats.courtUtilizationRate}%
                </p>
                <p className="text-xs text-orange-600 mt-1">ของสนามทั้งหมด</p>
              </div>
              <div className="p-3 bg-orange-200 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-text mb-4">รายได้ตามช่วงเวลา</h2>
            <div className="space-y-3">
              {mockRevenueData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-sm text-text-secondary">
                    {format(new Date(data.date), "dd MMM", { locale: th })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="h-6 bg-primary rounded"
                        style={{ width: `${(data.revenue / 25000) * 100}%` }}
                      />
                      <span className="text-sm font-medium text-text">
                        {formatCurrency(data.revenue)}
                      </span>
                    </div>
                    <div className="text-xs text-text-secondary">
                      {data.bookings} การจอง
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Courts */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-text mb-4">สนามที่ถูกจองมากที่สุด</h2>
            <div className="space-y-4">
              {mockPopularCourts.map((court) => (
                <div key={court.courtId} className="flex items-center justify-between p-3 bg-background-light rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text">{court.courtName}</p>
                      <p className="text-sm text-text-secondary">
                        {court.bookingCount} การจอง
                      </p>
                    </div>
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
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text">การจองล่าสุด</h2>
            <a href="/admin/bookings" className="text-sm text-primary hover:underline">
              ดูทั้งหมด →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">วันที่/เวลา</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">สนาม</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">ผู้จอง</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">ราคา</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border/50 hover:bg-background-light">
                    <td className="py-3 px-4">
                      <div className="text-sm text-text">
                        {format(booking.date, "dd MMM yyyy", { locale: th })}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {booking.startTime} - {booking.endTime}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-text">{booking.courtName}</div>
                      <div className="text-xs text-text-secondary">{booking.courtNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-text">{booking.bookerName}</div>
                      <div className="text-xs text-text-secondary">{booking.bookerPhone}</div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-text">
                      {formatCurrency(booking.totalPrice)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status === "upcoming"
                          ? "กำลังจะมาถึง"
                          : booking.status === "completed"
                          ? "เสร็จสิ้น"
                          : "ยกเลิก"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Edit,
  Mail,
  Phone
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import type { AdminBooking, BookingFilter } from "@/src/types/admin.types";

// Mock data
const mockBookings: AdminBooking[] = [
  {
    id: "1",
    courtId: "manta-badminton-court",
    courtName: "สนามแบดมินตัน มันตา",
    date: new Date("2024-01-15"),
    startTime: "14:00",
    endTime: "15:00",
    courtNumber: "คอร์ด 1",
    totalPrice: 200,
    status: "upcoming",
    bookerName: "สมชาย ใจดี",
    bookerEmail: "somchai@example.com",
    bookerPhone: "0812345678",
    paymentMethod: "promptpay",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    courtId: "manta-badminton-court",
    courtName: "สนามแบดมินตัน มันตา",
    date: new Date("2024-01-15"),
    startTime: "15:00",
    endTime: "16:00",
    courtNumber: "คอร์ด 2",
    totalPrice: 200,
    status: "upcoming",
    bookerName: "สมหญิง รักดี",
    bookerEmail: "somying@example.com",
    bookerPhone: "0823456789",
    paymentMethod: "card",
    createdAt: new Date("2024-01-11"),
  },
  {
    id: "3",
    courtId: "manta-badminton-court",
    courtName: "สนามแบดมินตัน มันตา",
    date: new Date("2024-01-14"),
    startTime: "16:00",
    endTime: "17:00",
    courtNumber: "คอร์ด 3",
    totalPrice: 200,
    status: "completed",
    bookerName: "วิชัย สุขดี",
    bookerEmail: "wichai@example.com",
    bookerPhone: "0834567890",
    paymentMethod: "promptpay",
    createdAt: new Date("2024-01-08"),
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>(mockBookings);
  const [filter, setFilter] = useState<BookingFilter>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);

  const filteredBookings = bookings.filter((booking) => {
    if (filter.status && booking.status !== filter.status) return false;
    if (filter.courtId && booking.courtId !== filter.courtId) return false;
    if (filter.dateFrom && booking.date < filter.dateFrom) return false;
    if (filter.dateTo && booking.date > filter.dateTo) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        booking.bookerName.toLowerCase().includes(search) ||
        booking.bookerPhone.includes(search) ||
        booking.bookerEmail.toLowerCase().includes(search) ||
        booking.courtName.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const handleStatusChange = (bookingId: string, newStatus: "upcoming" | "completed" | "cancelled") => {
    setBookings(
      bookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    const labels = {
      upcoming: "กำลังจะมาถึง",
      completed: "เสร็จสิ้น",
      cancelled: "ยกเลิก",
    };
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">จัดการการจอง</h1>
        <p className="text-text-secondary mt-1">ดูและจัดการการจองทั้งหมด</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
              <Input
                type="text"
                placeholder="ค้นหาชื่อ, เบอร์โทร, อีเมล, หรือสนาม..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              ตัวกรอง
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">สถานะ</label>
                <select
                  value={filter.status || ""}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      status: e.target.value as "upcoming" | "completed" | "cancelled" | undefined,
                    })
                  }
                  className="w-full px-3 py-2 border border-border rounded-lg bg-white"
                >
                  <option value="">ทั้งหมด</option>
                  <option value="upcoming">กำลังจะมาถึง</option>
                  <option value="completed">เสร็จสิ้น</option>
                  <option value="cancelled">ยกเลิก</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">วันที่เริ่มต้น</label>
                <Input
                  type="date"
                  value={filter.dateFrom ? format(filter.dateFrom, "yyyy-MM-dd") : ""}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      dateFrom: e.target.value ? new Date(e.target.value) : undefined,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">วันที่สิ้นสุด</label>
                <Input
                  type="date"
                  value={filter.dateTo ? format(filter.dateTo, "yyyy-MM-dd") : ""}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      dateTo: e.target.value ? new Date(e.target.value) : undefined,
                    })
                  }
                />
              </div>

              <div className="md:col-span-3 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setFilter({})}
                  className="flex-1"
                >
                  ล้างตัวกรอง
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-light">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">วันที่/เวลา</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">สนาม</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">ผู้จอง</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">ราคา</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">สถานะ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-text-secondary">
                      ไม่พบข้อมูลการจอง
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-border/50 hover:bg-background-light transition-colors"
                    >
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
                        <div className="text-xs text-text-secondary flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {booking.bookerPhone}
                        </div>
                        <div className="text-xs text-text-secondary flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {booking.bookerEmail}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-text">
                        {formatCurrency(booking.totalPrice)}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {booking.status === "upcoming" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(booking.id, "completed")}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="ยืนยันการจอง"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking.id, "cancelled")}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="ยกเลิกการจอง"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="แก้ไข"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              แสดง {filteredBookings.length} จาก {bookings.length} รายการ
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                ก่อนหน้า
              </Button>
              <Button variant="outline" size="sm" disabled>
                ถัดไป
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Search, UserCheck, UserX, Eye, Mail, Phone } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import type { AdminUser } from "@/src/types/admin.types";

// Mock data
const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    phone: "0812345678",
    createdAt: new Date("2024-01-01"),
    totalBookings: 15,
    totalSpent: 3000,
    status: "active",
  },
  {
    id: "2",
    name: "สมหญิง รักดี",
    email: "somying@example.com",
    phone: "0823456789",
    createdAt: new Date("2024-01-05"),
    totalBookings: 8,
    totalSpent: 1600,
    status: "active",
  },
  {
    id: "3",
    name: "วิชัย สุขดี",
    email: "wichai@example.com",
    phone: "0834567890",
    createdAt: new Date("2024-01-10"),
    totalBookings: 0,
    totalSpent: 0,
    status: "banned",
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.phone.includes(search)
    );
  });

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "banned" : "active" }
          : u
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">จัดการผู้ใช้</h1>
        <p className="text-text-secondary mt-1">ดูและจัดการผู้ใช้ทั้งหมด</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
            <Input
              type="text"
              placeholder="ค้นหาชื่อ, อีเมล, หรือเบอร์โทร..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background-light">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">ผู้ใช้</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">วันที่สมัคร</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">จำนวนการจอง</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">ยอดใช้จ่าย</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">สถานะ</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-text-secondary">
                      ไม่พบข้อมูลผู้ใช้
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border/50 hover:bg-background-light transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium text-text">{user.name}</div>
                        <div className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="text-xs text-text-secondary flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-text-secondary">
                        {format(user.createdAt, "dd MMM yyyy", { locale: th })}
                      </td>
                      <td className="py-3 px-4 text-sm text-text">
                        {user.totalBookings} ครั้ง
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-text">
                        {formatCurrency(user.totalSpent)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status === "active" ? "ใช้งาน" : "ถูกแบน"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="ดูประวัติ"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`p-1.5 rounded transition-colors ${
                              user.status === "active"
                                ? "text-red-600 hover:bg-red-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            title={user.status === "active" ? "แบนผู้ใช้" : "ยกเลิกการแบน"}
                          >
                            {user.status === "active" ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
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
              แสดง {filteredUsers.length} จาก {users.length} รายการ
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


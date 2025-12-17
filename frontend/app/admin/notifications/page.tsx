"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus, Send, Bell, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import type { Notification } from "@/src/types/admin.types";

// Mock data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "แจ้งเตือนการปิดสนาม",
    message: "สนามจะปิดให้บริการในวันที่ 20 มกราคม เพื่อทำความสะอาด",
    type: "warning",
    createdAt: new Date("2024-01-15"),
    sentAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "โปรโมชั่นพิเศษ",
    message: "จองสนามวันนี้รับส่วนลด 20%",
    type: "info",
    createdAt: new Date("2024-01-14"),
    sentAt: new Date("2024-01-14"),
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "success" | "error",
  });

  const handleSend = () => {
    if (!formData.title || !formData.message) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      sentAt: new Date(),
    };

    setNotifications([newNotification, ...notifications]);
    setFormData({ title: "", message: "", type: "info" });
    setShowForm(false);
    alert("ส่งการแจ้งเตือนสำเร็จ");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      info: "bg-blue-100 text-blue-700",
      warning: "bg-orange-100 text-orange-700",
      success: "bg-green-100 text-green-700",
      error: "bg-red-100 text-red-700",
    };
    const labels = {
      info: "ข้อมูล",
      warning: "คำเตือน",
      success: "สำเร็จ",
      error: "ข้อผิดพลาด",
    };
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">การแจ้งเตือน</h1>
          <p className="text-text-secondary mt-1">ส่งและจัดการการแจ้งเตือนให้ผู้ใช้</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          ส่งการแจ้งเตือนใหม่
        </Button>
      </div>

      {/* Send Notification Form */}
      {showForm && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-text mb-4">ส่งการแจ้งเตือนใหม่</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  หัวข้อ *
                </label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น แจ้งเตือนการปิดสนาม"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  ข้อความ *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white min-h-[100px]"
                  placeholder="รายละเอียดการแจ้งเตือน..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  ประเภท
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "info" | "warning" | "success" | "error",
                    })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white"
                >
                  <option value="info">ข้อมูล</option>
                  <option value="warning">คำเตือน</option>
                  <option value="success">สำเร็จ</option>
                  <option value="error">ข้อผิดพลาด</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                  ยกเลิก
                </Button>
                <Button onClick={handleSend} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  ส่งการแจ้งเตือน
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            ประวัติการแจ้งเตือน
          </h2>
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              ยังไม่มีการแจ้งเตือน
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 bg-background-light rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(notification.type)}
                      <div>
                        <h3 className="font-semibold text-text">{notification.title}</h3>
                        {getTypeBadge(notification.type)}
                      </div>
                    </div>
                    <div className="text-xs text-text-secondary">
                      {notification.sentAt &&
                        format(notification.sentAt, "dd MMM yyyy HH:mm", { locale: th })}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary mt-2">{notification.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


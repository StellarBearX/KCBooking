"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Save, DollarSign, Clock, Bell, CreditCard } from "lucide-react";
import type { SystemSettings } from "@/src/types/admin.types";

const defaultSettings: SystemSettings = {
  defaultPricePerHour: 200,
  defaultOpeningHours: {
    weekday: { start: 12, end: 24 },
    weekend: { start: 8, end: 22 },
  },
  notificationSettings: {
    emailEnabled: true,
    smsEnabled: false,
    bookingConfirmation: true,
    bookingReminder: true,
    paymentConfirmation: true,
  },
  paymentSettings: {
    promptpayEnabled: true,
    cardEnabled: true,
    promptpayQrCode: "",
  },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Save settings to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">ตั้งค่าระบบ</h1>
        <p className="text-text-secondary mt-1">จัดการการตั้งค่าระบบทั้งหมด</p>
      </div>

      {/* Pricing Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-text">ตั้งค่าราคา</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                ราคาเริ่มต้นต่อชั่วโมง (บาท)
              </label>
              <Input
                type="number"
                min="0"
                value={settings.defaultPricePerHour}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultPricePerHour: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opening Hours Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-text">เวลาเปิด-ปิดเริ่มต้น</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                วันธรรมดา - เปิด
              </label>
              <Input
                type="number"
                min="0"
                max="23"
                value={settings.defaultOpeningHours.weekday.start}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultOpeningHours: {
                      ...settings.defaultOpeningHours,
                      weekday: {
                        ...settings.defaultOpeningHours.weekday,
                        start: parseInt(e.target.value) || 0,
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                วันธรรมดา - ปิด
              </label>
              <Input
                type="number"
                min="0"
                max="23"
                value={settings.defaultOpeningHours.weekday.end}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultOpeningHours: {
                      ...settings.defaultOpeningHours,
                      weekday: {
                        ...settings.defaultOpeningHours.weekday,
                        end: parseInt(e.target.value) || 0,
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                วันหยุด - เปิด
              </label>
              <Input
                type="number"
                min="0"
                max="23"
                value={settings.defaultOpeningHours.weekend.start}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultOpeningHours: {
                      ...settings.defaultOpeningHours,
                      weekend: {
                        ...settings.defaultOpeningHours.weekend,
                        start: parseInt(e.target.value) || 0,
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                วันหยุด - ปิด
              </label>
              <Input
                type="number"
                min="0"
                max="23"
                value={settings.defaultOpeningHours.weekend.end}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultOpeningHours: {
                      ...settings.defaultOpeningHours,
                      weekend: {
                        ...settings.defaultOpeningHours.weekend,
                        end: parseInt(e.target.value) || 0,
                      },
                    },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-text">การแจ้งเตือน</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background-light rounded-lg">
              <div>
                <p className="font-medium text-text">อีเมล</p>
                <p className="text-sm text-text-secondary">ส่งการแจ้งเตือนผ่านอีเมล</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notificationSettings.emailEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notificationSettings: {
                        ...settings.notificationSettings,
                        emailEnabled: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-background-light rounded-lg">
              <div>
                <p className="font-medium text-text">SMS</p>
                <p className="text-sm text-text-secondary">ส่งการแจ้งเตือนผ่าน SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notificationSettings.smsEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notificationSettings: {
                        ...settings.notificationSettings,
                        smsEnabled: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="space-y-2 pl-4 border-l-2 border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text">ยืนยันการจอง</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notificationSettings.bookingConfirmation}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notificationSettings: {
                          ...settings.notificationSettings,
                          bookingConfirmation: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text">แจ้งเตือนก่อนการจอง</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notificationSettings.bookingReminder}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notificationSettings: {
                          ...settings.notificationSettings,
                          bookingReminder: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text">ยืนยันการชำระเงิน</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notificationSettings.paymentConfirmation}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notificationSettings: {
                          ...settings.notificationSettings,
                          paymentConfirmation: e.target.checked,
                        },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-text">การตั้งค่าการชำระเงิน</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background-light rounded-lg">
              <div>
                <p className="font-medium text-text">PromptPay</p>
                <p className="text-sm text-text-secondary">เปิดใช้งานการชำระเงินผ่าน PromptPay</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.paymentSettings.promptpayEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      paymentSettings: {
                        ...settings.paymentSettings,
                        promptpayEnabled: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-background-light rounded-lg">
              <div>
                <p className="font-medium text-text">บัตรเครดิต/เดบิต</p>
                <p className="text-sm text-text-secondary">เปิดใช้งานการชำระเงินด้วยบัตร</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.paymentSettings.cardEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      paymentSettings: {
                        ...settings.paymentSettings,
                        cardEnabled: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {settings.paymentSettings.promptpayEnabled && (
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  QR Code PromptPay (URL)
                </label>
                <Input
                  type="text"
                  value={settings.paymentSettings.promptpayQrCode || ""}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      paymentSettings: {
                        ...settings.paymentSettings,
                        promptpayQrCode: e.target.value,
                      },
                    })
                  }
                  placeholder="https://..."
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {saved ? "บันทึกแล้ว!" : "บันทึกการตั้งค่า"}
        </Button>
      </div>
    </div>
  );
}


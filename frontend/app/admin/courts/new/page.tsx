"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowLeft, Save } from "lucide-react";
import type { Court } from "@/src/types/court.types";

export default function NewCourtPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    pricePerHour: 200,
    lat: 13.7563,
    lng: 100.5018,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save court data
    alert("บันทึกข้อมูลสนามสำเร็จ");
    router.push("/admin/courts");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-background-light rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-text">เพิ่มสนามใหม่</h1>
          <p className="text-text-secondary mt-1">กรอกข้อมูลสนามแบดมินตัน</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-lg font-semibold text-text mb-4">ข้อมูลพื้นฐาน</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    ชื่อสนาม *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="เช่น สนามแบดมินตัน มันตา"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    ที่อยู่ *
                  </label>
                  <Input
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="ที่อยู่เต็มของสนาม"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    คำอธิบาย
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-white min-h-[100px]"
                    placeholder="รายละเอียดเกี่ยวกับสนาม..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    ราคาต่อชั่วโมง (บาท) *
                  </label>
                  <Input
                    type="number"
                    required
                    min="0"
                    value={formData.pricePerHour}
                    onChange={(e) =>
                      setFormData({ ...formData, pricePerHour: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-lg font-semibold text-text mb-4">ตำแหน่ง</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Latitude
                  </label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.lat}
                    onChange={(e) =>
                      setFormData({ ...formData, lat: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Longitude
                  </label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.lng}
                    onChange={(e) =>
                      setFormData({ ...formData, lng: parseFloat(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                ยกเลิก
              </Button>
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                บันทึก
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}


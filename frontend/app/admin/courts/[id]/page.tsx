"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { courtsData } from "@/src/data/courtsData";
import type { Court } from "@/src/types/court.types";

export default function EditCourtPage() {
  const router = useRouter();
  const params = useParams();
  const courtId = params.id as string;
  
  const court = Object.values(courtsData).find((c) => c.id === courtId);
  
  const [formData, setFormData] = useState({
    name: court?.name || "",
    address: court?.address || "",
    description: court?.description || "",
    pricePerHour: court?.pricePerHour || 200,
    lat: court?.location?.lat || 13.7563,
    lng: court?.location?.lng || 100.5018,
  });

  useEffect(() => {
    if (!court) {
      router.push("/admin/courts");
    }
  }, [court, router]);

  if (!court) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Update court data
    alert("อัปเดตข้อมูลสนามสำเร็จ");
    router.push("/admin/courts");
  };

  const handleDelete = () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสนามนี้?")) {
      // TODO: Delete court
      alert("ลบสนามสำเร็จ");
      router.push("/admin/courts");
    }
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
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-text">แก้ไขสนาม</h1>
          <p className="text-text-secondary mt-1">{court.name}</p>
        </div>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          ลบสนาม
        </Button>
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
                บันทึกการเปลี่ยนแปลง
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}


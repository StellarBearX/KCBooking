"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { paymentMethods, mockCourt } from "@/lib/data";
import { formatCurrency, generateBookingId } from "@/lib/utils";
import { CreditCard, QrCode, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/src/contexts/UserContext";

export default function PaymentPage() {
  const router = useRouter();
  const { user } = useUser();
  const [bookerName, setBookerName] = useState(user.name);
  const [bookerPhone, setBookerPhone] = useState(user.phone);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("promptpay");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!bookerName.trim()) {
      alert("กรุณากรอกชื่อ");
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const bookingId = generateBookingId();
      router.push(`/confirmation?bookingId=${bookingId}`);
    }, 1500);
  };

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "credit-card": CreditCard,
    "qr-code": QrCode,
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="container mx-auto px-4 py-4 space-y-4 max-w-md">
        <Card>
          <CardContent className="p-4 space-y-3">
            <div>
              <h2 className="font-semibold text-base mb-1 text-text">{mockCourt.name}</h2>
              <p className="text-sm text-text-secondary">
                20 ต.ค. 2023, 18:00-19:00 (คอร์ด 1)
              </p>
              <p className="text-lg font-bold text-primary mt-3">
                รวม {formatCurrency(mockCourt.pricePerHour)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <UserIcon className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-base text-text">ข้อมูลผู้จอง</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-text">ชื่อ</label>
                <Input
                  placeholder="ชื่อ-นามสกุล"
                  value={bookerName}
                  onChange={(e) => setBookerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-text">
                  อีเมล
                </label>
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-background-light cursor-not-allowed"
                />
                <p className="text-xs text-text-secondary mt-1">
                  อีเมลจากโปรไฟล์ (ไม่สามารถแก้ไขได้)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-text">
                  เบอร์โทรศัพท์
                </label>
                <Input
                  type="tel"
                  value={bookerPhone}
                  onChange={(e) => setBookerPhone(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <h2 className="font-semibold text-base mb-3 text-text">วิธีการชำระเงิน</h2>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const IconComponent = iconMap[method.icon] || CreditCard;
                const isSelected = selectedPaymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border active:border-primary/50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-border"
                      )}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <IconComponent className="h-5 w-5 text-text" />
                    <span className="flex-1 text-left font-medium text-sm text-text">
                      {method.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full"
          size="lg"
          onClick={handlePayment}
          disabled={isProcessing || !bookerName.trim()}
        >
          {isProcessing ? "กำลังประมวลผล..." : "ยืนยันและชำระเงิน"}
        </Button>
      </div>
    </div>
  );
}

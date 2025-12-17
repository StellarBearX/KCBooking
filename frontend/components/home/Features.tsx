import { Zap, Shield, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

const features = [
  {
    icon: Zap,
    title: "รวดเร็ว",
    description: "จองได้ในไม่กี่วินาที ไม่ต้องรอคิว",
  },
  {
    icon: Shield,
    title: "ปลอดภัย",
    description: "ระบบชำระเงินที่ปลอดภัยและเชื่อถือได้",
  },
  {
    icon: Users,
    title: "ใช้งานง่าย",
    description: "อินเทอร์เฟซที่เข้าใจง่าย ใช้งานสะดวก",
  },
  {
    icon: Clock,
    title: "24/7",
    description: "จองได้ตลอด 24 ชั่วโมงทุกวัน",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-text">ทำไมต้องเลือก KCBooking?</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            แพลตฟอร์มจองคอร์ดที่ออกแบบมาเพื่อความสะดวกของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-text">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}


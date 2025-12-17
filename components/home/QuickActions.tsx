"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Calendar, MapPin, Clock, User } from "lucide-react";

const quickActions = [
  {
    id: "book",
    label: "จองคอร์ด",
    icon: Calendar,
    href: "/courts",
    color: "bg-primary text-white",
  },
  {
    id: "my-bookings",
    label: "การจองของฉัน",
    icon: Clock,
    href: "/my-bookings",
    color: "bg-white/80 text-text",
  },
  {
    id: "courts",
    label: "เลือกคอร์ด",
    icon: MapPin,
    href: "/courts",
    color: "bg-white/80 text-text",
  },
  {
    id: "profile",
    label: "โปรไฟล์",
    icon: User,
    href: "/profile",
    color: "bg-white/80 text-text",
  },
];

export default function QuickActions() {
  const router = useRouter();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-text">เมนูด่วน</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Card
              key={action.id}
              className={`${action.color} cursor-pointer active:scale-[0.98] transition-transform border-0 shadow-md`}
              onClick={() => router.push(action.href)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                <div className={`p-3 rounded-lg ${action.id === "book" ? "bg-white/20" : "bg-primary/10"}`}>
                  <IconComponent className={`h-5 w-5 ${action.id === "book" ? "text-white" : "text-primary"}`} />
                </div>
                <span className={`text-sm font-medium ${action.id === "book" ? "text-white" : "text-text"}`}>
                  {action.label}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}


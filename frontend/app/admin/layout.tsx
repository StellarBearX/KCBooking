"use client";

import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  FileText, 
  Settings, 
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const adminMenuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "จัดการการจอง", icon: Calendar },
  { href: "/admin/courts", label: "จัดการสนาม", icon: MapPin },
  { href: "/admin/schedule", label: "จัดการเวลา", icon: Clock },
  { href: "/admin/users", label: "จัดการผู้ใช้", icon: Users },
  { href: "/admin/reports", label: "รายงาน", icon: FileText },
  { href: "/admin/settings", label: "ตั้งค่า", icon: Settings },
  { href: "/admin/notifications", label: "การแจ้งเตือน", icon: Bell },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-bold text-text">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-background-light transition-colors"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-border lg:block">
              <h2 className="text-xl font-bold text-text">KCBooking Admin</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-lg hover:bg-background-light"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-text-secondary hover:bg-background-light hover:text-text"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <button
                onClick={() => router.push("/home")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-background-light hover:text-text transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


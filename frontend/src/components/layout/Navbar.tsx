"use client";

import { usePathname, useRouter } from "next/navigation";
import { Calendar, User, Home, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/src/constants";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === ROUTES.login || pathname === ROUTES.register;

  // Hide navbar on login/register pages
  if (isLoginPage) {
    return null;
  }

  const navItems = [
    { href: ROUTES.home, label: "หน้าแรก", icon: Home },
    { href: ROUTES.courts, label: "เลือกคอร์ด", icon: MapPin },
    { href: ROUTES.myBookings, label: "การจองของฉัน", icon: Calendar },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-md">
          <div className="flex items-center justify-center h-14">
            <button
              onClick={() => router.push(ROUTES.home)}
              className="flex items-center gap-2 text-lg font-bold text-text active:opacity-70"
            >
              <Calendar className="h-5 w-5 text-primary" />
              <span>KCBooking</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-inset-bottom">
        <div className="container mx-auto px-2 max-w-md">
          <div className="relative flex items-center justify-around h-18 py-2">
            {/* Active Indicator Background */}
            <div 
              className="absolute top-0 left-0 h-full bg-primary/5 rounded-t-2xl transition-all duration-300 ease-out"
              style={{
                width: `calc(100% / ${navItems.length + 1})`,
                transform: pathname === ROUTES.home 
                  ? "translateX(0%)" 
                  : pathname === ROUTES.courts
                  ? `translateX(100%)`
                  : pathname === ROUTES.myBookings
                  ? `translateX(200%)`
                  : pathname === ROUTES.profile
                  ? `translateX(300%)`
                  : "translateX(0%)",
              }}
            />
            
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 z-10",
                    isActive
                      ? "text-primary"
                      : "text-text-secondary active:text-primary active:scale-95"
                  )}
                >
                  <div className={cn(
                    "relative transition-all duration-300",
                    isActive && "animate-bounce-subtle"
                  )}>
                    <IconComponent className={cn(
                      "h-6 w-6 transition-all duration-300",
                      isActive && "scale-110"
                    )} />
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </div>
                  <span className={cn(
                    "text-xs font-medium transition-all duration-300",
                    isActive ? "font-semibold" : "font-normal"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => router.push(ROUTES.profile)}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 z-10",
                pathname === ROUTES.profile
                  ? "text-primary"
                  : "text-text-secondary active:text-primary active:scale-95"
              )}
            >
              <div className={cn(
                "relative transition-all duration-300",
                pathname === ROUTES.profile && "animate-bounce-subtle"
              )}>
                <User className={cn(
                  "h-6 w-6 transition-all duration-300",
                  pathname === ROUTES.profile && "scale-110"
                )} />
                {pathname === ROUTES.profile && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                pathname === ROUTES.profile ? "font-semibold" : "font-normal"
              )}>
                บัญชี
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}


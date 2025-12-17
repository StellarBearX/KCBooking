"use client";

import RegisterForm from "@/src/components/features/auth/RegisterForm";
import { UserPlus } from "lucide-react";

export default function RegisterHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-md mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <UserPlus className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-3">
            KCBooking
          </h1>
          <p className="text-white/80 text-base">
            สมัครสมาชิกเพื่อเริ่มจองคอร์ด
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}


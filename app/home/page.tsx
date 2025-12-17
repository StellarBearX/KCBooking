"use client";

import Navbar from "@/components/layout/Navbar";
import UpcomingBooking from "@/components/home/UpcomingBooking";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-30"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 pt-6 max-w-md">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 text-text">สวัสดี, สมชาย</h1>
            <p className="text-sm text-text-secondary">ยินดีต้อนรับกลับมา</p>
          </div>

          {/* Upcoming Booking */}
          <div className="mb-6">
            <UpcomingBooking />
          </div>
        </div>
      </div>
    </main>
  );
}


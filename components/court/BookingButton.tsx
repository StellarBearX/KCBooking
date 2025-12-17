"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Calendar } from "lucide-react";

interface BookingButtonProps {
  courtId: string;
  variant?: "default" | "floating" | "sticky";
  className?: string;
}

export default function BookingButton({
  courtId,
  variant = "default",
  className = "",
}: BookingButtonProps) {
  const router = useRouter();

  const handleBooking = () => {
    router.push("/booking");
  };

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleBooking}
          className="flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-full shadow-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/50"
        >
          <Calendar className="h-6 w-6" />
          <span>จองเลย</span>
        </button>
      </div>
    );
  }

  if (variant === "sticky") {
    return (
      <div className="sticky bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg p-4">
        <Button
          onClick={handleBooking}
          size="lg"
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-6 text-lg shadow-xl"
        >
          <Calendar className="mr-2 h-5 w-5" />
          จองเลย
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleBooking}
      size="lg"
      className={`w-full bg-primary hover:bg-primary-dark text-white font-semibold py-6 text-lg shadow-xl transition-all duration-300 hover:scale-[1.02] ${className}`}
    >
      <Calendar className="mr-2 h-5 w-5" />
      จองเลย
    </Button>
  );
}


"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourtImageCarouselProps {
  images: string[];
}

export default function CourtImageCarousel({
  images,
}: CourtImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-t-xl">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full h-64 md:h-80 relative overflow-hidden"
          >
            <img
              src={image}
              alt={`Court image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}


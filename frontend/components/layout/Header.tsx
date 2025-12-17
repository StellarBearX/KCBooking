"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = true }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center px-4">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-background-light transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="flex-1 text-lg font-semibold text-center">{title}</h1>
        {showBack && <div className="w-10" />}
      </div>
    </header>
  );
}


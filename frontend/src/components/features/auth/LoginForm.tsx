"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/src/constants";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push(ROUTES.home);
    }, 1000);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 h-14"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-12 pr-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 h-14"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-white/70">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary"
          />
          <span>จดจำฉัน</span>
        </label>
        <a
          href="#"
          className="text-white/70 hover:text-white transition-colors"
        >
          ลืมรหัสผ่าน?
        </a>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full bg-white text-text hover:bg-white/90 font-semibold py-5 text-base shadow-xl"
      >
        {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </Button>

      <div className="text-center pt-2">
        <p className="text-white/70 text-sm">
          ยังไม่มีบัญชี?{" "}
          <a
            href={ROUTES.register}
            className="text-white font-medium hover:underline"
          >
            สมัครสมาชิก
          </a>
        </p>
      </div>
    </form>
  );
}


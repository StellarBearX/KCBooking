"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/src/constants";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }
    
    if (!acceptedTerms) {
      alert("กรุณายอมรับข้อกำหนดและเงื่อนไข");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      router.push(ROUTES.home);
    }, 1000);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5">
      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type="text"
            placeholder="ชื่อ-นามสกุล"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="pl-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 h-14"
          />
        </div>

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
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="ยืนยันรหัสผ่าน"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="pl-12 pr-12 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 h-14"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="w-4 h-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary mt-1"
        />
        <label htmlFor="terms" className="text-white/70 text-sm">
          ฉันยอมรับ{" "}
          <Link href={ROUTES.terms} className="text-white font-medium hover:underline">
            ข้อกำหนดและเงื่อนไข
          </Link>
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full bg-white text-text hover:bg-white/90 font-semibold py-5 text-base shadow-xl"
      >
        {isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
      </Button>

      <div className="text-center pt-2">
        <p className="text-white/70 text-sm">
          มีบัญชีอยู่แล้ว?{" "}
          <Link href={ROUTES.login} className="text-white font-medium hover:underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </form>
  );
}


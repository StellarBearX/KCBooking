import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-text text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KCBooking</h3>
            <p className="text-white/70 text-sm">
              แพลตฟอร์มจองคอร์ดแบดมินตันที่ทันสมัยและใช้งานง่าย
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">เมนู</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="/home" className="hover:text-white transition-colors">
                  หน้าแรก
                </a>
              </li>
              <li>
                <a href="/courts" className="hover:text-white transition-colors">
                  เลือกคอร์ด
                </a>
              </li>
              <li>
                <a href="/my-bookings" className="hover:text-white transition-colors">
                  การจองของฉัน
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">ติดต่อเรา</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@kcbooking.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">ติดตามเรา</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
          <p>&copy; 2024 KCBooking. สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  );
}


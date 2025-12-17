"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-text hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>กลับ</span>
        </button>

        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-6">ข้อกำหนดและเงื่อนไขการใช้งาน</h1>
            
            <div className="space-y-6 text-text-secondary leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-text mb-3">1. การยอมรับข้อกำหนด</h2>
                <p>
                  โดยการเข้าถึงและใช้บริการ KCBooking คุณยอมรับที่จะผูกพันกับข้อกำหนดและเงื่อนไขเหล่านี้ 
                  หากคุณไม่เห็นด้วยกับข้อกำหนดใดๆ กรุณาอย่าใช้บริการของเรา
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text mb-3">2. การใช้งานบริการ</h2>
                <p className="mb-2">2.1 คุณต้องมีอายุ 18 ปีขึ้นไป หรือได้รับอนุญาตจากผู้ปกครองในการใช้บริการ</p>
                <p className="mb-2">2.2 คุณต้องให้ข้อมูลที่ถูกต้องและเป็นจริงในการสมัครสมาชิก</p>
                <p>2.3 คุณต้องรับผิดชอบในการรักษาความปลอดภัยของบัญชีและรหัสผ่านของคุณ</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text mb-3">3. การจองคอร์ด</h2>
                <p className="mb-2">3.1 การจองคอร์ดจะถือว่าเสร็จสมบูรณ์เมื่อชำระเงินเรียบร้อยแล้ว</p>
                <p className="mb-2">3.2 คุณสามารถยกเลิกการจองได้ก่อนเวลาเริ่มต้น 24 ชั่วโมง</p>
                <p className="mb-2">3.3 การยกเลิกการจองภายใน 24 ชั่วโมงก่อนเวลาเริ่มต้น อาจไม่ได้รับเงินคืน</p>
                <p>3.4 การไม่มาสมทันเวลาที่จองไว้ อาจถูกหักเงินค่าจอง</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text mb-3">4. การชำระเงิน</h2>
                <p className="mb-2">4.1 ราคาที่แสดงเป็นราคาต่อชั่วโมง</p>
                <p className="mb-2">4.2 การชำระเงินสามารถทำได้ผ่าน Credit/Debit Card หรือ QR PromptPay</p>
                <p>4.3 หลังจากชำระเงินแล้ว คุณจะได้รับ QR Code สำหรับเข้าใช้คอร์ด</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text mb-3">5. การคืนเงิน</h2>
                <p className="mb-2">5.1 การคืนเงินจะพิจารณาตามเงื่อนไขการยกเลิกที่ระบุไว้</p>
                <p className="mb-2">5.2 เงินจะถูกคืนเข้าบัญชีภายใน 3-5 วันทำการ</p>
                <p>5.3 กรณีที่เกิดจากความผิดพลาดของระบบ เราจะคืนเงินเต็มจำนวนให้คุณ</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text mb-3">6. ความรับผิดชอบ</h2>
                <p className="mb-2">6.1 KCBooking ไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้งานคอร์ด</p>
                <p className="mb-2">6.2 คุณต้องปฏิบัติตามกฎระเบียบของสถานที่ที่จอง</p>
                <p>6.3 คุณต้องรับผิดชอบต่อความเสียหายที่เกิดขึ้นกับอุปกรณ์หรือสถานที่</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text mb-3">7. การยกเลิกบัญชี</h2>
                <p className="mb-2">7.1 คุณสามารถยกเลิกบัญชีได้ตลอดเวลา</p>
                <p>7.2 เราสามารถระงับหรือยกเลิกบัญชีของคุณได้หากพบการกระทำที่ผิดกฎหมายหรือละเมิดข้อกำหนด</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text mb-3">8. การเปลี่ยนแปลงข้อกำหนด</h2>
                <p>
                  เราขอสงวนสิทธิ์ในการแก้ไขข้อกำหนดและเงื่อนไขนี้ได้ตลอดเวลา 
                  การเปลี่ยนแปลงจะมีผลทันทีหลังจากประกาศบนเว็บไซต์
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text mb-3">9. ติดต่อเรา</h2>
                <p>
                  หากคุณมีคำถามเกี่ยวกับข้อกำหนดและเงื่อนไขนี้ 
                  กรุณาติดต่อเราที่ info@kcbooking.com หรือ 02-123-4567
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-muted">
                อัปเดตล่าสุด: {new Date().toLocaleDateString("th-TH", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


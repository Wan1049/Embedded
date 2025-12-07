// app/about/page.tsx หรือ pages/about.tsx
"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          เกี่ยวกับเรา
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-12">
          ยินดีต้อนรับสู่ <span className="font-semibold">Super CCTV ProMax Plus</span> – โซลูชันการเฝ้าระวังอัจฉริยะของคุณ เรามุ่งมั่นให้บริการระบบเฝ้าระวังที่เชื่อถือได้ มีนวัตกรรม และตรวจสอบแบบเรียลไทม์ สำหรับบ้าน สำนักงาน หรือโรงงานของคุณ
        </p>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">เรื่องราวของเรา</h2>
          <p className="text-gray-700 leading-relaxed">
            ก่อตั้งในปี 2025 Super CCTV ProMax Plus ผสานระบบฝังตัว เซนเซอร์อัจฉริยะ และอัลกอริทึม AI ขั้นสูง เพื่อให้บริการระบบเฝ้าระวังที่ราบรื่นและมีประสิทธิภาพ เรามุ่งมั่นที่จะสร้างนวัตกรรมและทำให้การเฝ้าระวังง่ายขึ้นสำหรับทุกคน
          </p>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">ทีมงานของเรา</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition-shadow">
              <Image
                src="/sanu.jpg" // เปลี่ยนเป็นรูปจริง
                alt="สมาชิกทีม"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg text-gray-600">ศาณุ จรัสวราพรรณ</h3>
              <p className="text-gray-500">CEO & ผู้ก่อตั้ง</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition-shadow">
              <Image
                src="/porkuang.jpg"
                alt="สมาชิกทีม"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg text-gray-600">วงศ์วริศ โรจนสารัมภกิจ</h3>
              <p className="text-gray-500">หัวหน้าวิศวกร</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition-shadow">
              <Image
                src="/wan.jpg"
                alt="สมาชิกทีม"
                width={120}
                height={120}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg text-gray-600">ณชพล สุวินทรากร</h3>
              <p className="text-gray-500">นักออกแบบผลิตภัณฑ์</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">ติดต่อเรา</h2>
          <p className="text-gray-700 mb-6">
            มีคำถามหรือต้องการร่วมงานกับเรา ติดต่อได้เลย!
          </p>
          <a
            href="mailto:contact@supercctvpromaxplus.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            ติดต่อเรา
          </a>
        </section>
      </div>
    </div>
  );
}
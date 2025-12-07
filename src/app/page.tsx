import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-black">Super CCTV ProMax Plus</h1>
        <p className="text-lg text-gray-700 mb-8">
          ระบบกล้องอัจฉริยะ พร้อมฟีเจอร์ตรวจจับต่าง ๆ
          แบบ Real-time และ สามารถควบคุมการหมุนกล้องได้
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-2xl shadow hover:bg-blue-50 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}

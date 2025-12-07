"use client";

import { useState, useEffect } from "react";

interface SensorRecord {
  createdAt: string;
  cameraImage: string;
}

export default function History() {
  const [frames, setFrames] = useState<SensorRecord[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewX, setPreviewX] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [hoveringSlider, setHoveringSlider] = useState(false);
  const [hoveringPreview, setHoveringPreview] = useState(false);




  // === Load frames once ===
  const loadFrames = async () => {
    const res = await fetch(
      "https://supercctvpromaxplus.onrender.com/api/v1/sensors/"
    );
    const json = await res.json();

    const list: SensorRecord[] = json.data
      .filter((item: any) => item.cameraImage)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    setFrames(list);
  };

  useEffect(() => {
    loadFrames();
  }, []);

  // === Play animation ===
  useEffect(() => {
    if (!playing || frames.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev >= frames.length - 1 ? 0 : prev + 1));
    }, 100); // 10FPS

    return () => clearInterval(timer);
  }, [playing, frames]);

  if (frames.length === 0) return <div>Loading…</div>;

  // === Find index by time offset ===
  const jumpSeconds = (sec: number) => {
    const currentTime = new Date(frames[index].createdAt).getTime();
    const target = currentTime + sec * 1000;

    // หา frame ใกล้ที่สุด
    const closest = frames.reduce((prev, curr, i) => {
      const diffPrev = Math.abs(
        new Date(prev.createdAt).getTime() - target
      );
      const diffCurr = Math.abs(
        new Date(curr.createdAt).getTime() - target
      );
      return diffCurr < diffPrev ? curr : prev;
    });

    setIndex(frames.indexOf(closest));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Replay (1 ชั่วโมง)</h1>

      {/* Main video frame */}
      <img
        src={`data:image/jpeg;base64,${frames[index].cameraImage}`}
        className="w-[500px] border rounded"
        alt="main"
      />

      {/* Time */}
      <p className="mt-2 font-medium">
        เวลา: {new Date(frames[index].createdAt).toLocaleTimeString()}
      </p>

      {/* Controls */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => jumpSeconds(-10)}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
        >
          ⏪ -10s
        </button>

        <button
          onClick={() => setPlaying((p) => !p)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
        >
          {playing ? "Pause" : "Play"}
        </button>

        <button
          onClick={() => jumpSeconds(10)}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black text-black"
        >
          +10s ⏩
        </button>
      </div>

      {/* Slider + preview */}
      <div className="mt-4 relative">
        <div
            className="relative w-[500px]"
            onMouseEnter={() => setHoveringSlider(true)}
            onMouseLeave={() => setHoveringSlider(false)}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                let x = e.clientX - rect.left;

                const previewWidth = 160; // ครึ่ง width ของ preview
                if (x < previewWidth / 2) x = previewWidth / 2;
                if (x > rect.width - previewWidth / 2) x = rect.width - previewWidth / 2;
                setPreviewX(x);

                const ratio = x / rect.width;
                const i = Math.floor(ratio * frames.length);
                setPreviewIndex(i);
            }}
            onClick={() => {
                if (previewIndex !== null) setIndex(previewIndex);
            }}
        >

            {/* Slider */}
            <input
            type="range"
            min={0}
            max={frames.length - 1}
            value={index}
            readOnly
            className="w-full"
            />

            {/* Preview box */}
            {previewIndex !== null && hoveringSlider && (
            <div
                className="absolute -top-40 p-2 bg-white border rounded shadow pointer-events-none"
                style={{ left: previewX - 80 }}
            >
                <img
                src={`data:image/jpeg;base64,${frames[previewIndex].cameraImage}`}
                className="w-40"
                alt="preview"
                />
                <p className="text-center text-sm mt-1 text-black">
                {new Date(frames[previewIndex].createdAt).toLocaleTimeString()}
                </p>
            </div>
            )}


            </div>
        </div>

    </div>
  );
}
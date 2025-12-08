"use client";

import { useEffect, useState } from "react";
import SensorCard from "./SensorCard";
import SensorChart from "./SensorChart";
import { SensorData, ApiResponse } from "@/model/sensor";
import Link from "next/link";

export default function Dashboard() {
  const [sensor, setSensor] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<SensorData[]>([]);
  const [cameraUrl, setCameraUrl] = useState<string>("");
  const [servo, setServo] = useState(180);       // ← ย้ายขึ้นมาที่นี่

  // --- Send servo degree ---
  const sendDegree = async (deg: number) => {
    const fixed = Math.min(360, Math.max(0, deg)); // limit 0–180
    setServo(fixed);

    try {
      await fetch(
        "https://supercctvpromaxplus.onrender.com/api/v1/servo/rotate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ degree: fixed }),
        }
      );
    } catch (err) {
      console.error("Servo send error:", err);
    }
  };

  // --- Fetch Sensor Data every 0.5s ---
  useEffect(() => {
    const fetchSensor = async () => {
      try {
        const res = await fetch(
          "https://supercctvpromaxplus.onrender.com/api/v1/sensors/lastest",
          { cache: "no-store" }
        );

        const json: ApiResponse = await res.json();
        const d = json.data.data;

        const newSensor: SensorData = {
          time: d.time,
          flame: d.flame,
          light: d.light,
          vibration: d.vibration,
          temp: d.temp,
          obs: d.obs,
          cameraImage: "",
        };

        setSensor(newSensor);

        setHistory((prev) => {
          const list = [...prev, newSensor];
          if (list.length > 20) list.shift();
          return list;
        });
      } catch (error) {
        console.error("Sensor fetch error:", error);
      }
    };

    const interval = setInterval(fetchSensor, 500);
    return () => clearInterval(interval);
  }, []);

  // --- Fetch Camera every 200ms ---
  useEffect(() => {
    const fetchCamera = async () => {
      try {
        const res = await fetch(
          "https://supercctvpromaxplus.onrender.com/api/v1/sensors/camera",
          { cache: "no-store" }
        );
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setCameraUrl(url);
      } catch (err) {
        console.error("Camera fetch error:", err);
      }
    };

    const interval = setInterval(fetchCamera, 200);
    return () => clearInterval(interval);
  }, []);

  if (!sensor) return <div className="p-6">Connecting...</div>;

  const date = new Date(Number(sensor.time) * 1000);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black">
        Embedded Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SensorCard title="Flame" value={sensor.flame} />
        <SensorCard title="Light" value={sensor.light} />
        <SensorCard title="Vibration" value={sensor.vibration} />
        <SensorCard title="Temperature" value={sensor.temp} />
        <SensorCard title="Obstacle" value={sensor.obs} />
      </div>

      <div className="flex items-start justify-between mt-6">
        {/* Camera */}
        {cameraUrl && (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-black">Camera</h2>
            <img src={cameraUrl} className="rounded shadow w-72" alt="Camera" />
          </div>
        )}

        {/* Servo Control */}
        <div className="mt-10 p-4 bg-white rounded shadow max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Servo Motor Control
        </h2>

        <div className="mt-4 flex justify-between w-full">
          <button
            onClick={() => sendDegree(-1)}
            className="px-8 py-2 text-xl bg-gray-200 rounded hover:bg-gray-300 text-black"
          >
            {"⬅"}
          </button>

          <button
            onClick={() => sendDegree(1)}
            className="px-8 py-2 text-xl bg-gray-200 rounded hover:bg-gray-300 text-black"
          >
            {"⮕"}
          </button>
        </div>
      </div>



      </div>

      <div className="mt-10">
        <Link
            href="/replay"
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
          >
            Replay System
          </Link>
      </div>
    </div>
  );
}

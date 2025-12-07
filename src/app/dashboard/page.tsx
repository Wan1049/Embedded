"use client";

import { useEffect, useState } from "react";
import SensorCard from "./SensorCard";
import SensorChart from "./SensorChart";
import { SensorData, ApiResponse } from "@/model/sensor";

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

          <label className="text-black font-medium">Rotate (0° - 360°)</label>
          <input
            type="range"
            min={0}
            max={360}
            value={servo}
            onChange={(e) => sendDegree(Number(e.target.value))}
            className="w-full mt-2"
          />

          <p className="mt-2 text-black text-center font-semibold">
            {servo}°
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button
              onClick={() => sendDegree(servo - 15)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
            >
              - 15°
            </button>
            <button
              onClick={() => sendDegree(180)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
            >
              Reset
            </button>
            <button
              onClick={() => sendDegree(servo + 15)}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
            >
              + 15°
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2 text-black">
          Flame Sensor Graph
        </h2>
        <SensorChart data={history} dataKey="flame" />
      </div>
    </div>
  );
}

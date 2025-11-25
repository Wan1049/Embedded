"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SensorChart({ data, dataKey } : {data : Array<any>; dataKey : string;}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={false} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

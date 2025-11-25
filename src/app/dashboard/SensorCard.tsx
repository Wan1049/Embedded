export default function SensorCard({ title, value,}: { title: string; value: number | string;}
) {
  return (
    <div className="bg-white shadow rounded-xl p-4 text-black">
      <h2 className="text-gray-600">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}


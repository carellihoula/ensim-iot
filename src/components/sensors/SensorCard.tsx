import { BellRing } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Measurement {
  value: number;
  measure: string;
  date: string;
}

interface SensorProps {
  name: string;
  data: Record<string, Measurement[]>;
}

export default function SensorCard({ name, data }: SensorProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <div className="space-y-3">
        {Object.entries(data).map(([measure, values]) => (
          <div
            key={measure}
            className="flex items-center space-x-4 rounded-md border p-4"
          >
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-lg font-medium leading-none">{measure}</p>
              <p className="text-sm text-gray-500">
                Dernière valeur : {values[values.length - 1]?.value}
              </p>
            </div>
            <Switch />
          </div>
        ))}
      </div>
    </div>
  );
}

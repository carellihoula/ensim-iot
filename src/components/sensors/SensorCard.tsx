import { BellRing } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Sensor } from "../types/sensorTypes";

export default function SensorCard({ payload }: Sensor) {
  return (
    <div className="border p-4 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">{payload.name}</h2>
      <div className="space-y-3">
        {Object.entries(payload.data).map(([measure, values]) => (
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

import { BellRing } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Sensor } from "../types/sensorTypes";

export default function SensorCard({ payload }: Sensor) {
  return (
    <div className=" p-4 rounded-lg  w-full">
      <div className="space-y-3">
        {Object.entries(payload.data).map(([measure, values]) => (
          <div
            key={measure}
            className="flex items-center space-x-4 rounded-md border p-4"
          >
            <BellRing />
            <div className="flex-1 space-y-1 w-full">
              <p className="text-lg font-medium leading-none">{measure}</p>
            </div>
            <Switch />
          </div>
        ))}
      </div>
    </div>
  );
}

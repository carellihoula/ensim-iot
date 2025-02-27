import { BellRing } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Sensor } from "../types/sensorTypes";
import { useSensors } from "@/context/SensorContext";

interface SensorCardProps {
  sensor: Sensor;
  sensorId: string;
}

export default function SensorCard({ sensor, sensorId }: SensorCardProps) {
  const { toggleMeasurement, disabledMeasurements } = useSensors();
  return (
    <div className=" p-4 rounded-lg  w-full">
      <div className="space-y-3">
        {Object.entries(sensor.payload.data).map(([measure, values]) => (
          <div
            key={measure}
            className="flex items-center space-x-4 rounded-md border p-4"
          >
            <BellRing />
            <div className="flex-1 space-y-1 w-full">
              <p className="text-lg font-medium leading-none">{measure}</p>
            </div>
            <Switch
              checked={!disabledMeasurements[sensorId]?.has(measure)}
              onCheckedChange={() => toggleMeasurement(sensorId, measure)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import { fakeData } from "@/lib/fakeData";
import SensorCard from "./SensorCard";

export default function Sensorshandler() {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {fakeData.sensors.map((sensor, index) => (
          <SensorCard
            key={index}
            name={sensor.payload.name}
            data={sensor.payload.data}
          />
        ))}
      </div>
    </div>
  );
}

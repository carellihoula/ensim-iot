import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
//import { Sensors } from "@/components/types/sensorTypes";
import { fakeData } from "@/lib/fakeData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Function to transform data into a format compatible with Recharts
const transformData = (sensorData: any) => {
  const transformedData: { [key: string]: any } = {};

  Object.entries(sensorData).forEach(([measure, values]) => {
    (values as { date: string; value: number }[]).forEach((value) => {
      const date = new Date(value.date).toLocaleTimeString(); // Convert date to  Date Object
      if (!transformedData[date]) {
        transformedData[date] = { date };
      }
      transformedData[date][measure] = value.value;
    });
  });

  return Object.values(transformedData);
};

const SensorChart = () => {
  const [selectedSensor, setSelectedSensor] = useState(
    fakeData.sensors[0].payload.id_sensor
  ); // Select the first sensor by default

  // Find the sensor that is selected.
  const selectedSensorData = fakeData.sensors.find(
    (sensor) => sensor.payload.id_sensor === selectedSensor
  )?.payload;

  // Transform selected sensor data
  const data = selectedSensorData ? transformData(selectedSensorData.data) : [];

  return (
    <div className="flex flex-col items-center lg:gap-6">
      {/* Sensor selector */}
      <div className="flex items-center font-bold mb-4 ">
        <label
          htmlFor="sensor-select"
          style={{ marginRight: "10px" }}
          className="hidden sm:flex"
        >
          Choisir un capteur :
        </label>
        <Select
          value={selectedSensor}
          onValueChange={(value) => setSelectedSensor(value)}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Sélectionnez un capteur" />
          </SelectTrigger>
          <SelectContent>
            {fakeData.sensors.map((sensor) => (
              <SelectItem
                key={sensor.payload.id_sensor}
                value={sensor.payload.id_sensor || ""}
              >
                {sensor.payload.name} ({sensor.payload.id_sensor})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sensor Graphic */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedSensorData &&
            Object.keys(selectedSensorData.data).map((measure) => (
              <Line
                key={measure}
                type="monotone"
                dataKey={measure}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} //Random color
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;

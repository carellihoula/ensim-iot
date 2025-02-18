"use client";

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
import { fakeData } from "@/lib/fakeData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateRangePicker from "./DateRangePicker";

// Transform sensor data to a format compatible with Recharts,
// including the full date (date + time) and a timestamp for filtering.
const transformData = (sensorData: any) => {
  const transformedData: { [key: string]: any } = {};

  Object.entries(sensorData).forEach(([measure, values]) => {
    (values as { date: string; value: number }[]).forEach((value) => {
      const dateObj = new Date(value.date);
      // Get the full date & time string (e.g. "MM/DD/YYYY, HH:MM:SS")
      const dateStr = dateObj.toLocaleString();
      if (!transformedData[dateStr]) {
        transformedData[dateStr] = {
          date: dateStr,
          timestamp: dateObj.getTime(),
        };
      }
      transformedData[dateStr][measure] = value.value;
    });
  });

  const dataArray = Object.values(transformedData);
  // Sort the data by timestamp to ensure proper order in the chart.
  dataArray.sort((a: any, b: any) => a.timestamp - b.timestamp);
  return dataArray;
};

const SensorChart = () => {
  // State for selecting a sensor.
  const [selectedSensor, setSelectedSensor] = useState(
    fakeData.sensors[0].payload.id_sensor
  );
  // States for date range filtering.
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Retrieve the selected sensor's payload.
  const selectedSensorData = fakeData.sensors.find(
    (sensor) => sensor.payload.id_sensor === selectedSensor
  )?.payload;

  // Transform sensor data if available.
  const data = selectedSensorData ? transformData(selectedSensorData.data) : [];

  // Filter data based on the selected start and end dates.
  const filteredData = data.filter((d: any) => {
    const tsDate = new Date(d.timestamp).setHours(0, 0, 0, 0); // Met l'heure à 00:00:00 pour ignorer l'heure
    const startTs = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const endTs = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null; // Met l'heure max pour inclure toute la journée

    if (startTs && tsDate < startTs) return false; // Inclut bien le jour sélectionné
    if (endTs && tsDate > endTs) return false; // Inclut aussi le dernier jour
    return true;
  });

  return (
    <div className="flex flex-col items-center lg:gap-6">
      {/* Sensor selector */}
      <div className="flex items-center font-bold mb-4">
        <label htmlFor="sensor-select" className="hidden sm:flex mr-2">
          Choisir un dispositif :
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
      {/* Date range filters */}

      <DateRangePicker
        endDate={endDate}
        startDate={startDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />
      {/* Sensor Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedSensorData &&
            Object.keys(selectedSensorData.data).map((measure) => (
              <Line
                key={measure}
                type="monotone"
                dataKey={measure}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each line
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;

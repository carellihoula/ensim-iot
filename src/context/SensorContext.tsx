"use client";

import { Sensor } from "@/components/types/sensorTypes";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SensorContextType {
  dataFromSensors: Sensor[];
  latestSensorData: Record<string, Record<string, number>>; // Latest values per sensor & measurement type
  loading: boolean;
  disabledMeasurements: Record<string, Set<string>>;
  toggleMeasurement: (sensorId: string, measurement: string) => void;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export const useSensors = (): SensorContextType => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error("useSensors must be used within a SensorProvider");
  }
  return context;
};

interface SensorProviderProps {
  children: ReactNode;
  userId: string;
}

export const SensorProvider = ({ children, userId }: SensorProviderProps) => {
  const [dataFromSensors, setDataFromSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [latestSensorData, setLatestSensorData] = useState<
    Record<string, Record<string, number>>
  >({});

  const [disabledMeasurements, setDisabledMeasurements] = useState<
    Record<string, Set<string>>
  >({});

  // Load disabled measurements from localStorage
  useEffect(() => {
    const storedDisabledMeasurements = localStorage.getItem(
      "disabledMeasurements"
    );
    if (storedDisabledMeasurements) {
      try {
        const parsed = JSON.parse(storedDisabledMeasurements);

        if (typeof parsed === "object" && parsed !== null) {
          const converted = Object.fromEntries(
            Object.entries(parsed).map(([key, value]) => [
              key,
              new Set(Array.isArray(value) ? value : []), // Ensure value is an array before using new Set()
            ])
          );

          setDisabledMeasurements(converted);
        }
      } catch (error) {
        console.error(
          "Failed to parse disabledMeasurements from localStorage:",
          error
        );
        setDisabledMeasurements({});
      }
    }
  }, []);

  // Toggle function to enable/disable measurements
  const toggleMeasurement = (sensorId: string, measurement: string) => {
    setDisabledMeasurements((prev) => {
      const updated = new Set(prev[sensorId] || []);
      if (updated.has(measurement)) {
        updated.delete(measurement);
      } else {
        updated.add(measurement);
      }
      const newState = { ...prev, [sensorId]: updated };
      // Convert Sets to arrays before saving in localStorage
      const serializableState = Object.fromEntries(
        Object.entries(newState).map(([key, value]) => [key, Array.from(value)])
      );

      localStorage.setItem(
        "disabledMeasurements",
        JSON.stringify(serializableState)
      );
      return newState;
    });
  };

  useEffect(() => {
    if (!userId) return;

    const socket: Socket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    const controller = new AbortController();

    socket.emit("subscribeToSensors", userId);

    socket.on("sensorData", (data: Sensor[]) => {
      setDataFromSensors(data);
      const latestDataUpdate: Record<string, Record<string, number>> = {};

      data.forEach((sensor) => {
        if (!latestDataUpdate[sensor.sensor_id!]) {
          latestDataUpdate[sensor.sensor_id!] = {};
        }
        Object.entries(sensor.payload.data).forEach(([key, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            latestDataUpdate[sensor.sensor_id!][key] =
              values[values.length - 1].value; // Last value of each measurement type
          }
        });
      });

      setLatestSensorData((prevLatest) => ({
        ...prevLatest,
        ...latestDataUpdate,
      }));

      setLoading(false);
    });

    return () => {
      socket.off("sensorData");
      socket.disconnect();
      controller.abort();
    };
  }, [userId]);

  return (
    <SensorContext.Provider
      value={{
        dataFromSensors,
        latestSensorData,
        loading,
        disabledMeasurements,
        toggleMeasurement,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};

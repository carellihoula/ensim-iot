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
  loading: boolean;
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
      setLoading(false);
    });

    return () => {
      socket.off("sensorData");
      socket.disconnect();
      controller.abort();
    };
  }, [userId]);

  return (
    <SensorContext.Provider value={{ dataFromSensors, loading }}>
      {children}
    </SensorContext.Provider>
  );
};

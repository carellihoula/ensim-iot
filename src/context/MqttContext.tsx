"use client";

import { Sensor } from "@/components/types/sensorTypes";
import { mqttConfig } from "@/lib/mqttBrokerInfo";
import mqtt, { MqttClient } from "mqtt";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Type du contexte MQTT
interface MQTTContextType {
  sensors: Record<string, Sensor>; // Stocke les capteurs sous forme de dictionnaire { sensor_id: Sensor }
  connectionStatus: "connected" | "disconnected" | "connecting";
  error: string | null;
}

// Création du contexte MQTT
const MQTTContext = createContext<MQTTContextType | undefined>(undefined);

export const MQTTProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sensors, setSensors] = useState<Record<string, Sensor>>({});
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("disconnected");

  useEffect(() => {
    if (
      !mqttConfig.mqttUrl ||
      !mqttConfig.mqttUsername ||
      !mqttConfig.mqttPassword
    ) {
      console.error("Missing MQTT configuration values.");
      return;
    }

    const client: MqttClient = mqtt.connect(mqttConfig.mqttUrl, {
      username: mqttConfig.mqttUsername,
      password: mqttConfig.mqttPassword,
      rejectUnauthorized: true,
    });
    const userId = "67b732a537407678e6b6d1d2";
    const topic = `iotensim/${userId}/data`;

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      setConnectionStatus("connected");
      setError(null);
      client.subscribe(topic, (err: Error | null) => {
        if (err) console.error("Failed to subscribe to topic:", err);
        else console.log("Subscribed to topic:", topic);
      });
    });

    client.on("error", (err) => {
      console.error("MQTT connection error:", err);
      setError(`Connection error: ${err.message}`);
      setConnectionStatus("disconnected");
    });

    client.on("offline", () => {
      console.log("MQTT client offline");
      setConnectionStatus("disconnected");
    });

    client.on("message", (_topic: string, message: Buffer) => {
      try {
        const sensorData: Sensor = JSON.parse(message.toString());

        if (!sensorData || !sensorData.sensor_id) {
          console.error("Invalid sensor data:", sensorData);
          return;
        }

        // Mettre à jour uniquement la dernière valeur des grandeurs mesurées
        setSensors((prevSensors) => ({
          ...prevSensors,
          [String(sensorData.sensor_id)]: {
            ...(sensorData.sensor_id ? prevSensors[sensorData.sensor_id] : {}), // Garde les autres infos du capteur
            ...sensorData, // Remplace les données par la nouvelle réceptionnée
          },
        }));
      } catch (err) {
        console.error("Failed to parse MQTT message:", err);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <MQTTContext.Provider value={{ sensors, connectionStatus, error }}>
      {children}
    </MQTTContext.Provider>
  );
};

// Hook pour accéder au contexte MQTT
export const useMQTTContext = (): MQTTContextType => {
  const context = useContext(MQTTContext);
  if (!context) {
    throw new Error("useMQTTContext must be used within an MQTTProvider");
  }
  return context;
};

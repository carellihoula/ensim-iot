"use client";

import { Sensor } from "@/components/types/sensorTypes";
import { mqttConfig } from "@/lib/mqttBrokerInfo";
import { Buffer } from "buffer"; // Nécessaire si 'Buffer' est utilisé
import mqtt, { MqttClient } from "mqtt";
import { env } from "process";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
//import { validateSensorData } from "../utils/validateSensorData";

// Types pour les données des capteurs

// Types du contexte MQTT
interface MQTTContextType {
  sensors: Sensor[]; // Liste des capteurs
  connectionStatus: "connected" | "disconnected" | "connecting";
  error: string | null;
}

// Créer le contexte MQTT
const MQTTContext = createContext<MQTTContextType | undefined>(undefined);

export const MQTTProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("disconnected");

  useEffect(() => {
    //console.log(mqttPassword);

    if (
      !mqttConfig.mqttUrl ||
      !mqttConfig.mqttUsername ||
      !mqttConfig.mqttPassword
    ) {
      console.error("Missing MQTT configuration values.");
      return;
    }
    mqttConfig.mqttUsername;
    const client: MqttClient = mqtt.connect(mqttConfig.mqttUrl, {
      username: mqttConfig.mqttUsername,
      password: mqttConfig.mqttPassword,
      rejectUnauthorized: true, // Vérifie la validité du certificat
    });

    // S'abonner au topic spécifique à l'utilisateur
    //const topic = `iotensim/${import.meta.env.VITE_CURRENT_USER_ID}/data`;
    const topic = `esp32/frontend/data`;
    //const topic = `esp32/frontend/data`;

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

    // Traiter les messages reçus
    client.on("message", (_topic: string, message: Buffer) => {
      try {
        const sensorData: Sensor = JSON.parse(message.toString());
        console.log(message.toString());
        if (!sensorData) {
          setError(
            `Le JSON reçu est invalide. Format recommandé : {"id":"string","name":"string","owner_id":"string","data":{"field1":number,"field2":number,...}}`
          );
          console.log(error);
          return;
        }

        // Si le JSON est valide, mettre à jour les capteurs
        setError(null);
        setSensors((prevSensors) => {
          const sensorIndex = prevSensors.findIndex(
            (sensor) => sensor.sensor_id === sensorData.sensor_id
          );

          if (sensorIndex !== -1) {
            // Mettre à jour les données du capteur existant
            const updatedSensors = [...prevSensors];
            updatedSensors[sensorIndex] = {
              ...updatedSensors[sensorIndex],
              ...sensorData,
            };
            return updatedSensors;
          } else {
            // Ajouter un nouveau capteur
            return [...prevSensors, sensorData];
          }
        });
      } catch (err) {
        console.error("Failed to parse MQTT message:", err);
      }
    });

    // Nettoyage à la déconnexion
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

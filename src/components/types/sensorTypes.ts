import { z } from "zod";
import { SensorSchema, SensorsSchema } from "./sensorSchema";

// TypeScript : from zod
export type Sensor = z.infer<typeof SensorSchema>;
export type Sensors = z.infer<typeof SensorsSchema>;

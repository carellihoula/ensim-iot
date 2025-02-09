import { z } from "zod";

// Schéma pour une mesure individuelle (valeur + unité + date)
const MeasurementSchema = z.object({
  value: z.union([z.number(), z.string()]),
  measure: z.string(),
  unit: z.string().optional(),
  date: z.string().datetime(),
});

// Schéma pour les données des capteurs (avec mesures dynamiques)
const SensorDataSchema = z.record(z.string(), z.array(MeasurementSchema));

// Schéma principal pour un capteur
export const SensorSchema = z.object({
  payload: z.object({
    name: z.string(),
    owner_id: z.string(),
    active: z.boolean().optional(),
    data: SensorDataSchema,
  }),
});

// Schéma pour plusieurs capteurs
export const SensorsSchema = z.object({
  sensors: z.array(SensorSchema), // Tableau de capteurs
});

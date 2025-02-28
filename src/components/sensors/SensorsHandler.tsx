"user client";
import { useSensors } from "@/context/SensorContext";
import SensorCard from "./SensorCard";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatToExponential } from "@/lib/utils/formatToExponential";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SensorsHandler() {
  const { latestSensorData, dataFromSensors, disabledMeasurements } =
    useSensors();

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Title: Sensors */}
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Dispositifs</h2>

        {/* Show loader if no data */}
        {dataFromSensors.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            {/*<Loader2 className="w-6 h-6 animate-spin text-primary" />*/}
            Pas de capteurs
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
              {dataFromSensors.map((sensor, index) => (
                <AccordionItem
                  key={index}
                  value={`sensor-${index}`}
                  className="border rounded-lg"
                >
                  <AccordionTrigger className="px-4 py-2 text-lg font-semibold hover:no-underline">
                    {sensor.payload.name || `Sensor ${index + 1}`}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <SensorCard
                      sensor={sensor}
                      sensorId={sensor.sensor_id || ""}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          </Accordion>
        )}
      </div>

      {/* Title: Latest Sensor Values */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Données Récentes Provenant des dispositifs
        </h2>

        {/* Show loader if no data */}
        {dataFromSensors.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            {/*<Loader2 className="w-6 h-6 animate-spin text-primary" />*/}
            Pas de capteurs
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(latestSensorData)
              .filter(([sensorId, measurements]) =>
                Object.keys(measurements).some(
                  (measure) => !disabledMeasurements[sensorId]?.has(measure)
                )
              )
              .map(([sensorId, measurements]) => {
                const sensor = dataFromSensors.find(
                  (s) => s.sensor_id === sensorId
                );
                return (
                  <Card
                    key={sensorId}
                    className="border border-gray-200 shadow-sm"
                  >
                    <CardHeader>
                      <CardTitle className="text-md text-center">
                        Dispositif {sensor?.payload.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {Object.entries(measurements)
                          .filter(
                            ([measure]) =>
                              !disabledMeasurements[sensorId]?.has(measure)
                          )
                          .map(([measure, value]) => (
                            <li
                              key={measure}
                              className="flex justify-between items-center"
                            >
                              <span className="font-medium">{measure}:</span>
                              <Badge variant="outline">
                                {formatToExponential(value)}
                              </Badge>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

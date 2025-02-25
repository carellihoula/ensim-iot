import { fakeData } from "@/lib/fakeData";
import SensorCard from "./SensorCard";
import { useSensors } from "@/context/SensorContext";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SensorsHandler() {
  const { latestSensorData, dataFromSensors } = useSensors();

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Fake Data - Displayed as Accordion */}
      <div className="w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Sensors</h2>
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
                  <SensorCard payload={sensor.payload} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </div>

      {/* Latest Sensor Values */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Latest Sensor Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(latestSensorData).map(([sensorId, measurements]) => (
            <Card key={sensorId} className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Sensor ID: {sensorId}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {Object.entries(measurements).map(([measure, value]) => (
                    <li
                      key={measure}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{measure}:</span>
                      <Badge variant="outline">{value}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

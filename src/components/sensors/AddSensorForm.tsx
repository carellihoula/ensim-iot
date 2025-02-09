"use client";

import { useState } from "react";
import convert from "convert-units";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sensor } from "../types/sensorTypes";
import { fakeData } from "@/lib/fakeData";

export default function AddSensorForm() {
  const [sensor, setSensor] = useState<Sensor>({
    payload: {
      name: "",
      owner_id: fakeData.sensors[0].payload.owner_id,
      data: {},
    },
  });

  const [tempNames, setTempNames] = useState<Record<string, string>>({});
  const [showJson, setShowJson] = useState(false);

  const availableMeasures = convert().measures();

  const addMeasurement = () => {
    const newId = `new_${Date.now()}`;
    setSensor((prev) => ({
      ...prev,
      payload: {
        ...prev.payload,
        data: {
          ...prev.payload.data,
          [newId]: [
            { value: 0, measure: "", unit: "", date: new Date().toISOString() },
          ],
        },
      },
    }));
    setTempNames((prev) => ({ ...prev, [newId]: "" }));
  };

  const updateMeasurement = (
    key: string,
    index: number,
    field: "measure" | "unit" | "value",
    value: string | number
  ) => {
    setSensor((prev) => {
      const updatedData = { ...prev.payload.data };
      if (!updatedData[key]) return prev;

      updatedData[key] = updatedData[key].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );

      return { ...prev, payload: { ...prev.payload, data: updatedData } };
    });
  };

  const removeMeasurement = (key: string) => {
    setSensor((prev) => {
      const updatedData = { ...prev.payload.data };
      delete updatedData[key];
      return { ...prev, payload: { ...prev.payload, data: updatedData } };
    });

    setTempNames((prev) => {
      const newNames = { ...prev };
      delete newNames[key];
      return newNames;
    });
  };

  const handleGrandeurChange = (oldKey: string, newValue: string) => {
    setTempNames((prev) => ({ ...prev, [oldKey]: newValue }));
  };

  const handleGrandeurBlur = (oldKey: string) => {
    const newKey = tempNames[oldKey].trim();
    if (!newKey) return;

    setSensor((prev) => {
      const updatedData = { ...prev.payload.data };

      if (oldKey === newKey || updatedData[newKey]) return prev;

      updatedData[newKey] = updatedData[oldKey];
      delete updatedData[oldKey];

      return { ...prev, payload: { ...prev.payload, data: updatedData } };
    });

    setTempNames((prev) => {
      const newNames = { ...prev };
      delete newNames[oldKey];
      return newNames;
    });
  };

  const handleSubmit = () => {
    setSensor({
      payload: {
        name: "",
        owner_id: fakeData.sensors[0].payload.owner_id,
        data: {},
      },
    });
    console.log("Dispositif ajouté :", sensor);
    alert("Dispositif ajouté avec succès !");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <Card className="p-6 w-full max-w-[700px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Ajouter un Capteur
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Nom du capteur"
            value={sensor.payload.name}
            onChange={(e) =>
              setSensor({
                ...sensor,
                payload: { ...sensor.payload, name: e.target.value },
              })
            }
            required
          />
          <Input
            type="text"
            placeholder="ID du propriétaire"
            value={sensor.payload.owner_id}
            disabled
            onChange={(e) =>
              setSensor({
                ...sensor,
                payload: { ...sensor.payload, owner_id: e.target.value },
              })
            }
            required
          />

          <div className="space-y-3">
            {Object.entries(sensor.payload.data).map(([key, measurements]) => (
              <div
                key={key}
                className="flex flex-col space-y-2 border p-3 rounded-md"
              >
                <div className="flex items-center justify-between">
                  <Input
                    type="text"
                    placeholder="Nom de la grandeur"
                    value={tempNames[key] ?? key}
                    onChange={(e) => handleGrandeurChange(key, e.target.value)}
                    onBlur={() => handleGrandeurBlur(key)}
                    required
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMeasurement(key)}
                  >
                    <Trash className="w-5 h-5 text-red-500" />
                  </Button>
                </div>

                {measurements.map((measurement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Select
                      onValueChange={(value) =>
                        updateMeasurement(key, index, "measure", value)
                      }
                      value={measurement.measure}
                    >
                      <SelectTrigger className="w-[40%]">
                        <SelectValue placeholder="Grandeur" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMeasures.map((measure) => (
                          <SelectItem key={measure} value={measure}>
                            {measure}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      onValueChange={(value) =>
                        updateMeasurement(key, index, "unit", value)
                      }
                      value={measurement.unit}
                      disabled={!measurement.measure}
                    >
                      <SelectTrigger className="w-[40%]">
                        <SelectValue placeholder="Unité" />
                      </SelectTrigger>
                      <SelectContent>
                        {measurement.measure &&
                          convert()
                            .possibilities(
                              measurement.measure as convert.Measure
                            )
                            .map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="text"
                      placeholder="Valeur"
                      value={measurement.value}
                      onChange={(e) =>
                        updateMeasurement(key, index, "value", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addMeasurement}
          >
            <Plus className="mr-2 w-5 h-5" /> Ajouter une Grandeur
          </Button>

          <Button type="button" className="w-full mt-4" onClick={handleSubmit}>
            Ajouter le Capteur
          </Button>
        </form>
      </Card>

      {/* Affichage du JSON repliable */}
      <div className="flex flex-col gap-6 max-w-[700px]">
        <Card
          className="flex items-center gap-6 p-6 w-full max-w-[700px] h-[70px] cursor-pointer"
          onClick={() => setShowJson(!showJson)}
        >
          <div className="flex items-center justify-between  w-full">
            <h2 className="text-xl font-semibold">Visualisation en JSON</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowJson(!showJson)}
            >
              {showJson ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
          </div>
        </Card>
        {showJson && (
          <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-auto text-sm max-h-60 w-full h-[400%]">
            <code>{JSON.stringify(sensor, null, 2)}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

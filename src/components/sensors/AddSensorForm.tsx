"use client";

import { useEffect, useState } from "react";
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
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { useMenu } from "@/context/MenuContext";
import { useSession } from "next-auth/react";
import JsonViewer from "./JsonViewer";
import { CustomDialog } from "../dialogs/CustomDialog";
import UnitRequestForm from "./UnitRequestForm";
import { messageAddUnitDialog } from "@/lib/utils/messageAddUnit";

export default function AddSensorForm() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [sensor, setSensor] = useState<Sensor>({
    payload: {
      name: "",
      owner_id: userId || "",
      data: {},
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const { selectedSensorEdited, setSelectedSensorEdited } = useMenu();

  const [tempNames, setTempNames] = useState<Record<string, string>>({});
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);
  const availableMeasures = convert().measures();

  useEffect(() => {
    if (selectedSensorEdited) {
      setSensor(selectedSensorEdited); // Charger les données du capteur à modifier
    }
  }, [selectedSensorEdited]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(sensor, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset après 2s
    } catch (err) {
      console.error("Échec de la copie :", err);
    }
  };

  const addMeasurement = () => {
    const newId = `new_${Date.now()}`;
    setSensor((prev) => ({
      ...prev,
      payload: {
        ...prev.payload,
        data: {
          ...prev.payload.data,
          [newId]: [{ value: 0, measure: "", unit: "" }],
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
    const newKey = tempNames[oldKey]?.trim() || oldKey;
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

  const handleSubmit = async () => {
    try {
      if (selectedSensorEdited) {
        // Edit Mode
        console.log("ss: ", selectedSensorEdited.sensor_id);
        await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_API_URL}/sensors/${selectedSensorEdited.sensor_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sensor),
          }
        );
        toast.success("Sensor updated successfully!", {
          style: {
            backgroundColor: "#49e663", // Rouge vif
            color: "white",
          },
        });
      } else {
        //Add Mode
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_API_URL}/sensors`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sensor),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add sensor");
        }

        //const data = await response.json();
        //console.log("✅ Sensor added successfully:", data);
        //alert("Capteur ajouté avec succès !");

        toast.success("Sensor added successfully!", {
          style: {
            backgroundColor: "#49e663", // Rouge vif
            color: "white",
          },
        });
      }

      // Reset form
      setSelectedSensorEdited(null);
      setSensor({
        payload: { name: "", owner_id: fakeData[0].payload.owner_id, data: {} },
      });
    } catch (error) {
      //console.error("❌ Error adding sensor:", error);
      toast.error("Failed to add sensor. Please try again.", {
        style: {
          backgroundColor: "#f01c2d", // Rouge vif
          color: "white",
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-6 p-6">
      <Card className="p-6 w-full max-w-[700px] ">
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

          <Button
            type="button"
            className="w-full mt-4 mb-4"
            onClick={handleSubmit}
          >
            {selectedSensorEdited
              ? "Modifier le Capteur"
              : "Ajouter le Capteur"}
          </Button>
        </form>
        <div className="text-sm text-center mt-4 italic">
          Vous ne trouvez pas votre unité ?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Cliquez ici{" "}
          </span>
          pour en faire la demande
        </div>
        <CustomDialog
          children={<UnitRequestForm />}
          title="Formulaire de demande"
          description={messageAddUnitDialog}
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(!isOpen)}
          showFooter={false}
        />
      </Card>

      {/* Composant JSON Viewer */}
      <JsonViewer data={sensor} />
    </div>
  );
}

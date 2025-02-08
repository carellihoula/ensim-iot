"use client";

import { useState } from "react";
import convert from "convert-units";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

interface Measurement {
  measure: string;
  unit: string;
}

export default function AddSensorForm() {
  const [sensorName, setSensorName] = useState("");
  const [grandeur, setGrandeur] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  // Liste des grandeurs disponibles dans convert-units
  const availableMeasures = convert().measures();

  // Fonction pour ajouter une nouvelle grandeur
  const addMeasurement = () => {
    setMeasurements([...measurements, { measure: "", unit: "" }]);
  };

  // Fonction pour modifier une grandeur
  const updateMeasurement = (
    index: number,
    key: "measure" | "unit",
    value: string
  ) => {
    const newMeasurements = [...measurements];
    newMeasurements[index][key] = value;
    setMeasurements(newMeasurements);
  };

  // Fonction pour supprimer une grandeur
  const removeMeasurement = (index: number) => {
    setMeasurements(measurements.filter((_, i) => i !== index));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSensor = {
      payload: {
        name: sensorName,
        owner_id: ownerId,
        data: measurements.reduce((acc, m) => {
          acc[m.measure] = [
            {
              value: 0,
              measure: m.measure,
              unit: m.unit,
              date: new Date().toISOString(),
            },
          ];
          return acc;
        }, {} as Record<string, { value: number; measure: string; unit: string; date: string }[]>),
      },
    };
    console.log("Nouveau Capteur :", newSensor);
  };

  // Génération du JSON
  const generatedJson = {
    payload: {
      name: sensorName,
      owner_id: "fake_owner_123", // À remplacer avec l'ID du JWT après implémentation de l'auth
      data: measurements.reduce((acc, m) => {
        acc[m.measure] = [
          {
            value: 0,
            measure: m.measure,
            unit: m.unit,
            date: new Date().toISOString(),
          },
        ];
        return acc;
      }, {} as Record<string, { value: number; measure: string; unit: string; date: string }[]>),
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <Card className="p-6 w-full max-w-[700px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Ajouter un Capteur
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom du capteur */}
          <Input
            type="text"
            placeholder="Nom du capteur"
            value={sensorName}
            onChange={(e) => setSensorName(e.target.value)}
            required
          />

          {/* Liste des grandeurs */}
          <div className="space-y-3">
            {measurements.map((measurement, index) => (
              <div key={index} className="flex items-center space-x-3">
                {/* Sélection de la grandeur */}
                <Input
                  type="text"
                  placeholder="Nom de grandeur"
                  value={grandeur}
                  onChange={(e) => setGrandeur(e.target.value)}
                  required
                />
                <Select
                  onValueChange={(value) =>
                    updateMeasurement(index, "measure", value)
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

                {/* Sélection de l'unité */}
                <Select
                  onValueChange={(value) =>
                    updateMeasurement(index, "unit", value)
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
                        .possibilities(measurement.measure as convert.Measure)
                        .map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>

                {/* Bouton supprimer */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMeasurement(index)}
                >
                  <Trash className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* Bouton pour ajouter une grandeur */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addMeasurement}
          >
            <Plus className="mr-2 w-5 h-5" /> Ajouter une Grandeur
          </Button>

          {/* Bouton de soumission */}
          <Button type="submit" className="w-full">
            Ajouter le Capteur
          </Button>
        </form>
      </Card>
      {/* Affichage JSON */}
      <Card className="p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">JSON du Capteur</h2>
        <Textarea
          className="h-64 font-mono text-sm"
          readOnly
          value={JSON.stringify(generatedJson, null, 2)}
        />
      </Card>
    </div>
  );
}

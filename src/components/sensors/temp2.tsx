"use client";

import { useState } from "react";
import convert, { Measure } from "convert-units";
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
import { Textarea } from "@/components/ui/textarea";

interface Measurement {
  customName: string; // Nom personnalisé par l'utilisateur
  measure: string; // Measure de convert-units
  units: string[]; // Liste des unités disponibles
  baseUnit: string; // Unité de base choisie
}

export default function AddSensorForm() {
  const [sensorName, setSensorName] = useState("");
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  // Liste des grandeurs disponibles
  const availableMeasures = convert().measures();

  // Ajout d'une nouvelle grandeur
  const addMeasurement = () => {
    setMeasurements([
      ...measurements,
      { customName: "", measure: "", units: [], baseUnit: "" },
    ]);
  };

  // Mise à jour d'une grandeur
  const updateMeasurement = (
    index: number,
    key: "customName" | "measure" | "baseUnit",
    value: string
  ) => {
    const newMeasurements = [...measurements];

    if (key === "measure") {
      // Si une Measure est sélectionnée, récupérer les unités correspondantes
      const units = value ? convert().possibilities(value as Measure) : [];
      newMeasurements[index] = {
        ...newMeasurements[index],
        measure: value,
        units,
        baseUnit: units[0] || "",
      };
    } else {
      newMeasurements[index][key] = value;
    }

    setMeasurements(newMeasurements);
  };

  // Suppression d'une grandeur
  const removeMeasurement = (index: number) => {
    setMeasurements(measurements.filter((_, i) => i !== index));
  };

  // Génération du JSON
  const generatedJson = {
    payload: {
      name: sensorName,
      owner_id: "fake_owner_123", // À remplacer avec l'ID du JWT après implémentation de l'auth
      data: measurements.reduce((acc, m) => {
        acc[m.customName] = [
          {
            value: 0,
            measure: m.measure,
            unit: m.baseUnit,
            date: new Date().toISOString(),
          },
        ];
        return acc;
      }, {} as Record<string, { value: number; measure: string; unit: string; date: string }[]>),
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Formulaire */}
      <Card className="p-6 w-full">
        <h2 className="text-xl font-semibold mb-4">Ajouter un Capteur</h2>
        <form className="space-y-4">
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
              <div
                key={index}
                className="flex flex-col space-y-3 border p-3 rounded-md"
              >
                {/* Nom personnalisé de la grandeur */}
                <Input
                  type="text"
                  placeholder="Nom de la grandeur (ex: Température moteur)"
                  value={measurement.customName}
                  onChange={(e) =>
                    updateMeasurement(index, "customName", e.target.value)
                  }
                  required
                />

                {/* Sélection de la Measure */}
                <Select
                  onValueChange={(value) =>
                    updateMeasurement(index, "measure", value)
                  }
                  value={measurement.measure}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Measure (optionnel)" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMeasures.map((measure) => (
                      <SelectItem key={measure} value={measure}>
                        {measure}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sélection de l'unité de base */}
                <Select
                  onValueChange={(value) =>
                    updateMeasurement(index, "baseUnit", value)
                  }
                  value={measurement.baseUnit}
                  disabled={measurement.units.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Unité de base" />
                  </SelectTrigger>
                  <SelectContent>
                    {measurement.units.map((unit) => (
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

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function UnitRequestForm() {
  const [magnitude, setMagnitude] = useState("");
  const [unitInput, setUnitInput] = useState("");
  const [units, setUnits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addUnit = () => {
    if (unitInput.trim() !== "" && !units.includes(unitInput.trim())) {
      setUnits([...units, unitInput.trim()]);
      setUnitInput("");
    }
  };

  const removeUnit = (unit: string) => {
    setUnits(units.filter((u) => u !== unit));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (units.length === 0) {
      alert("Vous devez ajouter au moins une unité.");
      return;
    }
    setIsLoading(true);

    try {
      // Simule une requête API (remplace avec ton endpoint)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Demande envoyée:", { magnitude, units });

      // Réinitialiser le formulaire après soumission
      setMagnitude("");
      setUnits([]);
      alert("En cours de développement");
    } catch (error) {
      console.error("Erreur lors de l’envoi de la demande", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* physical quantity */}
      <Input
        type="text"
        placeholder="Nom de la grandeur"
        value={magnitude}
        onChange={(e) => setMagnitude(e.target.value)}
        required
      />

      {/* List of units */}
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Ajouter une unité"
          value={unitInput}
          onChange={(e) => setUnitInput(e.target.value)}
        />
        <Button type="button" onClick={addUnit}>
          Ajouter
        </Button>
      </div>

      {/* Display of added units */}
      <div className="flex flex-wrap gap-2">
        {units.map((unit, index) => (
          <Badge key={index} className="flex items-center space-x-1">
            <span>{unit}</span>
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => removeUnit(unit)}
            />
          </Badge>
        ))}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Envoi en cours..." : "Envoyer la demande"}
      </Button>
    </form>
  );
}

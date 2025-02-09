"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { fakeData } from "@/lib/fakeData";
import { MdSensors } from "react-icons/md";

const SensorList = () => {
  const [sensorList, setSensorList] = useState(fakeData.sensors);

  const deleteSensor = (id: number) => {
    setSensorList((prev) => prev.filter((_, index) => index !== id));
  };

  const editSensor = (id: number) => {
    alert(`Modification du capteur ${id}`);
  };

  const toggleActiveStatus = (id: number) => {
    setSensorList((prev) =>
      prev.map((sensor, index) =>
        index === id
          ? {
              ...sensor,
              payload: { ...sensor.payload, active: !sensor.payload.active },
            }
          : sensor
      )
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {sensorList.map((sensor, index) => (
        <Card
          key={index}
          className="flex flex-col items-center justify-between px-4 py-2 w-64 border rounded-lg shadow-md bg-white box-content"
        >
          {/* Toggle pour activer/désactiver le capteur */}
          <div className="flex justify-end mt-1  w-full ">
            <Switch
              checked={sensor.payload.active || false}
              onCheckedChange={() => toggleActiveStatus(index)}
              className="w-10 h-5"
            />
          </div>

          {/* Icône ou image du capteur */}
          <MdSensors size={80} />

          <h3 className="text-xl font-semibold text-gray-800">
            {sensor.payload.name}
          </h3>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            {/* Bouton Modifier */}
            <Button variant="outline" onClick={() => editSensor(index)}>
              <span>Modifier</span>
              <Edit className="w-5 h-5 text-blue-500" />
            </Button>

            {/* Bouton Supprimer */}
            <Button variant="destructive" onClick={() => deleteSensor(index)}>
              <span>Supprimer</span>
              <Trash className="w-5 h-5 " />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SensorList;

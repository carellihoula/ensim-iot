"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { fakeData } from "@/lib/fakeData";
import { MdSensors } from "react-icons/md";
import { ConfirmDeleteDialog } from "../dialogs/ConfirmDeleteDialog";
import { Sensor } from "../types/sensorTypes";

const SensorList = () => {
  const [sensorList, setSensorList] = useState(fakeData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

  //Delete sensors with dialog
  const handleDelete = async (id: number | string) => {
    if (selectedSensor?.sensor_id !== null) {
      try {
        // Call API to delete the sensor
        const response = await fetch(
          `http://localhost:5000/api/sensors/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete sensor");
        }

        setSensorList((prev) =>
          prev.filter((sensor) => sensor.sensor_id !== id)
        );
        setIsDialogOpen(false);
        console.log("✅ Sensor deleted successfully");
      } catch (error: any) {
        console.error("❌ Error deleting sensor:", error.message);
      }
    }
  };

  //edit sensor
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
          className="flex flex-col items-center justify-between p-4  w-64 border rounded-lg shadow-md bg-white box-content"
        >
          {/* Toggle to active/deactivate sensor */}
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
            {/* Edit Button */}
            <Button variant="outline" onClick={() => editSensor(index)}>
              <span>Modifier</span>
              <Edit className="w-5 h-5 text-blue-500" />
            </Button>

            {/* Delete Button */}
            <Button
              variant="destructive"
              onClick={() => {
                setSelectedSensor(sensor);
                //console.log(sensor.payload.id_sensor); ==< DEBUGGING
                setIsDialogOpen(true);
              }}
            >
              <span>Supprimer</span>
              <Trash className="w-5 h-5 " />
            </Button>
          </div>
        </Card>
      ))}
      {/* Confirm Dialog*/}
      {selectedSensor !== null && (
        <ConfirmDeleteDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          title="Delete Sensor?"
          description="Are you sure you want to delete this sensor? This action cannot be undone."
          onConfirm={() => handleDelete(selectedSensor.sensor_id ?? "")}
        />
      )}
    </div>
  );
};

export default SensorList;

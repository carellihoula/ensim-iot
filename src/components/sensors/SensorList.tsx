"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { MdSensors } from "react-icons/md";
import { ConfirmDeleteDialog } from "../dialogs/ConfirmDeleteDialog";
import { Sensor } from "../types/sensorTypes";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMenu } from "@/context/MenuContext";
import { menuItems } from "@/lib/navigation";

const API_URL = "http://localhost:5000/api/sensors"; // API backend

const SensorList = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const { setActiveMenu, setSelectedSensorEdited } = useMenu();
  // 📌 Fetch sensors using useQuery
  const {
    data: sensorList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sensors"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user/67b732a537407678e6b6d1d2`);
      if (!response.ok) throw new Error("Failed to fetch sensors");

      const result = await response.json();

      if (!Array.isArray(result)) {
        console.error("API did not return an array:", result);
        return [];
      }

      return result;
    },
  });

  console.log("Sensor List:", sensorList);

  // 📌 Delete Sensor Mutation
  const deleteSensorMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete sensor");
    },
    onMutate: async (id) => {
      queryClient.setQueryData(["sensors"], (oldData: Sensor[]) =>
        oldData?.filter((sensor) => sensor.sensor_id !== id)
      ); // Supprime localement AVANT la requête API
    },
    onSuccess: () => {
      toast.success("🗑️ Sensor deleted successfully!", {
        style: {
          backgroundColor: "#ff4d4d",
          color: "white",
          fontWeight: "bold",
        },
      });
    },
    onError: () => {
      toast.error("❌ Error deleting sensor!");
      queryClient.invalidateQueries({ queryKey: ["sensors"] }); // 🔄 Re-fetch en cas d'erreur
    },
  });

  // 📌 Edit Sensor Mutation
  const editSensorMutation = useMutation({
    mutationFn: async (updatedSensor: Sensor) => {
      const response = await fetch(`${API_URL}/${updatedSensor.sensor_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSensor),
      });
      if (!response.ok) throw new Error("Failed to update sensor");
      return response.json();
    },
    onSuccess: (updatedSensor) => {
      queryClient.setQueryData(["sensors"], (oldData: Sensor[]) =>
        oldData?.map((sensor) =>
          sensor.sensor_id === updatedSensor.sensor_id ? updatedSensor : sensor
        )
      ); // Met à jour localement sans refetch
      toast.success("✏️ Sensor updated successfully!", {
        style: {
          backgroundColor: "#ffcc00",
          color: "black",
          fontWeight: "bold",
        },
      });
    },
    onError: () => {
      toast.error("❌ Error updating sensor!");
    },
  });

  // 📌 Function to handle sensor edit
  const editSensor = (sensor: Sensor) => {
    setSelectedSensorEdited(sensor); // 🔥
    setActiveMenu(menuItems[2].title);
  };

  if (isLoading) return <p>Loading sensors...</p>;
  if (error) return <p>Error fetching sensors</p>;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {Array.isArray(sensorList) &&
        sensorList.map((sensor: Sensor) => (
          <Card
            key={sensor.sensor_id}
            className="flex flex-col items-center justify-between p-4 w-64 border rounded-lg shadow-md bg-white"
          >
            {/* Toggle active/deactivate */}
            <div className="flex justify-end mt-1 w-full">
              {/*<Switch
                checked={sensor.payload.active || false}
                onCheckedChange={() =>
                  editSensorMutation.mutate({
                    ...sensor,
                    payload: {
                      ...sensor.payload,
                      active: !sensor.payload.active,
                    },
                  })
                }
                className="w-10 h-5"
              />*/}
            </div>

            <MdSensors size={80} />

            <h3 className="text-xl font-semibold text-gray-800">
              {sensor.payload.name}
            </h3>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <Button variant="outline" onClick={() => editSensor(sensor)}>
                <span>Modifier</span>
                <Edit className="w-5 h-5 text-blue-500" />
              </Button>

              <Button
                variant="destructive"
                onClick={() => {
                  setSelectedSensor(sensor);
                  setIsDialogOpen(true);
                }}
              >
                <span>Supprimer</span>
                <Trash className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}

      {/* Confirm Delete Dialog */}
      {selectedSensor && (
        <ConfirmDeleteDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          title="Delete Sensor?"
          description="Are you sure you want to delete this sensor? This action cannot be undone."
          onConfirm={() => {
            if (selectedSensor && selectedSensor.sensor_id !== undefined) {
              deleteSensorMutation.mutate(selectedSensor.sensor_id);
            }
          }}
        />
      )}
    </div>
  );
};

export default SensorList;

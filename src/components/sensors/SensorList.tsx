"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";
import { MdSensors } from "react-icons/md";
import { ConfirmDeleteDialog } from "../dialogs/ConfirmDeleteDialog";
import { Sensor } from "../types/sensorTypes";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMenu } from "@/context/MenuContext";
import { menuItems } from "@/lib/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

const API_URL = "http://localhost:5000/api/sensors"; // API backend

const SensorList = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const { setActiveMenu, setSelectedSensorEdited } = useMenu();

  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log("userId: " + userId);
  const {
    data: sensorList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sensors"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch sensors");

      const result = await response.json();

      if (result.message) {
        return { sensors: [], message: result.message };
      }

      if (!Array.isArray(result)) {
        console.error("API did not return an array:", result);
        return { sensors: [] };
      }

      return result;
    },
  });

  const deleteSensorMutation = useMutation({
    mutationFn: async (id: number | string) => {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete sensor");
    },
    onMutate: async (id) => {
      queryClient.setQueryData(["sensors"], (oldData: Sensor[]) =>
        oldData?.filter((sensor) => sensor.sensor_id !== id)
      );
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
      queryClient.invalidateQueries({ queryKey: ["sensors"] });
    },
  });

  const editSensor = (sensor: Sensor) => {
    setSelectedSensorEdited(sensor);
    setActiveMenu(menuItems[2].title);
  };

  console.log("sebsors" + JSON.stringify(sensorList));

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {isLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-between p-4 w-64 border rounded-lg shadow-md bg-white"
          >
            <div className="w-full flex justify-end">
              <Skeleton className="w-10 h-5 rounded" />
            </div>

            <Skeleton className="w-20 h-20 rounded-full" />
            <Skeleton className="w-32 h-6 mt-2 rounded" />

            <div className="flex items-center gap-2 mt-3">
              <Skeleton className="w-20 h-8 rounded" />
              <Skeleton className="w-20 h-8 rounded" />
            </div>
          </Card>
        ))}

      {error && (
        <div className="text-red-500 text-center">
          ❌ Error fetching sensors. Please try again later.
        </div>
      )}
      {"sensors" in sensorList && sensorList.sensors.length === 0 && (
        <div className="text-red-500 text-center">
          {sensorList.message || "Aucun capteur disponible."}
        </div>
      )}

      {!isLoading &&
        !error &&
        Array.isArray(sensorList) &&
        sensorList.map((sensor: Sensor) => (
          <Card
            key={sensor.sensor_id}
            className="flex flex-col items-center justify-between p-4 w-64 border rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-end mt-1 w-full"></div>

            <MdSensors size={80} />

            <h3 className="text-xl font-semibold text-gray-800">
              {sensor.payload.name}
            </h3>

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

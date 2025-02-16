import { Sensors } from "@/components/types/sensorTypes";

export const fakeData: Sensors = {
  sensors: [
    {
      payload: {
        name: "TempSensor-X100",
        owner_id: "owner_123",
        id_sensor: "e200544",
        active: true,
        data: {
          temperature: [
            { value: 10, measure: "temperature", date: "2025-02-07T12:00:00Z" },
            { value: 5, measure: "temperature", date: "2025-02-07T12:01:00Z" },
            {
              value: -20,
              measure: "temperature",
              date: "2025-02-07T12:02:00Z",
            },
          ],
          humidity: [
            { value: 55, measure: "humidity", date: "2025-02-07T12:00:00Z" },
            { value: 60, measure: "humidity", date: "2025-02-07T12:01:00Z" },
            { value: 58, measure: "humidity", date: "2025-02-07T12:02:00Z" },
          ],
        },
      },
    },
    {
      payload: {
        name: "Cano-X100",
        owner_id: "owner_123",
        id_sensor: "e772005445555",
        active: true,
        data: {
          temperature: [
            { value: 35, measure: "temperature", date: "2025-02-07T12:00:00Z" },
            { value: 36, measure: "temperature", date: "2025-02-07T12:01:00Z" },
            { value: 34, measure: "temperature", date: "2025-02-07T12:02:00Z" },
          ],
          humidity: [
            { value: 70, measure: "humidity", date: "2025-02-07T12:00:00Z" },
            { value: 75, measure: "humidity", date: "2025-02-07T12:01:00Z" },
            { value: 70, measure: "humidity", date: "2025-02-07T12:02:00Z" },
          ],
        },
      },
    },
  ],
};

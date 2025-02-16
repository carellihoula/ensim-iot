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
            {
              value: -15,
              measure: "temperature",
              date: "2025-02-07T12:03:00Z",
            },
            {
              value: -10,
              measure: "temperature",
              date: "2025-02-07T12:04:00Z",
            },
            { value: -5, measure: "temperature", date: "2025-02-07T12:05:00Z" },
            { value: 0, measure: "temperature", date: "2025-02-07T12:06:00Z" },
            { value: 2, measure: "temperature", date: "2025-02-07T12:07:00Z" },
            { value: 5, measure: "temperature", date: "2025-02-07T12:08:00Z" },
            { value: 8, measure: "temperature", date: "2025-02-07T12:09:00Z" },
          ],
          humidity: [
            { value: 55, measure: "humidity", date: "2025-02-07T12:00:00Z" },
            { value: 60, measure: "humidity", date: "2025-02-07T12:01:00Z" },
            { value: 58, measure: "humidity", date: "2025-02-07T12:02:00Z" },
            { value: 62, measure: "humidity", date: "2025-02-07T12:03:00Z" },
            { value: 65, measure: "humidity", date: "2025-02-07T12:04:00Z" },
            { value: 63, measure: "humidity", date: "2025-02-07T12:05:00Z" },
            { value: 67, measure: "humidity", date: "2025-02-07T12:06:00Z" },
            { value: 70, measure: "humidity", date: "2025-02-07T12:07:00Z" },
            { value: 68, measure: "humidity", date: "2025-02-07T12:08:00Z" },
            { value: 72, measure: "humidity", date: "2025-02-07T12:09:00Z" },
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
            { value: 37, measure: "temperature", date: "2025-02-07T12:03:00Z" },
            { value: 38, measure: "temperature", date: "2025-02-07T12:04:00Z" },
            { value: 36, measure: "temperature", date: "2025-02-07T12:05:00Z" },
            { value: 39, measure: "temperature", date: "2025-02-07T12:06:00Z" },
            { value: 40, measure: "temperature", date: "2025-02-07T12:07:00Z" },
            { value: 38, measure: "temperature", date: "2025-02-07T12:08:00Z" },
            { value: 41, measure: "temperature", date: "2025-02-07T12:09:00Z" },
          ],
          humidity: [
            { value: 70, measure: "humidity", date: "2025-02-07T12:00:00Z" },
            { value: 75, measure: "humidity", date: "2025-02-07T12:01:00Z" },
            { value: 70, measure: "humidity", date: "2025-02-07T12:02:00Z" },
            { value: 72, measure: "humidity", date: "2025-02-07T12:03:00Z" },
            { value: 74, measure: "humidity", date: "2025-02-07T12:04:00Z" },
            { value: 76, measure: "humidity", date: "2025-02-07T12:05:00Z" },
            { value: 78, measure: "humidity", date: "2025-02-07T12:06:00Z" },
            { value: 80, measure: "humidity", date: "2025-02-07T12:07:00Z" },
            { value: 77, measure: "humidity", date: "2025-02-07T12:08:00Z" },
            { value: 79, measure: "humidity", date: "2025-02-07T12:09:00Z" },
          ],
        },
      },
    },
  ],
};

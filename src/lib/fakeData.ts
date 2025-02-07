import { Sensors } from "@/components/types/sensorTypes";

export const fakeData: Sensors = {
  sensors: [
    {
      payload: {
        name: "TempSensor-X100",
        owner_id: "owner_123",
        data: {
          temperature: [
            { value: 35, measure: "temperature", date: "2025-02-07T12:00:00Z" },
            { value: 36, measure: "temperature", date: "2025-02-07T12:01:00Z" },
            { value: 34, measure: "temperature", date: "2025-02-07T12:02:00Z" },
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
        name: "TempSensor-X100",
        owner_id: "owner_123",
        data: {
          temperature: [
            { value: 35, measure: "temperature", date: "2025-02-07T12:00:00Z" },
            { value: 36, measure: "temperature", date: "2025-02-07T12:01:00Z" },
            { value: 34, measure: "temperature", date: "2025-02-07T12:02:00Z" },
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
        name: "TempSensor-X100",
        owner_id: "owner_123",
        data: {
          temperature: [
            { value: 35, measure: "temperature", date: "2025-02-07T12:00:00Z" },
            { value: 36, measure: "temperature", date: "2025-02-07T12:01:00Z" },
            { value: 34, measure: "temperature", date: "2025-02-07T12:02:00Z" },
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
        name: "PressureSensor-P200",
        owner_id: "owner_456",
        data: {
          pressure: [
            { value: 1012, measure: "pressure", date: "2025-02-07T12:00:00Z" },
            { value: 1013, measure: "pressure", date: "2025-02-07T12:01:00Z" },
            { value: 1011, measure: "pressure", date: "2025-02-07T12:02:00Z" },
          ],
          altitude: [
            { value: 300, measure: "altitude", date: "2025-02-07T12:00:00Z" },
            { value: 305, measure: "altitude", date: "2025-02-07T12:01:00Z" },
            { value: 298, measure: "altitude", date: "2025-02-07T12:02:00Z" },
          ],
        },
      },
    },
  ],
};

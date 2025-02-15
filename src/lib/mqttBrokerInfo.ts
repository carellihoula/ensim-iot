export const mqttConfig = {
  mqttUrl: process.env.NEXT_PUBLIC_MQTT_URL,
  port: process.env.NEXT_PUBLIC_MQTT_PORT || 8883,
  mqttUsername: process.env.NEXT_PUBLIC_MQTT_USERNAME,
  mqttPassword: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
};

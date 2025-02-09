"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

const brokerInfo = {
  url: "mqtts://broker.example.com",
  port: 8883,
  userId: "12345",
  username: "mqtt_user",
  password: "securepassword",
  tlsCert: "/certs/mqtt_cert.pem",
};

export default function Settings() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-50">
      <Card className="w-full max-w-lg p-6 space-y-6 shadow-xl rounded-xl border border-gray-200">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          MQTT Connection Information
        </h1>

        {Object.entries(brokerInfo).map(([key, value]) =>
          key !== "tlsCert" ? (
            <div
              key={key}
              className="flex justify-between items-center p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span className="font-semibold text-gray-700 capitalize">
                {key === "url"
                  ? "MQTT URL:"
                  : key === "port"
                  ? "Port:"
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <span className="text-gray-700">{value}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(String(value), key)}
                className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <Copy className="w-5 h-5 text-gray-600" />
              </Button>
              {copiedField === key && (
                <span className="absolute text-xs text-green-600 right-12">
                  Copié !
                </span>
              )}
            </div>
          ) : (
            <div
              key={key}
              className="flex justify-between items-center p-4 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span className="font-semibold text-gray-700">
                Certificat TLS
              </span>
              <a
                href={typeof value === "string" ? value : undefined}
                download
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                Télécharger <Download className="w-5 h-5" />
              </a>
            </div>
          )
        )}
      </Card>
    </div>
  );
}

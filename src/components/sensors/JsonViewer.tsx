"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface JsonViewerProps {
  data: object;
}

export default function JsonViewer({ data }: JsonViewerProps) {
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      toast.success("Copié dans le presse-papier !");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Échec de la copie");
      console.error("Erreur de copie :", err);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[700px]">
      <Card
        className="flex items-center gap-6 p-6 w-full max-w-[700px] h-[70px] cursor-pointer"
        onClick={() => setShowJson(!showJson)}
      >
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold">Visualisation en JSON</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowJson(!showJson)}
          >
            {showJson ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>
      </Card>

      {showJson && (
        <div className="relative bg-gray-900 text-white p-4 rounded-lg overflow-auto text-sm max-h-60 w-full">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1 bg-gray-700 rounded-md hover:bg-gray-600 transition"
          >
            <Copy className="w-5 h-5 text-white p-2 box-content" />
          </button>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
          {copied && (
            <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              Copié !
            </div>
          )}
        </div>
      )}
    </div>
  );
}

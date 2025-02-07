"use client";

import Header from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import Sensorshandler from "@/components/sensors/SensorsHandler";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { BellRing } from "lucide-react";

export default function Home() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="w-full">
        <Header />
        <Separator className="my-4" />
      </div>

      <SidebarProvider>
        <div className="flex flex-1 ">
          <AppSidebar />

          <main className="flex-1 p-4 overflow-y-auto mb-4">
            {/* Votre contenu ici */}
            <Sensorshandler />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

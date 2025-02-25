"use client";

import Settings from "@/components/common/Settings";
import Header from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import AddSensorForm from "@/components/sensors/AddSensorForm";
import SensorList from "@/components/sensors/SensorList";
import Sensorshandler from "@/components/sensors/SensorsHandler";
import Visualization from "@/components/sensors/Visualization";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useMenu } from "@/context/MenuContext";

import { useSensors } from "@/context/SensorContext";
import { fakeData } from "@/lib/fakeData";
import { menuItems } from "@/lib/navigation";

export default function Home() {
  const { activeMenu } = useMenu();
  const { dataFromSensors } = useSensors();

  // Mapping des menus aux composants
  const renderContent = () => {
    switch (activeMenu) {
      case menuItems[0].title:
        return <Sensorshandler />;
      case menuItems[1].title:
        return <SensorList />;
      case menuItems[2].title:
        return <AddSensorForm />;
      case menuItems[3].title:
        return <Visualization dataFromSensors={dataFromSensors || []} />;
      case menuItems[4].title:
        return <Settings />;
      default:
        return <p className="text-center">Sélectionnez un menu</p>;
    }
  };
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="w-full">
        <Header />
        <Separator className="my-4" />
      </div>

      <SidebarProvider>
        <div className="flex flex-1 ">
          <AppSidebar />

          <main className="flex-1 p-4 overflow-y-auto mb-40 ">
            {/* Votre contenu ici */}
            {renderContent()}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

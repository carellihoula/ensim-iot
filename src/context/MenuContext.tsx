"use client";

import { createContext, useContext, useState, PropsWithChildren } from "react";
import { menuItems } from "@/lib/navigation";
import { Sensor } from "@/components/types/sensorTypes";

type MenuContextProps = {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  selectedSensorEdited: Sensor | null;
  setSelectedSensorEdited: (sensor: Sensor | null) => void;
};

// Création du contexte
const MenuContext = createContext<MenuContextProps | null>(null);

// Typage du provider avec PropsWithChildren<>
export function MenuProvider({ children }: PropsWithChildren<{}>) {
  const [activeMenu, setActiveMenu] = useState<string>(menuItems[0].title);
  const [selectedSensorEdited, setSelectedSensorEdited] =
    useState<Sensor | null>(null);
  return (
    <MenuContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        selectedSensorEdited,
        setSelectedSensorEdited,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

// Hook pour accéder au contexte
export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}

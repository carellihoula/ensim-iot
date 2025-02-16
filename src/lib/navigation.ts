import { Settings } from "lucide-react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDashboard, MdSensors } from "react-icons/md";
import { GoGraph } from "react-icons/go";

export const menuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: MdDashboard,
  },
  {
    title: "Dispositifs",
    url: "#",
    icon: MdSensors,
  },
  {
    title: "Ajout Dispositif",
    url: "#",
    icon: IoIosAddCircleOutline,
  },
  {
    title: "Visualisation",
    url: "#",
    icon: GoGraph,
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Settings,
  },
];

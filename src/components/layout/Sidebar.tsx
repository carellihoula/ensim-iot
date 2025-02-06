"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Dispositifs",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Ajout Dispositif",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="mt-17">
      <SidebarHeader>
        <div className="flex items-center space-x-3 justify-center py-2">
          <Image
            src="/images/ensim-logo.png"
            alt="ENSIM Logo"
            width={50}
            height={50}
          />
          <h1 className="text-xl font-bold">Ensim IOT</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="  p-6">
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-[16px]">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

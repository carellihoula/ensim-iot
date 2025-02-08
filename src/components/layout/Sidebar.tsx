"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { IoIosAddCircleOutline } from "react-icons/io";

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
import { MdDashboard, MdSensors } from "react-icons/md";
import { menuItems } from "@/lib/navigation";
import { useMenu } from "@/context/MenuContext";

// Menu items.

export function AppSidebar() {
  const { activeMenu, setActiveMenu } = useMenu();
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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`p-6 ${
                      activeMenu === item.title && "bg-gray-200"
                    }`}
                    onClick={() => setActiveMenu(item.title)}
                  >
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

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for open/close
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { menuItems } from "@/lib/navigation";
import { useMenu } from "@/context/MenuContext";

export function AppSidebar() {
  const { activeMenu, setActiveMenu } = useMenu();
  const [isOpen, setIsOpen] = useState(false); // Sidebar state

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 p-2 bg-gray-200 rounded-md md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Hidden on small screens, visible on large screens */}
      <Sidebar
        className={`mt-17 fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
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
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title} className="px-4">
                <SidebarMenuButton
                  asChild
                  className={`p-6 ${
                    activeMenu === item.title && "bg-gray-200"
                  }`}
                  onClick={() => {
                    setActiveMenu(item.title);
                    setIsOpen(false); // Close sidebar when clicking a menu item (mobile)
                  }}
                >
                  <a href={item.url}>
                    <item.icon />
                    <span className="text-[16px]">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      {/* Background overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

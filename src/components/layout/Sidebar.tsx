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
        className="fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for large screens */}
      <Sidebar className="hidden md:block fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
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
        <SidebarContent className="mt-10 overflow-y-auto">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title} className="px-4">
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
        </SidebarContent>
      </Sidebar>

      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 md:hidden 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center space-x-3 justify-between p-4 bg-gray-100">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/ensim-logo.png"
              alt="ENSIM Logo"
              width={40}
              height={40}
            />
            <h1 className="text-lg font-bold">Ensim IOT</h1>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="mt-10 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.title} className="px-4">
              <button
                className={`p-4 w-full text-left flex items-center space-x-3 ${
                  activeMenu === item.title ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setActiveMenu(item.title);
                  setIsOpen(false); // Close menu after clicking
                }}
              >
                <item.icon />
                <span className="text-[16px]">{item.title}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

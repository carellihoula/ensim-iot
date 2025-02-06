"use client";

import Header from "@/components/layout/Header";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full">
        <Header />
        <Separator className="my-4" />
      </div>

      <SidebarProvider>
        <div className="flex flex-1">
          <div className="">
            <AppSidebar />
          </div>
          <main className="flex-1 p-4 overflow-y-auto">
            {/* Votre contenu ici */}
            <p>dddddddddddddd</p>
            <p>dddddddddddddd</p>
            <p>dddddddddddddd</p>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

"use client";

import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar/appSidebar";
import { UserProvider } from "@/contexts/userProvider";
import { ClientsProvider } from "@/contexts/clientProvider";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <ClientsProvider>
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />

            <main className="flex-1 overflow-auto">
              <SidebarTrigger />
              <div className="p-8">{children}</div>
            </main>
          </div>
        </SidebarProvider>
      </ClientsProvider>
    </UserProvider>
  );
}

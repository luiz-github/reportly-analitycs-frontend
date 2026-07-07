"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User2,
  LogOut,
  Settings,
  Cable,
  ChevronDown,
  GalleryVerticalEnd,
  Plus,
  Pencil,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { CreateClientDialog } from "../dialogs/createClientDialog";
import { useClients } from "@/hooks/clients/useClients";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Integrations", href: "/integrations", icon: Cable },
];

const settingsItems = [{ label: "Account", href: "/account" }];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, loading, refetchUser, logout } = useUser();
  const { clients, loading: loadingClients, refetch, error } = useClients();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  async function handleLogout() {
    setLogoutLoading(true);
    try {
      await logout();
    } finally {
      setLogoutLoading(false);
    }
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <div>
      <CreateClientDialog open={open} setOpen={setOpen} onSuccess={refetch} />

      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <GalleryVerticalEnd />
                    </div>
                    {selectedClient ?? "Select Client"}
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg">
                  <DropdownMenuItem onClick={() => setSelectedClient(null)}>
                    <span>All clients</span>
                  </DropdownMenuItem>

                  {clients && clients.length > 0 ? (
                    clients.map((client) => (
                      <div key={client.id}>
                        <Separator className="mt-1 mb-1" />

                        <DropdownMenuItem
                          className="justify-between"
                          onClick={() => {
                            setSelectedClient(client.name);
                          }}
                        >
                          <span>{client.name}</span>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Pencil className="h-[1.2rem] w-[1.2rem]" />
                          </span>
                        </DropdownMenuItem>
                      </div>
                    ))
                  ) : (
                    <div>
                      <Separator className="mt-1 mb-1" />
                      <DropdownMenuItem disabled>
                        <span>No clients added yet</span>
                      </DropdownMenuItem>
                    </div>
                  )}

                  <Separator className="mt-1 mb-1" />

                  <DropdownMenuItem
                    className="justify-between"
                    onClick={handleOpen}
                  >
                    <span>Add Client</span>
                    <Plus className="h-[1.2rem] w-[1.2rem]" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Geral</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map(({ label, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={pathname === href}>
                    <Link href={href}>
                      <Icon className="shrink-0" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center justify-between gap-2 p-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <User2 className="shrink-0" />

                  <div className="min-w-0 flex-1">
                    {loading ? (
                      <div className="space-y-1.5">
                        <Skeleton className="h-3.5 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    ) : (
                      <>
                        <p className="truncate text-sm font-medium">
                          {user ? user.agency_name : "—"}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user ? user.email : "—"}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="h-[1.2rem] w-[1.2rem]" />
                        <span className="sr-only">Settings</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="cn-menu-target cn-menu-translucent z-50 max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    >
                      {settingsItems.map(({ label, href }) => (
                        <div key={href}>
                          <DropdownMenuItem asChild>
                            <Link href={href}>{label}</Link>
                          </DropdownMenuItem>

                          <Separator className="my-1" />
                        </div>
                      ))}

                      <DropdownMenuItem>
                        <ModeToggle variant="text" />
                      </DropdownMenuItem>

                      <Separator className="mt-1 mb-1" />

                      <DropdownMenuItem
                        variant="destructive"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 size-4" />
                        {logoutLoading ? "Loading..." : "Logout"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

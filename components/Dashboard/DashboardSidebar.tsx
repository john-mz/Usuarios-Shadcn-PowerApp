"use client"

import {
  GraduationCapIcon,
  LogOutIcon,
  UserRoundIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import type { DashboardView } from "./types"

type DashboardSidebarProps = {
  currentView: DashboardView
  onNavigate: (view: DashboardView) => void
  onLogout: () => void
}

const menuItems = [
  {
    key: "estudiantes" as const,
    label: "Estudiantes",
    icon: GraduationCapIcon,
  },
  {
    key: "perfil" as const,
    label: "Perfil",
    icon: UserRoundIcon,
  },
]

export function DashboardSidebar({
  currentView,
  onNavigate,
  onLogout,
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader className="gap-3 border-b border-sidebar-border px-4 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sidebar-foreground/60">
            Panel
          </p>
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Campus CRM
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    type="button"
                    data-active={currentView === item.key}
                    onClick={() => onNavigate(item.key)}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton type="button" onClick={onLogout}>
              <LogOutIcon />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

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
  SidebarTrigger,
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
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="gap-3 border-b border-sidebar-border px-4 py-5 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <div className="flex items-start justify-between gap-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
          <div className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              Z
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                Zeta
              </h2>
              <p className="truncate text-xs text-sidebar-foreground/60">
                Gestion de estudiantes
              </p>
            </div>
          </div>
          <SidebarTrigger
            type="button"
            className="shrink-0 text-sidebar-foreground"
          />
        </div>
        <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/60 px-3 py-2 group-data-[collapsible=icon]:hidden">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sidebar-foreground/60">
            Panel academico
          </p>
          <p className="mt-1 text-sm text-sidebar-foreground">
            Administracion activa
          </p>
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
                    tooltip={item.label}
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
            <SidebarMenuButton
              type="button"
              onClick={onLogout}
              tooltip="Cerrar sesión"
            >
              <LogOutIcon />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

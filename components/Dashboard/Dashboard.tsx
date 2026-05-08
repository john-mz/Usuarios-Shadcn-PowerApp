"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { GraduationCapIcon, UserRoundIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { DashboardFormDialog } from "./DashboardFormDialog"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardTable } from "./DashboardTable"
import { ProfilePanel } from "./ProfilePanel"
import type {
  DashboardUser,
  DashboardUsersResponse,
  DashboardView,
  ProfileData,
} from "./types"

type DialogState =
  | { mode: "create"; user: null }
  | { mode: "edit"; user: DashboardUser }
  | null

export function Dashboard() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<DashboardView>("estudiantes")
  const [users, setUsers] = useState<DashboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [dataSource, setDataSource] = useState<"remote" | "fallback" | null>(
    null
  )
  const [dialogState, setDialogState] = useState<DialogState>(null)
  const [profile, setProfile] = useState<ProfileData>({
    nombre: "Administrador",
    correo: "admin@campus.local",
    clave: "123456",
    avatar: null,
  })

  useEffect(() => {
    let cancelled = false

    async function loadUsers() {
      try {
        setIsLoading(true)
        setLoadError("")

        const response = await fetch("/api/dashboard-users", {
          method: "GET",
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Dashboard API request failed")
        }

        const data = (await response.json()) as DashboardUsersResponse

        if (cancelled) {
          return
        }

        setUsers(data.users)
        setDataSource(data.source)
      } catch {
        if (cancelled) {
          return
        }

        setLoadError("No fue posible cargar la base inicial del dashboard.")
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadUsers()

    return () => {
      cancelled = true
    }
  }, [])

  function handleCreate(values: { nombre: string; correo: string }) {
    setUsers((currentUsers) => [
      ...currentUsers,
      {
        id: crypto.randomUUID(),
        nombre: values.nombre,
        correo: values.correo,
      },
    ])
    setDialogState(null)
  }

  function handleEdit(values: { nombre: string; correo: string }) {
    if (!dialogState || dialogState.mode !== "edit") {
      return
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === dialogState.user.id ? { ...user, ...values } : user
      )
    )
    setDialogState(null)
  }

  function handleLogout() {
    setUsers([])
    router.push("/")
  }

  return (
    <SidebarProvider>
      <DashboardSidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      <SidebarInset className="bg-muted/30">
        <main className="min-h-svh px-4 py-6 md:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <header className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-background p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <SidebarTrigger type="button" className="mt-1 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Dashboard temporal
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {currentView === "estudiantes"
                      ? "Gestión local de estudiantes"
                      : "Perfil del usuario"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {currentView === "estudiantes"
                      ? "Los cambios del CRUD viven solo en memoria y se pierden al recargar."
                      : "Actualiza tus datos de perfil para esta sesión temporal."}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {currentView === "estudiantes" ? (
                  <Button
                    type="button"
                    onClick={() => setDialogState({ mode: "create", user: null })}
                  >
                    Nuevo registro
                  </Button>
                ) : null}
              </div>
            </header>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-6">
                {currentView === "estudiantes" ? (
                  <>
                    {dataSource === "fallback" ? (
                      <Card className="border-amber-500/30 bg-amber-50 text-amber-950">
                        <CardContent className="py-4">
                          No se pudo usar la fuente remota y se cargó una base
                          temporal por defecto.
                        </CardContent>
                      </Card>
                    ) : null}

                    {loadError ? (
                      <Card>
                        <CardContent className="flex flex-col gap-4 py-8">
                          <p className="text-sm text-destructive">{loadError}</p>
                          <div>
                            <Button
                              type="button"
                              onClick={() => window.location.reload()}
                            >
                              Reintentar carga
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : null}

                    {isLoading ? (
                      <Card>
                        <CardContent className="py-10 text-center text-muted-foreground">
                          Cargando datos iniciales del dashboard...
                        </CardContent>
                      </Card>
                    ) : null}

                    {!isLoading && !loadError ? (
                      <DashboardTable
                        users={users}
                        onEdit={(user) => setDialogState({ mode: "edit", user })}
                        onDelete={(userId) =>
                          setUsers((currentUsers) =>
                            currentUsers.filter((user) => user.id !== userId)
                          )
                        }
                      />
                    ) : null}
                  </>
                ) : (
                  <ProfilePanel profile={profile} onSave={setProfile} />
                )}
              </div>

              <aside className="space-y-4">
                <Card>
                  <CardContent className="flex flex-col gap-4 py-5">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Accesos rápidos</p>
                      <p className="text-sm text-muted-foreground">
                        Navega entre las dos áreas principales del panel.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant={
                          currentView === "estudiantes" ? "default" : "outline"
                        }
                        type="button"
                        onClick={() => setCurrentView("estudiantes")}
                      >
                        <GraduationCapIcon data-icon="inline-start" />
                        Estudiantes
                      </Button>
                      <Button
                        variant={currentView === "perfil" ? "default" : "outline"}
                        type="button"
                        onClick={() => setCurrentView("perfil")}
                      >
                        <UserRoundIcon data-icon="inline-start" />
                        Perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>

          <DashboardFormDialog
            key={
              dialogState
                ? `${dialogState.mode}-${dialogState.user?.id ?? "new"}`
                : "closed"
            }
            mode={dialogState?.mode ?? "create"}
            open={dialogState !== null}
            initialValue={dialogState?.user ?? null}
            onClose={() => setDialogState(null)}
            onSubmit={(values) =>
              dialogState?.mode === "edit"
                ? handleEdit(values)
                : handleCreate(values)
            }
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

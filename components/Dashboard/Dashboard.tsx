"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { PlusIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { DashboardFormDialog } from "./DashboardFormDialog"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardStats } from "./DashboardStats"
import { DashboardSummaryPanel } from "./DashboardSummaryPanel"
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

const LOGIN_PROFILE_STORAGE_KEY = "zeta-login-profile"
const DEFAULT_PROFILE: ProfileData = {
  nombre: "Administrador",
  correo: "admin@campus.local",
  clave: "123456",
  avatar: null,
}

function getInitialProfile(): ProfileData {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE
  }

  const storedProfile = window.sessionStorage.getItem(LOGIN_PROFILE_STORAGE_KEY)

  if (!storedProfile) {
    return DEFAULT_PROFILE
  }

  try {
    const parsed = JSON.parse(storedProfile) as Partial<ProfileData>

    return {
      ...DEFAULT_PROFILE,
      correo:
        typeof parsed.correo === "string" ? parsed.correo : DEFAULT_PROFILE.correo,
      clave: typeof parsed.clave === "string" ? parsed.clave : DEFAULT_PROFILE.clave,
    }
  } catch {
    window.sessionStorage.removeItem(LOGIN_PROFILE_STORAGE_KEY)
    return DEFAULT_PROFILE
  }
}

export function Dashboard() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<DashboardView>("estudiantes")
  const [users, setUsers] = useState<DashboardUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [dataSource, setDataSource] = useState<"remote" | "fallback" | null>(
    null
  )
  const [dialogState, setDialogState] = useState<DialogState>(null)
  const [deleteCandidate, setDeleteCandidate] = useState<DashboardUser | null>(
    null
  )
  const [profile, setProfile] = useState<ProfileData>(getInitialProfile)

  const filteredUsers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return users
    }

    return users.filter((user) => {
      return (
        user.nombre.toLowerCase().includes(normalizedQuery) ||
        user.correo.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [searchQuery, users])

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

  function handleDelete(user: DashboardUser) {
    setDeleteCandidate(user)
  }

  function confirmDelete() {
    if (!deleteCandidate) {
      return
    }

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== deleteCandidate.id)
    )
    setDeleteCandidate(null)
  }

  return (
    <SidebarProvider>
      <DashboardSidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      <SidebarInset className="bg-muted/30">
        <main className="min-h-svh bg-[linear-gradient(180deg,_var(--background),_var(--muted))] px-4 py-6 md:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <header className="flex flex-col gap-5 rounded-xl border border-border/70 bg-background/95 p-5 shadow-sm md:flex-row md:items-center md:justify-between md:p-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground">
                    Zeta
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Sistema de Gestion de Estudiantes
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {currentView === "estudiantes"
                    ? "Gestión de estudiantes"
                    : "Perfil del usuario"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentView === "estudiantes"
                    ? "Administra el directorio academico, revisa el origen de datos y realiza cambios para esta sesion."
                    : "Actualiza tus datos de perfil."}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {currentView === "estudiantes" ? (
                  <Button
                    type="button"
                    onClick={() => setDialogState({ mode: "create", user: null })}
                  >
                    <PlusIcon data-icon="inline-start" />
                    Nuevo registro
                  </Button>
                ) : null}
              </div>
            </header>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="flex flex-col gap-6">
                {currentView === "estudiantes" ? (
                  <>
                    <DashboardStats
                      totalUsers={users.length}
                      dataSource={dataSource}
                      isLoading={isLoading}
                    />

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
                        users={filteredUsers}
                        totalUsers={users.length}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onEdit={(user) => setDialogState({ mode: "edit", user })}
                        onDelete={handleDelete}
                      />
                    ) : null}
                  </>
                ) : (
                  <ProfilePanel
                    profile={profile}
                    onSave={(nextProfile) =>
                      setProfile({ ...nextProfile, nombre: "Administrador" })
                    }
                  />
                )}
              </div>

              <DashboardSummaryPanel
                currentView={currentView}
                profile={profile}
                totalUsers={users.length}
                dataSource={dataSource}
                onNavigate={setCurrentView}
              />
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

          <AlertDialog
            open={deleteCandidate !== null}
            onOpenChange={(open) => {
              if (!open) {
                setDeleteCandidate(null)
              }
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Eliminar estudiante</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción eliminará a{" "}
                  <span className="font-medium text-foreground">
                    {deleteCandidate?.nombre}
                  </span>{" "}
                  con correo{" "}
                  <span className="font-medium text-foreground">
                    {deleteCandidate?.correo}
                  </span>
                  . El cambio solo afecta la sesión actual y no se puede
                  deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

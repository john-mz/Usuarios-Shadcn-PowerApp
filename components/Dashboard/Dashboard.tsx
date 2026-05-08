"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { DashboardFormDialog } from "./DashboardFormDialog"
import { DashboardTable } from "./DashboardTable"
import type { DashboardUser, DashboardUsersResponse } from "./types"

type DialogState =
  | { mode: "create"; user: null }
  | { mode: "edit"; user: DashboardUser }
  | null

export function Dashboard() {
  const router = useRouter()
  const [users, setUsers] = useState<DashboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [dataSource, setDataSource] = useState<"remote" | "fallback" | null>(
    null
  )
  const [dialogState, setDialogState] = useState<DialogState>(null)

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
    <main className="min-h-svh bg-muted/30 px-4 py-6 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-background p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Dashboard temporal
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestión local de usuarios
            </h1>
            <p className="text-sm text-muted-foreground">
              Los cambios viven solo en memoria y se pierden al recargar.
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleLogout}>
              Cerrar sesión
            </Button>
            <Button
              type="button"
              onClick={() => setDialogState({ mode: "create", user: null })}
            >
              Nuevo registro
            </Button>
          </div>
        </header>

        {dataSource === "fallback" ? (
          <Card className="border-amber-500/30 bg-amber-50 text-amber-950">
            <CardContent className="py-4">
              No se pudo usar la fuente remota y se cargó una base temporal por
              defecto.
            </CardContent>
          </Card>
        ) : null}

        {loadError ? (
          <Card>
            <CardContent className="flex flex-col gap-4 py-8">
              <p className="text-sm text-destructive">{loadError}</p>
              <div>
                <Button type="button" onClick={() => window.location.reload()}>
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
  )
}

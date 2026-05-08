import {
  DatabaseIcon,
  GraduationCapIcon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import type { DashboardView, ProfileData } from "./types"

type DashboardSummaryPanelProps = {
  currentView: DashboardView
  profile: ProfileData
  totalUsers: number
  dataSource: "remote" | "fallback" | null
  onNavigate: (view: DashboardView) => void
}

export function DashboardSummaryPanel({
  currentView,
  profile,
  totalUsers,
  dataSource,
  onNavigate,
}: DashboardSummaryPanelProps) {
  const sourceLabel =
    dataSource === "remote"
      ? "Conectado a Power Automate"
      : dataSource === "fallback"
        ? "Usando base temporal"
        : "Sincronizando datos"

  return (
    <aside className="flex flex-col gap-4">
      <Card className="border-border/70 bg-background/90">
        <CardHeader>
          <CardTitle className="text-base">Resumen operativo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UsersRoundIcon aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium">Directorio academico</p>
              <p className="text-sm text-muted-foreground">
                {totalUsers} estudiantes en esta sesion
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <DatabaseIcon className="mt-0.5 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">Fuente de datos</p>
                <p className="text-sm text-muted-foreground">{sourceLabel}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserRoundIcon className="mt-0.5 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">{profile.nombre}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {profile.correo}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-background/90">
        <CardHeader>
          <CardTitle className="text-base">Accesos rapidos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button
            variant={currentView === "estudiantes" ? "default" : "outline"}
            type="button"
            onClick={() => onNavigate("estudiantes")}
          >
            <GraduationCapIcon data-icon="inline-start" />
            Estudiantes
          </Button>
          <Button
            variant={currentView === "perfil" ? "default" : "outline"}
            type="button"
            onClick={() => onNavigate("perfil")}
          >
            <UserRoundIcon data-icon="inline-start" />
            Perfil
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}

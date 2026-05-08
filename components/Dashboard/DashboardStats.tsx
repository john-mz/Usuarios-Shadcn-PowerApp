import {
  DatabaseIcon,
  GraduationCapIcon,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type DashboardStatsProps = {
  totalUsers: number
  dataSource: "remote" | "fallback" | null
  isLoading: boolean
}

export function DashboardStats({
  totalUsers,
  dataSource,
  isLoading,
}: DashboardStatsProps) {
  const sourceLabel =
    dataSource === "remote"
      ? "Power Automate"
      : dataSource === "fallback"
        ? "Base temporal"
        : "Pendiente"

  const stats = [
    {
      label: "Estudiantes",
      value: isLoading ? "..." : totalUsers.toString(),
      description: "Registros disponibles",
      icon: GraduationCapIcon,
    },
    {
      label: "Fuente",
      value: sourceLabel,
      description: "Origen de la informacion",
      icon: DatabaseIcon,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/70 bg-background/90">
          <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
            <div className="flex flex-col gap-1">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <stat.icon aria-hidden="true" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
